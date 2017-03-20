import * as _ from 'underscore';
import { EverliveError, EverliveErrors } from '../../EverliveError';
import { Persister } from '../persisters/Persister';
import { CryptographicProvider } from '../../encryption/CryptographicProvider';
import { OfflineFilesProcessor } from '../OfflineFilesProcessor';
import { Everlive } from '../../Everlive';
import { Constants, DataQueryOperation } from '../../constants';
import { Utils } from '../../utils';
import { offlineTransformations } from '../offlineTransformations';
import { expandProcessor } from '../../ExpandProcessor';

const unsupportedOfflineHeaders = [Constants.Headers.powerFields];
const mingo = require('mingo');

const unsupportedUsersOperations = {
    [DataQueryOperation.Create]: true,
    [DataQueryOperation.Update]: true,
    [DataQueryOperation.Delete]: true,
    [DataQueryOperation.DeleteById]: true,
    [DataQueryOperation.RawUpdate]: true,
    [DataQueryOperation.SetAcl]: true,
    [DataQueryOperation.SetOwner]: true,
    [DataQueryOperation.UserLoginWithProvider]: true,
    [DataQueryOperation.UserLinkWithProvider]: true,
    [DataQueryOperation.UserUnlinkFromProvider]: true,
    [DataQueryOperation.UserLogin]: true,
    [DataQueryOperation.UserLogout]: true,
    [DataQueryOperation.UserChangePassword]: true,
    [DataQueryOperation.UserResetPassword]: true
};

function buildUsersErrorMessage(dataQuery):{ message: string, code: number } {
    var unsupportedUserSocialProviderOperations = [
        DataQueryOperation.UserLoginWithProvider,
        DataQueryOperation.UserLinkWithProvider,
        DataQueryOperation.UserUnlinkFromProvider
    ];

    var operation = dataQuery.operation;
    let operationStr = DataQueryOperation[dataQuery.operation];
    if (unsupportedUserSocialProviderOperations.indexOf(operation) !== -1) {
        let providerPrefix = operationStr.substring(0, operationStr.indexOf('Provider'));
        operationStr = providerPrefix + (dataQuery.data.Provider || dataQuery.data.Identity.Provider);
    }

    return {message: 'The Users operation ' + operationStr + ' is not supported in offline mode', code: 0};
}

function buildFilesErrorMessage(dataOperation:DataQueryOperation):{ message: string, code: number } {//TODO: error type
    let operationStr = DataQueryOperation[dataOperation];
    return {message: `The Files operation ${operationStr} is not supported in offline mode`, code: 0};
}

export class OfflineQueryProcessor {
    constructor(public persister:Persister,
                public _encryptionProvider:CryptographicProvider,
                public offlineFilesProcessor:OfflineFilesProcessor,
                public everlive:Everlive,
                public setup:any) {
    }

    processQuery(dataQuery):Promise<any> {
        throw new EverliveError({message: 'The method processQuery is not implemented'});
    }

    _persistData(contentType, items?) {
        throw new EverliveError({message: 'The method _persistData is not implemented'});
    }

    _shouldAutogenerateIdForContentType(contentType) {
        return !(this.setup && this.setup.typeSettings && this.setup.typeSettings[contentType] && this.setup.typeSettings[contentType].autoGenerateId === false);
    }

    _getAllCollections():Promise<any> {
        throw new EverliveError({message: 'The method _getAllCollections is not implemented'});
    }

    purgeAll(success, error) {
        return Utils.buildPromise((success, error) => {
            this.persister.purgeAll(() => {
                const cachingIsEnabled = this.everlive.setup.caching && this.everlive.setup.caching.enabled === true;
                if (cachingIsEnabled) {
                    this.everlive.cache.clearAll(success, error);
                } else {
                    success();
                }
            }, error);
        }, success, error);
    }

    purge(contentType, success, error) {
        return Utils.buildPromise((success, error) => {
            this.persister.purge(contentType, () => {
                const cachingIsEnabled = this.everlive.setup.caching && this.everlive.setup.caching.enabled === true;
                if (cachingIsEnabled) {
                    this.everlive.cache.clear(contentType, success, error);
                } else {
                    success();
                }
            }, error);
        }, success, error);
    }

    purgeById(contentType, itemId):Promise<any> {
        return new Promise((resolve, reject) => {
            this.persister.purgeById(contentType, itemId, resolve, reject);
        });
    }


