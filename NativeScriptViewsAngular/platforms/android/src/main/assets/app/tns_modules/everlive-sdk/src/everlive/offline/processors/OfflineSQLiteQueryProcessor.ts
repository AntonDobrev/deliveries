import * as _ from 'underscore';
import * as path from 'path';
import * as platform from '../../../common/platform';

import { EverliveError, EverliveErrors } from '../../EverliveError';
import { OfflineQueryProcessor } from './OfflineQueryProcessor'
import { Utils } from '../../utils';
import { offlineTransformations } from '../offlineTransformations';
import { Constants, DataQueryOperation } from '../../constants';

export class OfflineSQLiteQueryProcessor extends OfflineQueryProcessor {

    processQuery(dataQuery) {
        const collectionName = dataQuery.collectionName;
        if (Utils.isContentType.pushDevices(collectionName) || Utils.isContentType.pushNotifications(collectionName)) {
            if (this.everlive.isOnline()) {
                return Utils.successfulPromise();
            } else {
                return Utils.rejectedPromise(new EverliveError(EverliveErrors.pushNotSupportedOffline));
            }
        }

        let queryNotSupportedError = this.checkSupportedQuery(dataQuery);
        if (queryNotSupportedError && !dataQuery.isSync) {
            return new Promise((resolve, reject) => {
                reject(new EverliveError(queryNotSupportedError));
            });
        }

        const queryParams = dataQuery.getQueryParameters();
        const unsupportedOperators = Utils.getUnsupportedOperators(queryParams.filter);
        const unsupportedOperatorCount = unsupportedOperators.length;
        if (unsupportedOperatorCount) {
            return new Promise((resolve, reject) => {
                let errorMessage;
                if (unsupportedOperatorCount === 1) {
                    errorMessage = 'The operator ' + unsupportedOperators[0] + ' is not supported in offline mode.';
                } else {
                    errorMessage = 'The operators ' + unsupportedOperators.join(',') + 'are not supported in offline mode.';
                }

                reject(new EverliveError({
                    message: errorMessage,
                    code: EverliveErrors.operationNotSupportedOffline.code
                }));
            });
        }

        offlineTransformations.traverseAndTransformFilterId(queryParams.filter);
        offlineTransformations.traverseAndTransformFilterId(queryParams.select);
        offlineTransformations.traverseAndTransformFilterId(queryParams.sort);

        switch (dataQuery.operation) {
            case DataQueryOperation.Read:
                return this.read(dataQuery, queryParams.filter, queryParams.sort, queryParams.skip, queryParams.limit, queryParams.select, queryParams.expand);
            case DataQueryOperation.ReadById:
                return this.readById(dataQuery, queryParams.expand);
            case DataQueryOperation.FilesGetDownloadUrlById:
                return this.getDownloadUrlById(dataQuery);
            case DataQueryOperation.Count:
                return this.count(dataQuery, queryParams.filter);
            case DataQueryOperation.Create:
                return this.create(dataQuery);
            case DataQueryOperation.RawUpdate:
            case DataQueryOperation.Update:
                return this.update(dataQuery, queryParams.filter);
            case DataQueryOperation.FilesUpdateContent:
                return this.updateFileContent(dataQuery);
            case DataQueryOperation.Delete:
                return this.remove(dataQuery, queryParams.filter);
            case DataQueryOperation.DeleteById:
                return this.remove(dataQuery, {
                    _id: dataQuery.additionalOptions.id
                });
            case DataQueryOperation.Aggregate:
                return new Promise((resolve, reject) => {
                    let operationStr = DataQueryOperation[dataQuery.operation];
                    reject(new EverliveError({message: operationStr + ' is not supported in offline mode.'}));
                });
            default:
                return new Promise((resolve, reject) => {
                    if (dataQuery.isSync) {
                        resolve();
                    } else {
                        let operationStr = DataQueryOperation[dataQuery.operation];
                        reject(new EverliveError({message: operationStr + ' is not supported in offline mode.'}));
                    }
                });
        }
    }

    update(dataQuery, filter) {
        return this._updateItems(dataQuery, dataQuery.data, filter, dataQuery.isSync).then((updateItems) => {
            return {
                ModifiedAt: new Date(),
                result: updateItems
            };
        });
    }

