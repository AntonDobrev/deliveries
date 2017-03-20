import * as _ from 'underscore';
import * as path from 'path';

import { Utils } from '../../utils';
import { offlineTransformations } from '../offlineTransformations';
import * as platform from '../../../common/platform';
import { EverliveError, EverliveErrors } from '../../EverliveError';
import { Constants, DataQueryOperation } from '../../constants';
import { Persister } from '../persisters/Persister';
import { CryptographicProvider } from '../../encryption/CryptographicProvider';
import { OfflineFilesProcessor } from '../OfflineFilesProcessor';
import { Everlive } from '../../Everlive';
import { OfflineQueryProcessor } from './OfflineQueryProcessor'

const mingo = require('mingo');
const mongoQuery = require('mongo-query');
const aggregationTranslator = require('../../../scripts/bs-aggregation-translator');

export class OfflineInMemoryQueryProcessor extends OfflineQueryProcessor {
    private _collectionCache:any = {};

    constructor(public persister:Persister,
                public _encryptionProvider:CryptographicProvider,
                public offlineFilesProcessor:OfflineFilesProcessor,
                public everlive:Everlive,
                public setup:any) {
        super(persister, _encryptionProvider, offlineFilesProcessor, everlive, setup);
    }

    processQuery(dataQuery) {
        var collectionName = dataQuery.collectionName;
        if (Utils.isContentType.pushDevices(collectionName) || Utils.isContentType.pushNotifications(collectionName)) {
            if (this.everlive.isOnline()) {
                return Utils.successfulPromise();
            } else {
                return Utils.rejectedPromise(new EverliveError(EverliveErrors.pushNotSupportedOffline));
            }
        }

        var queryNotSupportedError = this.checkSupportedQuery(dataQuery);
        if (queryNotSupportedError && !dataQuery.isSync) {
            return new Promise(function (resolve, reject) {
                reject(new EverliveError(queryNotSupportedError));
            });
        }

        var queryParams = dataQuery.getQueryParameters();
        var unsupportedOperators = Utils.getUnsupportedOperators(queryParams.filter);
        var unsupportedOperatorCount = unsupportedOperators.length;
        if (unsupportedOperatorCount) {
            return new Promise(function (resolve, reject) {
                var errorMessage;
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
                return this.aggregate(dataQuery, queryParams);
            default:
                return new Promise(function (resolve, reject) {
                    if (dataQuery.isSync) {
                        resolve();
                    } else {
                        let operationStr = DataQueryOperation[dataQuery.operation];
                        reject(new EverliveError({message: operationStr + ' is not supported in offline mode.'}));
                    }
                });
        }
    }

    create(dataQuery) {
        var self = this;

        return self._createItems(dataQuery.collectionName, dataQuery.data, dataQuery.isSync, dataQuery.preserveState)
            .then(function (createdItems) {
                var isFilesQuery = Utils.isContentType.files(dataQuery.collectionName);
                return self._getCreateResult(createdItems, isFilesQuery);
            });
    }

    read(dataQuery, filter, sort, skip, limit, select, expand) {
        var self = this;
        var expandResult;

        return new Promise(function (resolve, reject) {
            var collectionLength;

            self._prepareExpand(expand, dataQuery, true)
                .then(function (prepareExpandResult:any) {
                    expandResult = prepareExpandResult;
                    if (prepareExpandResult) {
                        select = prepareExpandResult.mainQueryFieldsExpression;
                    }

                    return self._getCollection(dataQuery.collectionName);
                })
                .then(function (collection) {
                    var result = self._readInternal(collection, filter, sort, skip, limit, select);

                    if (skip || limit) {
                        var all = self._readInternal(collection);
                        collectionLength = all.length;
                    }

                    if (!self._shouldAutogenerateIdForContentType(dataQuery.collectionName)) {
                        result = offlineTransformations.removeIdTransform(result, true);
                    } else {
                        result = offlineTransformations.idTransform(result);
                    }

                    return self._expandResult(expandResult, result);
                })
                .then(function (result) {
                    var response = self._transformOfflineResult(result, collectionLength, dataQuery);
                    resolve(response);
                })
                .catch(reject);
        });
    }

    _readInternal(collection, filter?, sort?, skip?, limit?, select?) {
        var filterCopy = _.extend({}, filter);
        var actualFilter = this._getWithoutDeletedFilter(filterCopy);
        offlineTransformations.traverseAndTransformFilterId(actualFilter);
        var query = mingo.Query(actualFilter);
        var cursor = mingo.Cursor(collection, query, select);
        if (sort) {
            cursor = cursor.sort(sort);
        }

        if (skip) {
            cursor.skip(skip);
        }

        if (limit) {
            cursor.limit(limit);
        }

        return _.map(cursor.all(), function (item) {
            return _.extend({}, item);
        });
    }

    readById(dataQuery, expand) {
        var self = this;
        var expandResult;
        return self._prepareExpand(expand, dataQuery, false)
            .then(function (prepareExpandResult) {
                expandResult = prepareExpandResult;
                return self._getCollection(dataQuery.collectionName);
            })
            .then(function (collection) {
                return new Promise(function (resolve, reject) {
                    var item = self._getById(collection, dataQuery.additionalOptions.id);

                    if (!item) {
                        return reject(new EverliveError(EverliveErrors.itemNotFound));
                    }

                    item = offlineTransformations.idTransform(item);
                    return self._expandResult(expandResult, item).then(resolve).catch(reject);
                });
            })
            .then(function (result) {
                return self._transformOfflineResult(result, null, dataQuery);
            });
    }

    _getById(collection, id) {
        if (!id) {
            throw new EverliveError({message: 'Id field is mandatory when using offline storage'});
        }

        if (collection[id]) {
            var item = _.extend({}, collection[id]);
            var isDeleted = item && item[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.deleted;

            return isDeleted ? undefined : item;
        }
    }

    _getUpdateItemsResult(updateItems) {
        var updatedItemCount = updateItems.length;
        var modifiedAtResult = updatedItemCount ? updateItems[0].ModifiedAt : new Date();

        return {
            ModifiedAt: modifiedAtResult,
            result: updatedItemCount
        };
    }

    update(dataQuery, filter) {
        var self = this;

        return this._updateItems(dataQuery, dataQuery.data, filter, dataQuery.isSync).then(function (updateItems) {
            return self._getUpdateItemsResult(updateItems);
        });
    }

    remove(dataQuery, filter) {
        return this._removeItems(dataQuery, filter, dataQuery.isSync);
    }

    count(dataQuery, filter) {
        var self = this;

        return new Promise(function (resolve, reject) {
            self._getCollection(dataQuery.collectionName)
                .then(function (collection) {
                    var filterResult = self._readInternal(collection, filter);
                    resolve({result: filterResult.length});
                }).catch(reject);
        });
    }

    _mapCreateItem(currentItem, collection, isSync, preserveState, contentType) {
        var self = this;

        var itemToCreate = _.extend({}, currentItem);
        itemToCreate._id = itemToCreate.Id || Utils.uuid();
        delete itemToCreate.Id;

        var existingItem = self._getById(collection, itemToCreate._id);
        var itemExists = !!existingItem;
        var state;
        if (itemExists && (!isSync && !preserveState)) {
            // TODO: [offline] return the same error as the server does
            throw new EverliveError({message: 'An item with the specified id already exists'});
        } else {
            if (isSync && preserveState && itemExists) {
                state = existingItem[Constants.offlineItemsStateMarker];
            } else {
                state = isSync ? undefined : Constants.offlineItemStates.created; // set the state to created only if not syncing
            }
        }

        function processItemResult() {
            self._setItemDates(currentItem, itemToCreate, contentType);
            self._setItem(collection, _.extend({}, itemToCreate), state);
            return itemToCreate;
        }

        if (Utils.isContentType.files(contentType)) {
            return self.offlineFilesProcessor.upsertFileFromObject(itemToCreate, true, isSync).then(processItemResult);
        } else {
            return processItemResult();
        }
    }

    _createItems(contentType, items, isSync, preserveState) {
        var self = this;
        return this._getCollection(contentType)
            .then(function (collection) {
                var itemsForCreate = _.isArray(items) ? items : [items];
                var createdItems = _.map(itemsForCreate, function (currentItem) {
                    return self._mapCreateItem(currentItem, collection, isSync, preserveState, contentType);
                });

                return Promise.all(createdItems)
                    .then(function (items) {
                        return self._persistData(contentType)
                            .then(function () {
                                // Ids are generated regardless of the autoGenerateId option. However the Id's are omitted when returning
                                // the items to the client if autoGenerateId is false
                                if (!self._shouldAutogenerateIdForContentType(contentType) && !isSync) {
                                    createdItems = offlineTransformations.removeIdTransform(items);
                                }

                                return items;
                            });
                    });
            });
    }

    _applyUpdateOperation(originalUpdateExpression, itemToUpdate, collection, isSync?, modifiedAt?) {
        var dbOperators = Utils.getDbOperators(originalUpdateExpression, true);
        var hasDbOperator = dbOperators.length !== 0;

        var updateExpression;
        if (hasDbOperator) {
            updateExpression = originalUpdateExpression;
        } else {
            updateExpression = {
                $set: originalUpdateExpression
            };
        }
        var updateExpressionForUser = {
            ModifiedBy: this.everlive.setup.principalId || Constants.guidEmpty
        };
        updateExpression.$set = _.extend(updateExpressionForUser, updateExpression.$set);

        if (isSync) {
            updateExpression.$set.ModifiedAt = Utils.cloneDate(originalUpdateExpression.ModifiedAt || modifiedAt);
        }

        mongoQuery(itemToUpdate, {}, updateExpression, {strict: true}); // Setting strict to true so only exact matches would be updated

        itemToUpdate._id = itemToUpdate._id || updateExpression._id || updateExpression.Id;
        delete itemToUpdate.Id;

        var newState;
        if (isSync) {
            newState = undefined;
        } else if (itemToUpdate[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.created) {
            newState = Constants.offlineItemStates.created;
        } else {
            newState = Constants.offlineItemStates.modified;
        }

        this._setItem(collection, itemToUpdate, newState);
    }

    updateFileContent(dataQuery) {
        if (platform.isDesktop) {
            return Utils.successfulPromise();
        }

        var isSync = dataQuery.isSync;
        var updateExpression = dataQuery.data;
        var self = this;
        var itemId = dataQuery.additionalOptions.id;
        var updateItems;
        var typeName = dataQuery.collectionName;
        return this._getCollection(typeName)
            .then(function (collection) {
                var singleItemForUpdate = self._getById(collection, itemId);
                updateItems = [singleItemForUpdate];
                singleItemForUpdate.base64 = updateExpression.base64;
                singleItemForUpdate.Filename = updateExpression.Filename;
                singleItemForUpdate.ContentType = updateExpression.ContentType;
                delete singleItemForUpdate.Uri;

                return self._overwriteFile(itemId, singleItemForUpdate, isSync)
                    .then(function () {
                        self._applyUpdateOperation(updateExpression, singleItemForUpdate, collection);
                        self._setItem(collection, singleItemForUpdate, Constants.offlineItemStates.modified);
                        return self._persistData(typeName);
                    })
                    .then(function () {
                        return self._getUpdateItemsResult(updateItems);
                    })
            });
    }

    _updateItems(dataQuery, updateExpression, filter, isSync) {
        var self = this;
        var collectionName = dataQuery.collectionName;

        return self._getCollection(collectionName)
            .then(function (collection) {
                var updateItems;

                if (dataQuery.additionalOptions && dataQuery.additionalOptions.id) {
                    var itemId = dataQuery.additionalOptions.id;
                    var singleItemForUpdate = self._getById(collection, itemId);
                    if (!singleItemForUpdate) {
                        throw new EverliveError({
                            message: 'Item with id :' + itemId + ' does not exist offline in the collection :' + collectionName,
                            code: EverliveErrors.itemNotFound.code
                        });
                    }

                    updateItems = [singleItemForUpdate];

                    if (Utils.isContentType.files(collectionName) && updateExpression.$set && updateExpression.$set.Filename || updateExpression.Filename) {
                        var filename = updateExpression.Filename || updateExpression.$set.Filename;
                        var extension = path.extname(filename);
                        return self.everlive.offlineStorage.files.changeFileExtensionById(itemId, extension)
                            .then(function () {
                                self._applyUpdateOperation(updateExpression, singleItemForUpdate, collection, isSync, dataQuery.ModifiedAt);
                                return self._persistData(collectionName);
                            })
                            .then(function () {
                                return updateItems;
                            });
                    } else {
                        self._applyUpdateOperation(updateExpression, singleItemForUpdate, collection, isSync, dataQuery.ModifiedAt);
                    }
                } else {
                    updateItems = self._readInternal(collection, filter);
                    for (var i = 0; i < updateItems.length; i++) {
                        var itemToUpdate = updateItems[i];
                        var itemExists = !!self._getById(collection, itemToUpdate._id.toString());

                        if (!itemExists && !isSync) {
                            // TODO: [offline] return the correct error
                            throw new EverliveError(EverliveErrors.itemNotFound);
                        }

                        self._applyUpdateOperation(updateExpression, itemToUpdate, collection, isSync, dataQuery.ModifiedAt);
                    }
                }

                return self._persistData(collectionName)
                    .then(function () {
                        return updateItems;
                    });
            });
    }

    _getAllCollections() {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.persister.getAllData(function (allData) {
                _.each(allData, function (value:string, key:string) {
                    var decryptedData = self._encryptionProvider.decrypt(value);
                    allData[key] = JSON.parse(decryptedData || '{}', Utils.parseUtilities.getReviver());
                });

                resolve(allData);
            }, reject);
        });
    }

    _getCollection(contentType) {
        var self = this;

        return new Promise(function (resolve, reject) {
            // check the persister if there is no data in the collection cache for this content type
            if (!self._collectionCache[contentType]) {
                self.persister.getData(contentType, function (data) {
                    var decryptedDataRaw = self._encryptionProvider.decrypt(data);
                    var decryptedData = JSON.parse(decryptedDataRaw || '{}', Utils.parseUtilities.getReviver());
                    self._collectionCache[contentType] = decryptedData;

                    resolve(self._collectionCache[contentType]);
                }, reject);
            } else {
                resolve(self._collectionCache[contentType]);
            }
        });
    }

    _setItem(collection, item, state) {
        if (!state) {
            delete item[Constants.offlineItemsStateMarker];
        } else {
            item[Constants.offlineItemsStateMarker] = state;
        }

        collection[item._id] = item;
    }

    _persistData(contentType, items?) {
        var self = this;

        return new Promise(function (resolve, reject) {
            var contentTypeData = self._collectionCache[contentType] || {};
            self._transformPersistedData(contentType, contentTypeData);
            var contentTypeDataRaw = JSON.stringify(contentTypeData);
            var contentTypeDataRawEncrypted = self._encryptionProvider.encrypt(contentTypeDataRaw);
            self.persister.saveData(contentType, contentTypeDataRawEncrypted, resolve, reject);
        });
    }

    _shouldAutogenerateIdForContentType(contentType) {
        return !(this.setup && this.setup.typeSettings && this.setup.typeSettings[contentType] && this.setup.typeSettings[contentType].autoGenerateId === false);
    }

    _clearItem(collection, item) {
        delete collection[item._id];
    }

    _mapRemoveItem(itemToRemove, collection, isSync, collectionName) {
        var self = this;

        return new Promise(function (resolve, reject) {
            //we cannot remove files while in desktop mode
            if (Utils.isContentType.files(collectionName) && !platform.isDesktop) {
                return self.everlive.offlineStorage.files.purge(itemToRemove._id).then(resolve, reject);
            } else {
                return resolve();
            }
        }).then(function () {
            itemToRemove._id = itemToRemove._id || itemToRemove.Id;

            var itemExists = !!self._getById(collection, itemToRemove._id.toString());
            if (!itemExists && !isSync) {
                throw new EverliveError({message: 'Cannot delete item - item with id ' + itemToRemove._id + ' does not exist.'});
            }

            // if the item has existed only offline or the data is syncing
            // and the item was deleted by the conflict resolution strategy
            var removeFromMemory = itemToRemove[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.created || isSync;
            if (removeFromMemory) {
                self._clearItem(collection, itemToRemove);
            } else {
                self._setItem(collection, itemToRemove, Constants.offlineItemStates.deleted);
            }
        });
    }

    _removeItems(dataQuery, filter, isSync) {
        var self = this;
        var collectionName = dataQuery.collectionName;

        return self._getCollection(collectionName)
            .then(function (collection) {
                var itemsToRemove = self._readInternal(collection, filter);

                var removedItemsPromises = _.map(itemsToRemove, function (itemToRemove) {
                    return self._mapRemoveItem(itemToRemove, collection, isSync, collectionName);
                });

                return Promise.all(removedItemsPromises);
            })
            .then(function (itemsToRemove) {
                return self._persistData(collectionName)
                    .then(function () {
                        return itemsToRemove;
                    });
            })
            .then(function (itemsToRemove) {
                return self._transformOfflineResult(itemsToRemove.length);
            });
    }

    aggregate(dataQuery, queryParams) {
        var self = this;

        return this._getCollection(dataQuery.collectionName).then(function (collection) {
            if (!queryParams || !queryParams.aggregate || _.isEmpty(queryParams.aggregate)) {
                throw new EverliveError({message: 'You must specify a valid aggregation definition. Either GroupBy or Aggregate is required.'});
            }

            var aggregationQuery = _.extend({}, queryParams.aggregate);
            aggregationQuery.Filter = queryParams.filter;

            var translatedPipeline = aggregationTranslator.translate(aggregationQuery, {
                maxDocumentsCount: Constants.Aggregation.MaxDocumentsCount
            });

            var collectionWithoutDeleted = _.filter(collection, function (item:any) {
                return item[Constants.offlineItemsStateMarker] !== Constants.offlineItemStates.deleted;
            });

            var result = mingo.aggregate(collectionWithoutDeleted, translatedPipeline);
            return self._transformOfflineResult(result, null, dataQuery);
        });
    }

    purgeAll(success, error) {
        this._collectionCache = {};
        return super.purgeAll(success, error);
    }

    purge(contentType, success, error) {
        delete this._collectionCache[contentType];
        return super.purge(contentType, success, error);
    }

    purgeById(contentType, itemId) {
        var self = this;

        return this._getCollection(contentType)
            .then(function (collection) {
                delete collection[itemId];
                return self._persistData(contentType);
            });
    }
}