    checkSupportedQuery(dataQuery):{ message: string, code: number } {
        for (var i = 0; i < unsupportedOfflineHeaders.length; i++) {
            var header = unsupportedOfflineHeaders[i];
            if (dataQuery.getHeader(header)) {
                return {message: 'The header ' + header + ' is not supported in offline mode', code: 0};
            }
        }

        if (Utils.isContentType.users(dataQuery.collectionName) && unsupportedUsersOperations[dataQuery.operation]) {
            return buildUsersErrorMessage(dataQuery);
        }

        let isSingle = dataQuery.additionalOptions && dataQuery.additionalOptions.id;
        let isUpdateByFilter = dataQuery.operation === DataQueryOperation.Update && !isSingle;
        let isRawUpdate = dataQuery.operation === DataQueryOperation.RawUpdate;
        let creatingMultiple = dataQuery.operation === DataQueryOperation.Create && Array.isArray(dataQuery.data);

        if (Utils.isContentType.files(dataQuery.collectionName)) {
            if (creatingMultiple) {
                return EverliveErrors.invalidRequest;
            } else if (isRawUpdate || isUpdateByFilter) {
                return buildFilesErrorMessage(dataQuery.operation);
            }
        }
    }


    _setItemDates(currentItem, itemToCreate, contentType) {
        // we need to manually clone the dates in order to dereference them from the original object as
        // _.extends will pass a reference to the original date instead of creating a new instance
        if (Utils.isDate(currentItem.CreatedAt)) {
            itemToCreate.CreatedAt = Utils.cloneDate(currentItem.CreatedAt);
        } else {
            itemToCreate.CreatedAt = new Date();
        }

        if (Utils.isDate(currentItem.ModifiedAt)) {
            itemToCreate.ModifiedAt = Utils.cloneDate(currentItem.ModifiedAt);
        } else {
            itemToCreate.ModifiedAt = Utils.cloneDate(itemToCreate.CreatedAt);
        }

        itemToCreate.CreatedBy = itemToCreate.CreatedBy || this.everlive.setup.principalId || Constants.guidEmpty;
        itemToCreate.ModifiedBy = itemToCreate.ModifiedBy || itemToCreate.CreatedBy;
        if (contentType === 'Users') {
            itemToCreate.Owner = itemToCreate._id;
        } else {
            itemToCreate.Owner = itemToCreate.CreatedBy || Constants.guidEmpty;
        }
    }

    _transformPersistedData(contentType, contentTypeData) {
        var transformFields = [];

        if (contentType === 'Users') {
            transformFields = transformFields.concat(['Password', 'SecretQuestionId', 'SecretAnswer']);
        }

        if (transformFields.length) {
            _.each(contentTypeData, function (contentTypeObject) {
                offlineTransformations.removeFieldsTransform(contentTypeObject, transformFields);
            });
        }
    }

    _overwriteFile(itemId, itemForUpdate, isSync) {
        return this.everlive.offlineStorage.files.purge(itemId)
            .then(() => {
                return this.offlineFilesProcessor.upsertFileFromObject(itemForUpdate, true, isSync);
            })
    }

    _getCreateResult(createdItems, returnFullItem) {
        if (createdItems.length === 1) {
            var result;
            if (returnFullItem) {
                var item = _.extend({}, createdItems[0]);
                result = offlineTransformations.idTransform(item);
            } else {
                result = {
                    CreatedAt: Utils.cloneDate(createdItems[0].CreatedAt),
                    Id: createdItems[0]._id
                }
            }

            return {
                result: result
            };
        } else {
            var multipleCreateResult = [];
            _.each(createdItems, function (createdItem:any) {
                var item;
                if (returnFullItem) {
                    var itemCopy = _.extend({}, createdItem);
                    item = offlineTransformations.idTransform(itemCopy);
                } else {
                    item = {
                        CreatedAt: Utils.cloneDate(createdItem.CreatedAt),
                        Id: createdItem._id
                    };
                }
                multipleCreateResult.push(item);
            });

            return {
                result: multipleCreateResult
            };
        }
    }