    updateFileContent(dataQuery) {
        if (platform.isDesktop) {
            return Utils.successfulPromise();
        }

        const isSync = dataQuery.isSync;
        const updateExpression = dataQuery.data;
        const itemId = dataQuery.additionalOptions.id;
        let updateItems;
        const typeName = dataQuery.collectionName;

        return this._getById(typeName, itemId)
            .then((item) => {
                let singleItemForUpdate = item[0];
                updateItems = [singleItemForUpdate];
                singleItemForUpdate.base64 = updateExpression.base64;
                singleItemForUpdate.Filename = updateExpression.Filename;
                singleItemForUpdate.ContentType = updateExpression.ContentType;
                delete singleItemForUpdate.Uri;

                return this._overwriteFile(itemId, singleItemForUpdate, isSync)
                    .then(() => {
                        return this._getUpdatePromise(typeName, updateExpression, {_id: itemId});
                    })
                    .then((updateItems) => {
                        return {
                            ModifiedAt: new Date(),
                            result: updateItems
                        };
                    });
            });
    }

    _getById(typeName, itemId) {
        return new Promise((resolve, reject) => {
            this.persister.queryData(typeName, resolve, reject, {_id: itemId});
        });
    }

    _updateItems(dataQuery, updateExpression, filter, isSync) {
        const collectionName = dataQuery.collectionName;

        if (dataQuery.additionalOptions && dataQuery.additionalOptions.id) {
            const itemId = dataQuery.additionalOptions.id;
            filter = {_id: itemId}
        }

        if (Utils.isContentType.files(collectionName) && updateExpression.$set && updateExpression.$set.Filename || updateExpression.Filename) {
            const filename = updateExpression.Filename || updateExpression.$set.Filename;
            const extension = path.extname(filename);
            return this.everlive.offlineStorage.files.changeFileExtensionById(dataQuery.additionalOptions.id, extension)
                .then(() => {
                    return this._getUpdatePromise(collectionName, updateExpression, filter, isSync, dataQuery.ModifiedAt);
                });
        } else {
            return this._getUpdatePromise(collectionName, updateExpression, filter, isSync, dataQuery.ModifiedAt);
        }
    }

    _getUpdatePromise(collectionName, updateExpression, filter, isSync?, modifiedAt?) {
        const updateOfflineCreated = this._applyUpdateOperation(collectionName, updateExpression, filter, Constants.offlineItemStates.created, isSync, modifiedAt);
        const updateModified = this._applyUpdateOperation(collectionName, updateExpression, filter, Constants.offlineItemStates.modified, isSync, modifiedAt);

        return Promise.all([updateOfflineCreated, updateModified]).then((result) => {
            let modifiedItems = 0;
            _.each(result, (item: number) => {
                modifiedItems += item;
            });
            return modifiedItems;
        }, function (err) {
            return 0;
        });
    }

    _applyUpdateOperation(contentType, originalUpdateExpression, filter, state, isSync?, modifiedAt?) {
        const dbOperators = Utils.getDbOperators(originalUpdateExpression, true);
        const hasDbOperator = dbOperators.length !== 0;

        let updateExpression;
        if (hasDbOperator) {
            updateExpression = originalUpdateExpression;
        } else {
            updateExpression = {
                $set: originalUpdateExpression
            };
        }
        let updateExpressionForUser = {
            ModifiedBy: this.everlive.setup.principalId || Constants.guidEmpty
        };
        updateExpression.$set = _.extend(updateExpressionForUser, updateExpression.$set);
        delete updateExpression.$set.Id;
        if (isSync) {
            if (originalUpdateExpression.$set && originalUpdateExpression.$set.ModifiedAt) {
                updateExpression.$set.ModifiedAt = Utils.cloneDate(originalUpdateExpression.$set.ModifiedAt);
            } else {
                updateExpression.$set.ModifiedAt = Utils.cloneDate(originalUpdateExpression.ModifiedAt || modifiedAt);
            }
        }

        delete filter[Constants.offlineItemsStateMarker];
        if (!isSync) {
            if (state === Constants.offlineItemStates.created) {
                filter[Constants.offlineItemsStateMarker] = Constants.offlineItemStates.created;
                updateExpression.$set[Constants.offlineItemsStateMarker] = state;
            } else {
                filter['$or'] = [
                    {[Constants.offlineItemsStateMarker]: Constants.offlineItemStates.modified},
                    {[Constants.offlineItemsStateMarker]: {$is: null}}
                ];
                updateExpression.$set[Constants.offlineItemsStateMarker] = Constants.offlineItemStates.modified;
            }
        } else {
            updateExpression.$set[Constants.offlineItemsStateMarker] = '';
        }

        return new Promise((resolve, reject) => {
            this.persister.updateData(contentType, updateExpression, resolve, reject, filter);
        });

    }

    readById(dataQuery, expand) {
        let expandResult;
        return this._prepareExpand(expand, dataQuery, false)
            .then((prepareExpandResult) => {
                expandResult = prepareExpandResult;
                if (!dataQuery.additionalOptions.id) {
                    return Promise.reject(new EverliveError({message: 'Id field is mandatory when using offline storage'}));
                }
                return new Promise((resolve, reject) => {
                    const itemId = dataQuery.additionalOptions.id;
                    this.persister.queryData(dataQuery.collectionName, resolve, reject, {_id: itemId});
                });
            })
            .then((queryResults) => {
                let item = queryResults[0];
                if (!item) {
                    return Promise.reject(new EverliveError(EverliveErrors.itemNotFound));
                }
                item = offlineTransformations.idTransform(item);
                return this._expandResult(expandResult, item);
            })
            .then((expandedResult) => {
                let transformedItem = this._transformOfflineResult(expandedResult, null, dataQuery);
                return transformedItem;
            });
    }

    remove(dataQuery, filter) {
        return this._removeItems(dataQuery, filter, dataQuery.isSync);
    }

    _purgeFiles(filter, success, error) {
        this.persister.queryData('Files', (result) => {
            let purgePromises = _.map(result, (f: any) => this.everlive.offlineStorage.files.purge(f._id));
            return Promise.all(purgePromises).then(success);
        }, function (err) {
            error(err);
        }, filter);
    }

    _removeItems(dataQuery, filter, isSync) {
        return new Promise((resolve, reject) => {
            //we cannot remove files while in desktop mode
            if (Utils.isContentType.files(dataQuery.collectionName) && !platform.isDesktop) {
                if (!filter) {
                    return resolve();
                } else {
                    this._purgeFiles(filter, resolve, reject);
                }
            } else {
                return resolve();
            }
        }).then(() => {
            const collectionName = dataQuery.collectionName;
            const deleteOfflineCreated = new Promise((resolve, reject) => {
                const createdOfflineFilter = filter ? _.clone(filter) : {};
                createdOfflineFilter[Constants.offlineItemsStateMarker] = Constants.offlineItemStates.created;
                this.persister.removeData(collectionName, resolve, reject, createdOfflineFilter);
            });

            let setDeletedStatus = new Promise((resolve, reject) => {
                if (isSync) {
                    const itemIdFilter = filter['Id'] || filter['_id'];
                    if (itemIdFilter) {
                        this.persister.purgeById(collectionName, itemIdFilter, resolve, reject);
                    } else if (filter) {
                        this.persister.removeData(collectionName, resolve, reject, filter);
                    }
                    else {
                        this.persister.purge(collectionName, resolve, reject);
                    }
                } else {
                    const modifiedOfflineFilter = filter ? _.clone(filter) : {};
                    modifiedOfflineFilter['$or'] = [
                        {[Constants.offlineItemsStateMarker]: Constants.offlineItemStates.modified},
                        {[Constants.offlineItemsStateMarker]: {$is: null}}
                    ];
                    this.persister.updateData(collectionName, {[Constants.offlineItemsStateMarker]: Constants.offlineItemStates.deleted}, resolve, reject, modifiedOfflineFilter);
                }
            });

            return Promise.all([deleteOfflineCreated, setDeletedStatus])
                .then((removedItems) => {
                    let count = 0;
                    _.each(removedItems, (item: number) => {
                        if (item) {
                            count += item;
                        }
                    });
                    return this._transformOfflineResult(count);
                });

        });
    }

    count(dataQuery, filter) {
        return new Promise((resolve, reject) => {
            this.persister.count(dataQuery.collectionName, (result) => {
                resolve({result: result.Count});
            }, reject, filter);
        });
    }

    _persistData(contentType, items?) {
        return new Promise((resolve, reject) => {
            this._transformPersistedData(contentType, items);
            this.persister.saveData(contentType, items, resolve, reject);
        });
    }

    read(dataQuery, filter, sort, skip, limit, select, expand) {
        OfflineSQLiteQueryProcessor._handleIdInSelect(select);
        const selectIsValid = OfflineSQLiteQueryProcessor._validateSelectMode(select);

        if (!selectIsValid) {
            const err = new EverliveError(EverliveErrors.generalDatabaseError);
            err.message = 'You cannot mix including and excluding fields.';
            return Promise.reject(err);
        }

        let expandResult;

        return new Promise((resolve, reject) => {
            this._prepareExpand(expand, dataQuery, true)
                .then((prepareExpandResult:any) => {
                    expandResult = prepareExpandResult;
                    if (prepareExpandResult) {
                        select = prepareExpandResult.mainQueryFieldsExpression;
                    }
                    const filterCopy = _.extend({}, filter);
                    const actualFilter = this._getWithoutDeletedFilter(filterCopy, true);
                    return this._readInternal(dataQuery.collectionName, actualFilter, sort, skip, limit, select, expand);
                })
                .then((result) => {
                    const transformResult = (collectionLength?) => {
                        if (collectionLength) {
                            collectionLength = collectionLength['Count'];
                        }
                        if (this._shouldAutogenerateIdForContentType(dataQuery.collectionName)) {
                            result = offlineTransformations.idTransform(result);
                        } else {
                            result = offlineTransformations.removeIdTransform(result, true);
                        }

                        this._expandResult(expandResult, result)
                            .then((expandedResult) => {
                                let response = this._transformOfflineResult(expandedResult, collectionLength, dataQuery);
                                resolve(response);
                            }, reject);
                    };

                    if (skip || limit) {
                        this.persister.count(dataQuery.collectionName, transformResult, reject);
                    } else {
                        transformResult();
                    }
                })
                .catch(reject);
        });
    }