    protected _prepareExpand(expand, dataQuery, isArray) {
        return new Promise(function (resolve, reject) {
            if (expand) {
                expandProcessor.prepare(expand, dataQuery.collectionName, isArray, dataQuery.fields, null, null, function (err, prepareResult) {
                    if (err) {
                        if (err.name === 'ExpandError') {
                            err.code = EverliveErrors.invalidExpandExpression.code;
                        }
                        return reject(err);
                    }
                    resolve(prepareResult);
                });
            } else {
                resolve();
            }
        });
    }

    protected _expandResult(prepareExpandResult, result) {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (prepareExpandResult) {
                expandProcessor.expand(prepareExpandResult.relationsTree, result, {
                    offlineModule: self
                }, function (err, result) {
                    if (err) {
                        if (err.name === 'ExpandError') {
                            err.code = EverliveErrors.invalidExpandExpression.code;
                        }
                        return reject(err);
                    }
                    resolve(result);
                });
            } else {
                resolve(result);
            }
        });
    }

    getDownloadUrlById(dataQuery) {
        var self = this;
        var id = dataQuery.additionalOptions.id;
        var offlineFilePath;
        var fileDirectUri;

        return self.everlive
            .files
            .useOffline(true)
            .isSync(dataQuery.isSync)
            .getById(id)
            .then(function (res) {
                var file = res.result;
                fileDirectUri = file.Uri;
                return self.everlive.offlineStorage.files._getFileUrlForId(file.Id, file.Filename);
            })
            .then(function (filePath) {
                offlineFilePath = filePath;
                return self.everlive.offlineStorage.offlineFilesProcessor.fileStore.getFileByAbsolutePath(filePath);
            })
            .then(function (fileEntry) {
                return {
                    result: {
                        Uri: fileEntry ? offlineFilePath : fileDirectUri
                    }
                };
            });
    }

    _transformOfflineResult(resultSet, count?, dataQuery?, additionalTransformations?) {
        var transformedResult = {
            result: resultSet,
            count: count || (resultSet || []).length
        };

        if ((count !== undefined && count !== null) || Array.isArray(resultSet)) {
            transformedResult.count = count || resultSet.length;
        }

        var transformations = [];

        transformations.push(offlineTransformations.idTransform);
        transformations.push(offlineTransformations.removeMarkersTransform);

        if (dataQuery) {
            var includeCount = dataQuery.getHeader(Constants.Headers.includeCount);
            if (includeCount === false) {
                delete transformedResult.count;
            }

            var singleFieldExpression = dataQuery.getHeader(Constants.Headers.singleField);
            if (typeof singleFieldExpression === 'string') {
                transformations.push(offlineTransformations.singleFieldTransform.bind(this, singleFieldExpression));
            }
        }

        if (additionalTransformations) {
            transformations = transformations.concat(additionalTransformations);
        }

        this._applyTransformations(transformedResult, transformations);

        if (transformedResult.count === undefined) {
            delete transformedResult.count;
        }

        return transformedResult;
    }

    _applyTransformations(transformedResult:any, transformations) {
        if (Array.isArray(transformedResult.result)) {
            _.each(transformations, function (transformation:(v:string) => string) {
                transformedResult.result.map(function (value:string, key) {
                    transformedResult.result[key] = transformation(value);
                });
            });
        } else {
            _.each(transformations, function (transformation:(v:string) => string) {
                transformedResult.result = transformation(transformedResult.result);
            });
        }
    }

    _getDirtyItems(collection) {
        var filter = {};
        filter[Constants.offlineItemsStateMarker] = {$exists: true, $ne: null};
        var query = mingo.Query(filter);
        var cursor = mingo.Cursor(collection, query);
        return cursor.all();
    }

    _getWithoutDeletedFilter(filter, checkNull = false) {
        var withoutDeletedFilter = {
            $and: []
        };
        withoutDeletedFilter.$and.push(filter);
        var deleteOfflineFilter = {};
        if(checkNull){
            deleteOfflineFilter['$or'] = [
                {[Constants.offlineItemsStateMarker]: {$ne: Constants.offlineItemStates.deleted}},
                {[Constants.offlineItemsStateMarker]: {$is: null}}
            ];
        }else {
            deleteOfflineFilter[Constants.offlineItemsStateMarker] = {$ne: Constants.offlineItemStates.deleted};
        }
        withoutDeletedFilter.$and.push(deleteOfflineFilter);
        return withoutDeletedFilter;
    }
}