    private static _validateSelectMode(select) {
        if (!Utils.existsAndIsNotEmpty(select)) {
            return true;
        }

        let inclusionOrExclusion = null;
        const keys = _.keys(select);

        for (let i = 0; i < keys.length; i += 1) {
            let key = keys[i];
            let value = select[key];

            if (key === '_id' || key === 'Id' || !select.hasOwnProperty(key)) {
                continue;
            }

            if (inclusionOrExclusion == null) {
                inclusionOrExclusion = value;
            } else if (value != inclusionOrExclusion) {
                return false;
            }
        }

        return true;
    }

    private static _handleIdInSelect(select) {
        if (!Utils.existsAndIsNotEmpty(select)) {
            return;
        }
        // Id is included, unless explicitly excluded by user
        const selectId = select['_id'] || select['Id'];
        if (selectId !== 0) {
            select['_id'] = 1;
        }
    }

    _readInternal(tableName, filter?, sort?, skip?, limit?, select?, expand?) {
        return new Promise((resolve, reject) => {
            this.persister.queryData(tableName, resolve, reject, filter, sort, skip, limit, select);
        });
    }

    create(dataQuery) {
        return this._createItems(dataQuery.collectionName, dataQuery.data, dataQuery.isSync, dataQuery.preserveState)
            .then((createdItems) => {
                const isFilesQuery = Utils.isContentType.files(dataQuery.collectionName);
                return this._getCreateResult(createdItems, isFilesQuery);
            });
    }

    _createItems(contentType, items, isSync, preserveState) {
        let itemsForCreate = _.isArray(items) ? items : [items];
        let createdItems = _.map(itemsForCreate, (currentItem) => {
            let itemToCreate = _.extend({}, currentItem);
            itemToCreate._id = itemToCreate.Id || Utils.uuid();
            delete itemToCreate.Id;


            return this._getById(contentType, itemToCreate._id)
                .then((item) => {
                    const itemExists = item[0] && item[0][Constants.offlineItemsStateMarker] !== Constants.offlineItemStates.deleted;
                    let state;
                    if (isSync && preserveState && itemExists) {
                        state = item[0][Constants.offlineItemsStateMarker];
                    } else {
                        state = isSync ? undefined : Constants.offlineItemStates.created; // set the state to created only if not syncing
                    }

                    const processItemResult = () => {
                        this._setItemDates(currentItem, itemToCreate, contentType);
                        if (!state) {
                            delete itemToCreate[Constants.offlineItemsStateMarker];
                        } else {
                            itemToCreate[Constants.offlineItemsStateMarker] = state;
                        }
                        return itemToCreate;
                    };

                    if (Utils.isContentType.files(contentType)) {
                        return this.offlineFilesProcessor.upsertFileFromObject(itemToCreate, true, isSync).then(processItemResult);
                    } else {
                        return processItemResult();
                    }
                });


        });

        return Promise.all(createdItems)
            .then((items) => {
                return this._persistData(contentType, items)
                    .then(() => {
                        // Ids are generated regardless of the autoGenerateId option. However the Id's are omitted when returning
                        // the items to the client if autoGenerateId is false
                        if (!this._shouldAutogenerateIdForContentType(contentType) && !isSync) {
                            createdItems = offlineTransformations.removeIdTransform(items);
                        }
                        return items;
                    });
            });
    }

    _getAllCollections() {
        return new Promise((resolve, reject) => {
            this.persister.getAllData((allData) => {

                _.each(allData, (items: any[], key: string) => {
                    let currentType = {};
                    _.each(items, (item) => {
                        const itemId = item['_id'];
                        const itemAsString = JSON.stringify(item);
                        const actualItem = JSON.parse(itemAsString, Utils.parseUtilities.getReviver());
                        currentType[itemId] = actualItem;
                    });
                    allData[key] = currentType;
                });
                resolve(allData);
            }, reject);
        });
    }
}