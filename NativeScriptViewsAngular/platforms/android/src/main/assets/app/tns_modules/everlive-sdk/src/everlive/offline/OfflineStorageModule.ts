declare const FileTransfer: any;

import * as _ from 'underscore';

import { DataQuery } from '../dataQuery/DataQuery';
import { EverliveError, EverliveErrors } from '../EverliveError';
import { Constants } from '../constants';
import { RequestOptionsBuilder } from '../query/RequestOptionsBuilder';
import { Utils } from '../utils';
import { Request } from '../Request';
import { offlineTransformations } from './offlineTransformations';
import { OfflineQueryProcessor } from './processors/OfflineQueryProcessor';
import { OfflineFilesProcessor } from './OfflineFilesProcessor';
import { OfflineFilesModule } from './OfflineFilesModule';
import { Query } from '../query/Query';
import { RequestService } from '../services/RequestService';
import { Everlive } from '../Everlive';
import { Persister } from './persisters/Persister';
import { CryptographicProvider } from '../encryption/CryptographicProvider';
import { OfflineInMemoryQueryProcessor } from './processors/OfflineInMemoryQueryProcessor';
import { OfflineSQLiteQueryProcessor } from './processors/OfflineSQLiteQueryProcessor';

const syncLocation = {
    server: 'server',
    client: 'client'
};

function getSyncFilterForItem(item) {
    var filter: any = getSyncFilterNoModifiedAt(item);
    filter.ModifiedAt = item.ModifiedAt;
    return filter;
}

function getSyncFilterNoModifiedAt(item) {
    return {
        Id: item.Id
    }
}


function getQueryProcessor(persister: Persister, _encryptionProvider: CryptographicProvider, offlineFilesProcessor: OfflineFilesProcessor, everlive: Everlive, options: any):OfflineQueryProcessor {
    let queryProcessor;
    const storageProvider = options.storage.provider;
    switch (storageProvider) {
        case Constants.StorageProvider.LocalStorage:
        case Constants.StorageProvider.FileSystem:
        case Constants.StorageProvider.Custom:
            queryProcessor = new OfflineInMemoryQueryProcessor(persister, _encryptionProvider, offlineFilesProcessor, everlive, options);
            break;
        case Constants.StorageProvider.SQLite:
            queryProcessor = new OfflineSQLiteQueryProcessor(persister, _encryptionProvider, offlineFilesProcessor, everlive, options);
            break;
        default:
            throw new EverliveError({message: 'Unsupported storage type ' + storageProvider});
    }

    return queryProcessor;
}

/**
 * @class OfflineModule
 * @classDesc A class providing access to the various offline storage features.
 */

/**
 * Represents the {@link OfflineModule} class.
 * @memberOf Everlive.prototype
 * @member {OfflineModule} offlineStorage
 */
export class OfflineStorageModule {
    private _isSynchronizing: boolean = false;
    private _syncResultInfo: any;

    offlineFilesProcessor: OfflineFilesProcessor;
    queryProcessor: OfflineQueryProcessor;

    /**
     * @memberOf OfflineModule.prototype
     * @instance
     * @description An instance of the [OfflineFilesModule]{@link OfflineFilesModule} class for working with files in offline mode.
     * @member {OfflineFilesModule} files
     */
    files: any;

    constructor(
        private _everlive: Everlive,
        public options: any,
        persister: Persister,
        private _encryptionProvider: CryptographicProvider
    ) {

        this.offlineFilesProcessor = new OfflineFilesProcessor(this.options, this._everlive);
        this.queryProcessor = getQueryProcessor(persister, _encryptionProvider,
            this.offlineFilesProcessor, this._everlive, this.options);

        this.files = new OfflineFilesModule(this.offlineFilesProcessor, this._everlive,
            this.options.files.maxConcurrentDownloads);

    }

    /**
     * Removes all data from the offline storage. If caching is enabled clears the entire cache as well.
     * @method purgeAll
     * @name purgeAll
     * @memberOf OfflineModule.prototype
     * @param {function} [success] A success callback.
     * @param {function} [error] An error callback.
     */
    /**
     * Removes all data from the offline storage. If caching is enabled clears the entire cache as well.
     * @method purgeAll
     * @name purgeAll
     * @memberOf OfflineModule.prototype
     * @returns {Promise}
     */
    purgeAll(success, error) {
        return this.queryProcessor.purgeAll(success, error);
    }

    /**
     * Removes all data for a specific content type from the offline storage. If caching is enabled clears the cache
     * for the specified content type as well.
     * @method purge
     * @name purge
     * @memberOf OfflineModule.prototype
     * @param {string} contentType The content type to purge.
     * @param {function} [success] A success callback.
     * @param {function} [error] An error callback.
     */
    /**
     * Removes all data for a specific content type from the offline storage. If caching is enabled clears the cache
     * for the specified content type as well.
     * @method purge
     * @name purge
     * @memberOf OfflineModule.prototype
     * @param {string} contentType The content type to purge.
     * @returns {Promise}
     */
    purge(contentType, success, error) {
        return this.queryProcessor.purge(contentType, success, error);
    }

    processQuery(query): Promise<any> {
        return this.queryProcessor.processQuery(query);
    }

    _setOffline(offline) {
        this.options.offline = offline;
    }

    isOnline(): boolean {
        return !this.options.offline;
    }

    _prepareSyncData(contentTypesForSync) {
        var self = this;

        var contentTypesSyncData = {};
        var conflicts = [];
        _.each(contentTypesForSync, function(contentType: any, typeName: any) {
            var syncItems = offlineTransformations.idTransform(contentType.offlineItemsToSync);
            var syncData = self._getSyncItemStates(typeName, syncItems, contentType.serverItems);
            conflicts.push(syncData.conflicts);
            contentTypesSyncData[typeName] = syncData.itemsForSync;
        });

        return {
            conflicts: conflicts,
            contentTypesSyncData: contentTypesSyncData
        };
    }

    _resolveConflicts(syncData) {
        var self = this;
        return this._applyResolutionStrategy(syncData.conflicts)
            .then(function() {
                return self._mergeResolvedConflicts(syncData.conflicts, syncData.contentTypesSyncData);
            })
            .then(function() {
                return syncData.contentTypesSyncData;
            });
    }

    isSynchronizing() {
        return this._isSynchronizing;
    }

    _fireSyncStart() {
        var self = this;

        return new Promise(function(resolve) {
            if (!self._isSynchronizing) {
                self._isSynchronizing = true;
                self._everlive.emit(Constants.Events.SyncStart);
                resolve();
            } else {
                resolve();
            }
        });
    }

    _fireSyncEnd() {
        this._isSynchronizing = false;
        this._everlive.emit(Constants.Events.SyncEnd, this._syncResultInfo);
        this._syncResultInfo = null;
    }

    _eachSyncItem(items: any, getFilterFunction: Function, contentTypeName: string, operation: Function) {
        var self = this;

        _.each(items, function(item: any) {
            var itemFilter = getFilterFunction(item.remoteItem);
            // if we already have an error for this item we do not want to try and sync it again
            var resultItem = item.resultingItem;
            var isCustom = item.isCustom;
            var resolutionType = item.resolutionType;
            if ((<any>_).some(self._syncResultInfo.failedItems[contentTypeName], {
                    itemId: resultItem.Id
                })) {
                return;
            }

            operation(resultItem, itemFilter, isCustom, resolutionType);
        });
    }

    _shouldAutogenerateIdForContentType(collectionName) {
        return this.queryProcessor._shouldAutogenerateIdForContentType(collectionName);
    }

    _addCreatedFileToSyncPromises(resultingItemsForCreate: any, syncPromises: any, collectionName: string) {
        var self = this;

        _.each(resultingItemsForCreate, function(item: any) {
            var filesCollection = self._everlive.files;
            syncPromises[item.Id] = new Promise(function(resolve, reject) {
                self.files.getOfflineLocation(item.Id)
                    .then(function(location) {
                        if (location) {
                            return self._transferFile(false, item, location);
                        }
                    }, function(err) {
                        reject({
                            type: Constants.offlineItemStates.created,
                            items: item,
                            contentType: collectionName,
                            error: err,
                            storage: syncLocation.server
                        });
                    })
                    .then(function(res) {
                        var mergedWithServerResponseItem = _.extend({}, item, res.result);
                        self._onItemProcessed(mergedWithServerResponseItem, collectionName, syncLocation.server, Constants.offlineItemStates.created);
                        return filesCollection
                            .isSync(true)
                            .useOffline(true)
                            .updateSingle(mergedWithServerResponseItem);
                    }, function(err) {
                        reject({
                            type: Constants.offlineItemStates.created,
                            items: item,
                            contentType: collectionName,
                            error: err,
                            storage: syncLocation.server
                        });
                    })
                    .then(resolve, function(err) {
                        reject({
                            type: Constants.offlineItemStates.modified,
                            items: item,
                            contentType: collectionName,
                            error: err,
                            storage: syncLocation.client
                        });
                    });
            });
        });
    }

    _transferFile(isUpdate: boolean, item: any, location: string) {
        var sdk = this._everlive;

        return new Promise(function(resolve, reject) {
            var self = this;
            var uploadUrl = sdk.files.getUploadUrl();
            var fileExistsPromise = Utils.successfulPromise();

            if (isUpdate) {
                fileExistsPromise = new Promise(function(resolve) {
                    sdk.files
                        .isSync(true)
                        .applyOffline(false)
                        .getById(item.Id)
                        .then(function() {
                            resolve(true);
                        })
                        .catch(function() {
                            resolve(false);
                        });
                });
            }

            fileExistsPromise.then(function(fileExistsOnServer) {
                var canUpdate = isUpdate && fileExistsOnServer;
                if (canUpdate) {
                    uploadUrl += '/' + item.Id + '/Content';
                }

                var fileTransfer = new FileTransfer();
                var fileKey = Constants.fileUploadKey;
                var options = {
                    fileKey: fileKey,
                    httpMethod: canUpdate ? 'PUT' : 'POST',
                    mimeType: item.ContentType,
                    fileName: item.Filename,
                    headers: sdk.buildAuthHeader(),
                    params: {}
                };

                _.each(item, function(value: string, key: string) {
                    if (key.toLowerCase() !== 'base64') {
                        var prefixedKey = Constants.fileUploadKey + Constants.fileUploadDelimiter + key;
                        options.params[prefixedKey] = value;
                    }
                });

                fileTransfer.upload(location, uploadUrl, function(result) {
                    var parsedResult = Utils.parseUtilities.parseJSON(result.response);
                    if (parsedResult.Result === false) {
                        reject.apply(self, arguments);
                    } else if (_.isArray(parsedResult.Result)) {
                        resolve({
                            result: parsedResult.Result[0]
                        })
                    } else {
                        resolve(parsedResult);
                    }
                }, reject, options, true);
            });
        });
    }

    _addCreatedObjectToSyncPromises(syncPromises: any, dataCollection: any, resultingItemsForCreate: any, contentTypeData: any, collectionName: string, ids: any) {
        var self = this;

        var promise = new Promise(function(resolve, reject) {
            dataCollection
                .isSync(true)
                .applyOffline(false)
                .create(resultingItemsForCreate)
                .then(function(res: any) {
                    resultingItemsForCreate = _.map(resultingItemsForCreate, function(item: any, index: number) {
                        item.Id = res.result[index].Id;
                        item.CreatedAt = item.ModifiedAt = res.result[index].CreatedAt;
                        var resultingItem: any = _.find(contentTypeData.createdItems, function(createdItem: any) {
                            return createdItem.resultingItem.Id === item.Id;
                        });

                        if (resultingItem.isCustom) {
                            self._onItemProcessed(item, collectionName, syncLocation.client, Constants.offlineItemStates.modified);
                        }

                        return item;
                    });
                }, function(err: any) {
                    const error = err.error || err;
                    throw {
                        type: Constants.offlineItemStates.created,
                        items: resultingItemsForCreate,
                        contentType: collectionName,
                        error: error,
                        storage: syncLocation.server
                    };
                })
                .then(function() {
                    return dataCollection
                        .isSync(true)
                        .useOffline(true)
                        .create(resultingItemsForCreate)
                        .then(function() {
                            _.each(resultingItemsForCreate, function(createdItem) {
                                self._onItemProcessed(createdItem, collectionName, syncLocation.server,
                                    Constants.offlineItemStates.created);
                            });
                        }, function(err) {
                            throw {
                                type: Constants.offlineItemStates.created,
                                items: resultingItemsForCreate,
                                contentType: collectionName,
                                error: err,
                                storage: syncLocation.client
                            };
                        });
                })
                .then(function() {
                    if (ids && ids.length) {
                        var filter = {
                            Id: {
                                $in: ids
                            }
                        };
                        return dataCollection
                            .isSync(true)
                            .useOffline(true)
                            .destroy(filter)
                            .catch(function(err) {
                                throw {
                                    type: Constants.offlineItemStates.created,
                                    items: resultingItemsForCreate,
                                    contentType: collectionName,
                                    error: err,
                                    storage: syncLocation.client
                                };
                            });
                    }
                })
                .then(resolve)
                .catch(function(err) {
                    reject(err);
                });
        });

        _.each(resultingItemsForCreate, function(item: any) {
            syncPromises[item.Id] = promise;
        });

        return resultingItemsForCreate;
    }

    _addCreatedItemsForSync(contentTypeData, syncPromises, dataCollection) {
        var collectionName = dataCollection.collectionName;

        var resultingItemsForCreate = _.pluck(contentTypeData.createdItems, 'resultingItem');
        var ids;
        if (!this._shouldAutogenerateIdForContentType(collectionName)) {
            ids = _.pluck(resultingItemsForCreate, 'Id');
            resultingItemsForCreate = offlineTransformations.removeIdTransform(resultingItemsForCreate);
        }

        if (Utils.isContentType.files(collectionName)) {
            return this._addCreatedFileToSyncPromises(resultingItemsForCreate, syncPromises, collectionName);
        } else {
            return this._addCreatedObjectToSyncPromises(syncPromises, dataCollection, resultingItemsForCreate, contentTypeData, collectionName, ids);
        }
    }

    _addUpdatedItemsForSync(contentTypeData, getFilterOperation, syncPromises, dataCollection, itemUpdateOperation) {
        var self = this;
        var collectionName = dataCollection.collectionName;
        self._eachSyncItem(contentTypeData.modifiedItems, getFilterOperation, collectionName, itemUpdateOperation);
    }

    _addDeletedItemsForSync(contentTypeData, getFilterOperation, syncPromises, dataCollection, itemDeleteOperation) {
        var self = this;

        var collectionName = dataCollection.collectionName;
        self._eachSyncItem(contentTypeData.deletedItems, getFilterOperation, collectionName, itemDeleteOperation);
    }

    _onSyncResponse(res: any, item: any, collectionName: string, operation: any, isCustomItem: boolean): any {
        var self = this;

        if (res.result !== 1) {
            return new Promise(function(resolve, reject) {
                reject(_.extend({}, EverliveErrors.syncConflict, {
                    contentType: collectionName
                }));
            });
        } else {
            if (operation === DataQuery.operations.Update) {
                self._onItemProcessed(item, collectionName, syncLocation.server, Constants.offlineItemStates.modified);
                var updatedItem = _.extend({}, item, {
                    ModifiedAt: res.ModifiedAt
                });

                //TODO: use the new way of building DataQueries

                var updateQuery = new DataQuery({
                    operation: operation,
                    data: updatedItem,
                    additionalOptions: {
                        id: item.Id
                    },
                    meta: {
                        collectionName: collectionName,
                    },
                    isSync: true
                });

                return this.processQuery(updateQuery)
                    .then(function() {
                        if (isCustomItem) {
                            var existingItem = _.find(self._syncResultInfo.syncedItems[collectionName], function(syncedItem: any) {
                                return syncedItem.itemId === item.Id;
                            });

                            if (!existingItem) {
                                self._onItemProcessed(item, collectionName, syncLocation.client, Constants.offlineItemStates.modified);
                            }
                        }
                    });
            } else if (operation === DataQuery.operations.Delete) {
                self._onItemProcessed(item, collectionName, syncLocation.server, Constants.offlineItemStates.deleted);
                return this._purgeById(collectionName, item.Id)
                    .then(function() {
                        if (isCustomItem) {
                            self._onItemProcessed(item, collectionName, syncLocation.client, Constants.offlineItemStates.deleted);
                        }
                    });
            }
        }
    }

    _purgeById(contentType, itemId):Promise<any> {
        return this.queryProcessor.purgeById(contentType, itemId);
    }

    sync() {
        var self = this;
        self._syncResultInfo = self._syncResultInfo || {
                syncedItems: {},
                syncedToServer: 0,
                syncedToClient: 0,
                failedItems: {},
                error: undefined // added for visibility
            };

        if (!this.isOnline()) {
            throw new EverliveError({message: 'Cannot synchronize while offline'});
        }

        self._fireSyncStart()
            .then(function() {
                return self._applySync();
            })
            .then(function(syncResults) {
                var conflictsWhileSync = [];
                _.each(syncResults, function(syncResult: any, itemId: any) {
                    if (syncResult && syncResult.state === 'rejected') {
                        if (syncResult.reason && syncResult.reason.code === EverliveErrors.syncConflict.code) {
                            conflictsWhileSync.push(syncResult);
                        } else {
                            // to save time and traffic we are using a single create request for all items
                            // this is why if there is an error we need to split the items we tried to create
                            // and set the same error for all items.
                            self._onItemFailed(syncResult, itemId);
                        }
                    }
                });

                if (conflictsWhileSync.length) {
                    return self.sync();
                } else {
                    self._fireSyncEnd();
                }
            })
            .catch(function(err) {
                if (!err) {
                    err = new EverliveError(EverliveErrors.syncErrorUnknown);
                }
                self._syncResultInfo.error = err;
                self._fireSyncEnd();
            });
    }

    _handleKeepServer(typeName, conflictingItem, offlineSyncOperations, contentTypeSyncData) {
        var self = this;

        var serverItem = conflictingItem.serverItem;
        var clientItem = conflictingItem.clientItem;
        var syncQuery;
        if (serverItem && clientItem) {
            // update the item offline
            syncQuery = new DataQuery({
                meta: {
                    collectionName: typeName,
                },
                operation: DataQuery.operations.Update,
                additionalOptions: {
                    id: serverItem.Id
                },
                data: serverItem
            });
        } else if (serverItem && !clientItem) {
            // create item offline
            syncQuery = new DataQuery({
                meta: {
                    collectionName: typeName,
                },
                operation: DataQuery.operations.Create,
                data: serverItem
            });
        } else if (!serverItem && clientItem) {
            // delete item offline
            syncQuery = new DataQuery({
                meta: {
                    collectionName: typeName,
                },
                operation: DataQuery.operations.DeleteById,
                additionalOptions: {
                    id: clientItem.Id
                }
            });
        } else {
            throw new EverliveError({message: 'Both serverItem and clientItem are not set when syncing data with "KeepServer" resolution strategy.'});
        }

        syncQuery.isSync = true;
        offlineSyncOperations.push(new Promise(function(resolve, reject) {
            self.processQuery(syncQuery)
                .then(function() {
                    switch (syncQuery.operation) {
                        case DataQuery.operations.Update:
                            self._onItemProcessed(serverItem, typeName, syncLocation.client, Constants.offlineItemStates.modified);
                            // the files content type is special and needs to enable the file contents offline, so we cannot only
                            // update the data
                            if (Utils.isContentType.files(typeName)) {
                                contentTypeSyncData.modifiedItems.push({
                                    remoteItem: conflictingItem.serverItem,
                                    resultingItem: serverItem,
                                    resolutionType: Constants.ConflictResolution.KeepServer
                                });
                            }
                            break;
                        case DataQuery.operations.Create:
                            self._onItemProcessed(serverItem, typeName, syncLocation.client, Constants.offlineItemStates.created);
                            break;
                        case DataQuery.operations.DeleteById:
                            self._onItemProcessed(clientItem, typeName, syncLocation.client, Constants.offlineItemStates.deleted);
                            break;
                    }
                    resolve();
                }, function(err) {
                    var itemId;
                    var operation;
                    switch (syncQuery.operation) {
                        case DataQuery.operations.Update:
                            itemId = serverItem.Id;
                            operation = Constants.offlineItemStates.modified;
                            break;
                        case DataQuery.operations.Create:
                            itemId = serverItem.Id;
                            operation = Constants.offlineItemStates.created;
                            break;
                        case DataQuery.operations.DeleteById:
                            itemId = clientItem.Id;
                            operation = Constants.offlineItemStates.deleted;
                            break;
                    }

                    reject({
                        itemId: itemId,
                        type: operation,
                        contentType: syncQuery.collectionName,
                        error: err,
                        storage: syncLocation.client
                    })
                })
        }));
    }

    _handleKeepClient(conflictingItem, contentTypeSyncData) {
        var serverItem = conflictingItem.serverItem;
        var clientItem = conflictingItem.clientItem;
        var resultingItem;
        var collection;

        if (serverItem && clientItem) {
            resultingItem = _.extend(clientItem, {
                ModifiedAt: new Date(serverItem.ModifiedAt)
            });
            collection = contentTypeSyncData.modifiedItems;
        } else if (serverItem && !clientItem) {
            resultingItem = serverItem;
            collection = contentTypeSyncData.deletedItems;
        } else if (!serverItem && clientItem) {
            resultingItem = clientItem;
            collection = contentTypeSyncData.createdItems;
        } else {
            throw new EverliveError({message: 'Both serverItem and clientItem are not set when syncing data with "KeepClient" resolution strategy.'});
        }

        collection.push({
            remoteItem: conflictingItem.serverItem,
            resultingItem: resultingItem,
            resolutionType: Constants.ConflictResolution.KeepClient
        });
    }

    _handleCustom(conflictingItem, typeName, offlineSyncOperations, contentTypeSyncData) {
        var serverItem = conflictingItem.serverItem;
        var clientItem = conflictingItem.clientItem;
        var customItem = _.omit(conflictingItem.result.item, 'CreatedAt', 'ModifiedAt');
        if (serverItem && customItem) {
            var createItemOfflineQuery = new DataQuery({
                meta: {
                    collectionName: typeName
                },
                operation: DataQuery.operations.Create,
                data: serverItem, // create the server item offline and it will be updated when sync finishes
                preserveState: true,
                isSync: true
            });

            offlineSyncOperations.push(this.processQuery(createItemOfflineQuery));

            this._onItemProcessed(serverItem, typeName, syncLocation.client, Constants.offlineItemStates.created);
        }

        if (serverItem && customItem && !clientItem) {
            customItem.Id = serverItem.Id;
            contentTypeSyncData.modifiedItems.push({
                remoteItem: serverItem,
                resultingItem: customItem,
                isCustom: true
            });
        } else if (serverItem && !customItem) {
            contentTypeSyncData.deletedItems.push({
                remoteItem: conflictingItem.serverItem,
                resultingItem: serverItem,
                isCustom: true
            });
        } else if (!serverItem && customItem && clientItem) {
            var updateItemOfflineQuery = new DataQuery({
                meta: {
                    collectionName: typeName
                },
                operation: DataQuery.operations.Update,
                data: customItem,
                additionalOptions: {
                    id: clientItem.Id
                }
            });

            offlineSyncOperations.push(this.processQuery(updateItemOfflineQuery));
            customItem.Id = clientItem.Id;

            contentTypeSyncData.createdItems.push({
                remoteItem: serverItem,
                resultingItem: customItem,
                isCustom: true
            });
        } else {
            customItem.Id = serverItem.Id;
            contentTypeSyncData.modifiedItems.push({
                remoteItem: serverItem,
                resultingItem: customItem,
                isCustom: true
            });
        }
    }

    _mergeResolvedConflicts(conflicts: any, syncData: any) {
        var self = this;

        var offlineSyncOperations = [];
        _.each(conflicts, function(conflict: any) {
            var typeName = conflict.contentTypeName;
            _.each(conflict.conflictingItems, function(conflictingItem: any) {
                var contentTypeSyncData = syncData[typeName];
                switch (conflictingItem.result.resolutionType) {
                    case Constants.ConflictResolution.KeepServer:
                        self._handleKeepServer(typeName, conflictingItem, offlineSyncOperations, contentTypeSyncData);
                        break;
                    case Constants.ConflictResolution.KeepClient:
                        self._handleKeepClient(conflictingItem, contentTypeSyncData);
                        break;
                    case Constants.ConflictResolution.Custom:
                        if (Utils.isContentType.files(typeName)) {
                            throw new EverliveError(EverliveErrors.customFileSyncNotSupported);
                        }

                        self._handleCustom(conflictingItem, typeName, offlineSyncOperations, contentTypeSyncData);
                        break;
                    case Constants.ConflictResolution.Skip:
                        break;
                }
            });
        });

        return Promise.all(offlineSyncOperations);
    }

    _getSyncItemStates(contentType, offlineItems, serverItems) {
        var self = this;

        var contentTypeSyncData = {
            itemsForSync: {
                createdItems: [],
                modifiedItems: [],
                modifiedItemsOnServer: [],
                deletedItems: [],
                deletedItemsOnServer: []
            },
            conflicts: {
                contentTypeName: contentType,
                conflictingItems: []
            }
        };

        _.each(offlineItems, function(offlineItem: any) {
            var serverItem: any = _.findWhere(serverItems, {
                Id: offlineItem.Id
            });
            if (serverItem) {
                if (serverItem.Id === offlineItem.Id && offlineItem[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.created) {
                    if (self.options.conflicts.strategy === Constants.ConflictResolutionStrategy.Custom) {
                        self._onItemFailed({
                            type: Constants.offlineItemStates.modified,
                            storage: syncLocation.client,
                            error: new EverliveError(EverliveErrors.syncError),
                            contentType: contentType
                        }, offlineItem.Id);

                        return self._onItemFailed({
                            type: Constants.offlineItemStates.modified,
                            storage: syncLocation.server,
                            error: new EverliveError(EverliveErrors.syncError),
                            contentType: contentType
                        }, serverItem.Id);
                    } else {
                        return self._onItemFailed({
                            type: Constants.offlineItemStates.created,
                            storage: syncLocation.client,
                            error: new EverliveError(EverliveErrors.syncError),
                            contentType: contentType
                        }, serverItem.Id);
                    }
                }

                var clientItemChanged = !!offlineItem[Constants.offlineItemsStateMarker];
                var hasUpdateConflict = false;

                if (clientItemChanged) {
                    hasUpdateConflict = serverItem.ModifiedAt.getTime() !== offlineItem.ModifiedAt.getTime() || offlineItem[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.deleted;
                    //TODO: when an item is removed offline its ModifiedAt field is not set, check if it needs to be set or we can use this
                }

                if (hasUpdateConflict) {
                    contentTypeSyncData.conflicts.conflictingItems.push({
                        // if the item was modified on the server and deleted locally we have a conflict and set the client item to null
                        // otherwise it is a simple modification conflict
                        clientItem: offlineItem[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.deleted ? null : offlineItem,
                        serverItem: serverItem,
                        result: {}
                    });
                } else {
                    if (offlineItem[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.deleted) {
                        contentTypeSyncData.itemsForSync.deletedItems.push({
                            remoteItem: serverItem,
                            resultingItem: offlineItem
                        });
                    } else if (offlineItem[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.modified) {
                        contentTypeSyncData.itemsForSync.modifiedItems.push({
                            remoteItem: serverItem,
                            resultingItem: offlineItem
                        });
                    } else if (offlineItem[Constants.offlineItemsStateMarker] === undefined || offlineItem[Constants.offlineItemsStateMarker] === null) {
                        contentTypeSyncData.itemsForSync.modifiedItemsOnServer.push(serverItem);
                    } else {
                        contentTypeSyncData.itemsForSync.modifiedItems.push({
                            remoteItem: serverItem,
                            resultingItem: serverItem
                        });
                    }
                }
            } else {
                // if the item in memory has been modified, but the item on the server has been deleted
                if (offlineItem[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.modified) {
                    contentTypeSyncData.conflicts.conflictingItems.push({
                        clientItem: offlineItem,
                        serverItem: null,
                        result: {}
                    });
                } else if (offlineItem[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.created) {
                    contentTypeSyncData.itemsForSync.createdItems.push({
                        remoteItem: serverItem,
                        resultingItem: offlineItem
                    });
                } else {
                    contentTypeSyncData.itemsForSync.deletedItemsOnServer.push(offlineItem);
                }
            }

            delete offlineItem[Constants.offlineItemsStateMarker];
        });

        return contentTypeSyncData;
    }

    _setResolutionTypeForItem(resolutionType, conflictingItem) {
        conflictingItem.result = {
            resolutionType: resolutionType
        };
    }

    _applyResolutionStrategy(conflicts) {
        var self = this;
        var conflictResolutionStrategy = self.options.conflicts.strategy;
        return new Promise(function(resolve, reject) {
            var conflictResolutionPromises = [];

            for (var i = 0; i < conflicts.length; i++) {
                var conflict = conflicts[i];
                if (conflict.conflictingItems.length) {
                    switch (conflictResolutionStrategy) {
                        case Constants.ConflictResolutionStrategy.ServerWins:
                            _.each(conflict.conflictingItems,
                                self._setResolutionTypeForItem.bind(self, Constants.ConflictResolution.KeepServer));
                            break;
                        case Constants.ConflictResolutionStrategy.Custom:
                            var customStrategy = self.options.conflicts.implementation;
                            if (!customStrategy) {
                                return reject(new EverliveError({message: 'Implementation of the conflict resolution strategy ' +
                                'must be provided when set to Custom'}));
                            }

                            conflictResolutionPromises.push(new Promise(function(resolve) {
                                customStrategy(conflicts, resolve);
                            }));
                            break;
                        default:
                            return reject(new EverliveError({message: 'Invalid resolution strategy provided'}));
                    }
                }
            }

            Promise.all(conflictResolutionPromises)
                .then(function() {
                    resolve();
                });
        });
    }

    _getSyncPromiseBatch(contentType, batchIds) {
        var self = this;

        var dataQuery = new DataQuery({
            meta: {
                collectionName: contentType
            },
            query: new Query({
                'Id': {
                    '$in': batchIds
                }
            }),
            operation: DataQuery.operations.Read,
            applyOffline: false
        });

        var getRequestOptionsFromQuery = RequestOptionsBuilder[dataQuery.operation];
        var requestOptions = getRequestOptionsFromQuery(dataQuery);
        var request = new Request(self._everlive.setup, requestOptions);

        return RequestService.sendRequest(request);
    }

    _getPlainItemsForSync(collection, forceDirty?): any {
        if (this.options.syncUnmodified && !forceDirty) {
            return _.values(collection);
        } else {
            return this.queryProcessor._getDirtyItems(collection);
        }
    }

    _getIdsForSync(contentType, offlineItemsToSync) {
        if (this._shouldAutogenerateIdForContentType(contentType)) {
            return _.pluck(offlineItemsToSync, '_id');
        } else {
            return _.pluck(_.reject(offlineItemsToSync, function(offlineItem) {
                return offlineItem[Constants.offlineItemsStateMarker] === Constants.offlineItemStates.created;
            }), '_id');
        }
    }

    _getSyncPromiseForCollection(collection, contentType) {
        var batches = [];
        var batchSize = Constants.syncBatchSize;

        var offlineItemsToSync = this._getPlainItemsForSync(collection);
        var allIdsForSync = this._getIdsForSync(contentType, offlineItemsToSync);

        var batchCount = Math.ceil(allIdsForSync.length / batchSize);

        for (var i = 0; i < batchCount; i++) {
            var batchSkipSize = i * batchSize;
            var batchIds = allIdsForSync.slice(batchSkipSize, batchSkipSize + batchSize);
            var syncGetServerItemsPromise = this._getSyncPromiseBatch(contentType, batchIds);
            batches.push(syncGetServerItemsPromise);
        }

        return Promise.all(batches)
            .then(function(serverItemsSyncResponses) {
                const result = {
                    serverItems: [],
                    offlineItemsToSync: offlineItemsToSync
                };

                _.each(serverItemsSyncResponses, function(serverItems: any) {
                    result.serverItems = <any[]>_.union(result.serverItems, serverItems);
                });

                return result;
            });
    }

    _onItemFailed(syncResult, itemId) {
        var self = this;

        var results = syncResult.reason ? syncResult.reason : syncResult;
        var targetType = results.contentType;

        var getFailedItem = function(id) {
            var pickedObject = _.pick(results, 'storage', 'type', 'error');
            if (!pickedObject.error) {
                pickedObject.error = new EverliveError(EverliveErrors.syncErrorUnknown);
            }
            return _.extend({
                itemId: id,
                contentType: targetType
            }, pickedObject);
        };

        var failedItems = [];
        if (results.type === Constants.offlineItemStates.created && results.items) {
            failedItems = _.map(results.items, function(item: any) {
                return getFailedItem(item.Id);
            });
        } else {
            failedItems.push(getFailedItem(itemId));
        }

        self._syncResultInfo.failedItems[targetType] = self._syncResultInfo.failedItems[targetType] || [];
        _.each(failedItems, function(failedItem) {
            self._syncResultInfo.failedItems[targetType].push(failedItem);
            self._fireItemProcessed(failedItem);
        });
    }

    _onItemProcessed(item, contentType, syncStorage, syncType) {
        var syncInfo = {
            itemId: item.Id,
            type: syncType,
            storage: syncStorage,
            contentType: contentType
        };

        this._syncResultInfo.syncedItems[contentType] = this._syncResultInfo.syncedItems[contentType] || [];
        this._syncResultInfo.syncedItems[contentType].push(syncInfo);

        if (syncInfo.storage == syncLocation.server) {
            this._syncResultInfo.syncedToServer++;
        } else {
            this._syncResultInfo.syncedToClient++;
        }

        this._fireItemProcessed(syncInfo);
    }

    _fireItemProcessed(syncInfo) {
        this._everlive.emit(Constants.Events.ItemProcessed, syncInfo);
    }

    _getClientWinsSyncData(collections, forceDirty) {
        var self = this;
        var syncData = {};
        _.each(collections, function(collection, typeName) {
            if (!syncData[typeName]) {
                syncData[typeName] = {
                    createdItems: [],
                    modifiedItems: [],
                    deletedItems: [],
                    deletedItemsOnServer: [],
                    modifiedItemsOnServer: []
                };
            }

            var plainItems = self._getPlainItemsForSync(collection, forceDirty);
            var itemsForSync = offlineTransformations.idTransform(plainItems);

            _.each(itemsForSync, function(itemForSync) {
                switch (itemForSync[Constants.offlineItemsStateMarker]) {
                    case Constants.offlineItemStates.created:
                        syncData[typeName].createdItems.push({
                            remoteItem: itemForSync,
                            resultingItem: itemForSync
                        });
                        break;
                    case Constants.offlineItemStates.modified:
                        syncData[typeName].modifiedItems.push({
                            remoteItem: itemForSync,
                            resultingItem: itemForSync
                        });
                        break;
                    case Constants.offlineItemStates.deleted:
                        syncData[typeName].deletedItems.push({
                            remoteItem: itemForSync,
                            resultingItem: itemForSync
                        });
                        break;
                }

                delete itemForSync[Constants.offlineItemsStateMarker];
            });
        });

        return syncData;
    }

    _getModifiedFilesForSyncClientWins(itemId, item, collectionName) {
        var self = this;
        var sdk = self._everlive;

        return new Promise(function(resolve, reject) {
            var offlineFiles = self.files;
            offlineFiles.getOfflineLocation(itemId)
                .then(function(location) {
                    if (location) {
                        return self._transferFile(true, item, location)
                            .then(function(result: any) {
                                if (result.Result === false) {
                                    reject({
                                        type: Constants.offlineItemStates.modified,
                                        itemId: item.Id,
                                        contentType: collectionName,
                                        error: result,
                                        storage: syncLocation.server
                                    });
                                } else {
                                    return {
                                        result: result
                                    };
                                }
                            }, function(err) {
                                reject({
                                    type: Constants.offlineItemStates.modified,
                                    itemId: item.Id,
                                    contentType: collectionName,
                                    error: err,
                                    storage: syncLocation.server
                                });
                            });
                    } else {
                        return sdk.files
                            .isSync(true)
                            .applyOffline(false)
                            .updateSingle(item)
                            .then(function(response) {
                                return response;
                            }, function(err) {
                                reject({
                                    type: Constants.offlineItemStates.modified,
                                    itemId: item.Id,
                                    contentType: collectionName,
                                    error: err,
                                    storage: syncLocation.server
                                });
                            });
                    }
                })
                .then(function(onlineResponse) {
                    var onlineResult = onlineResponse.result;
                    item.ModifiedAt = onlineResult.ModifiedAt;
                    self._onItemProcessed(item, collectionName, syncLocation.server, Constants.offlineItemStates.modified);
                    return sdk.files
                        .isSync(true)
                        .useOffline(true)
                        .updateSingle(item);
                })
                .then(resolve)
                .catch(function(err) {
                    reject({
                        type: Constants.offlineItemStates.modified,
                        itemId: item.Id,
                        contentType: collectionName,
                        error: err,
                        storage: syncLocation.server
                    });
                });
        });
    }

    _getModifiedItemForSyncClientWins(dataCollection, item, collectionName) {
        var self = this;

        return new Promise(function(resolve, reject) {
            return dataCollection
                .isSync(true)
                .applyOffline(false)
                .updateSingle(item)
                .then(function(res) {
                    self._onItemProcessed(item, collectionName, syncLocation.server, Constants.offlineItemStates.modified);
                    var updatedItem = _.extend({}, item, {
                        ModifiedAt: res.ModifiedAt
                    });

                    var updateQuery = new DataQuery({
                        operation: DataQuery.operations.Update,
                        data: updatedItem,
                        additionalOptions: {
                            id: item.Id
                        },
                        meta: {
                            collectionName: collectionName
                        },
                        isSync: true
                    });

                    return self.processQuery(updateQuery);
                }, function(res) {
                    reject({
                        storage: syncLocation.server,
                        type: Constants.offlineItemStates.modified,
                        itemId: item.Id,
                        contentType: collectionName,
                        error: res
                    });
                })
                .then(resolve, function(err) {
                    reject({
                        storage: syncLocation.client,
                        type: Constants.offlineItemStates.modified,
                        itemId: item.Id,
                        contentType: collectionName,
                        error: err
                    });
                });
        });
    }

    _addModifiedItemsForSyncClientWins(contentTypeData, syncPromises, dataCollection) {
        var self = this;

        this._addUpdatedItemsForSync(contentTypeData, getSyncFilterNoModifiedAt, syncPromises, dataCollection, function(item) {
            var itemId = item.Id;
            if (!itemId) {
                throw new EverliveError({message: 'When updating an item it must have an Id field.'});
            }
            var collectionName = dataCollection.collectionName;

            if (Utils.isContentType.files(collectionName)) {
                syncPromises[itemId] = self._getModifiedFilesForSyncClientWins(itemId, item, collectionName);
            } else {
                syncPromises[itemId] = self._getModifiedItemForSyncClientWins(dataCollection, item, collectionName);
            }
        });
    }

    _addDeletedItemsForSyncClientWins(contentTypeData, syncPromises, dataCollection) {
        var self = this;

        this._addDeletedItemsForSync(contentTypeData, getSyncFilterNoModifiedAt, syncPromises, dataCollection,
            function(item, itemFilter) {
                var collectionName = dataCollection.collectionName;
                syncPromises[item.Id] = new Promise(function(resolve, reject) {
                    var itemId = item.Id;
                    if (!itemId) {
                        throw new EverliveError({message: 'When deleting an item it must have an Id field.'});
                    }

                    return dataCollection
                        .isSync(true)
                        .applyOffline(false)
                        .destroySingle(itemFilter)
                        .then(function() {
                            self._onItemProcessed(item, collectionName, syncLocation.server, Constants.offlineItemStates.deleted);
                            return self._purgeById(collectionName, item.Id).then(function() {
                                resolve();
                            }, function(err) {
                                reject(_.extend({}, {
                                    storage: syncLocation.client,
                                    type: Constants.offlineItemStates.deleted,
                                    contentType: collectionName,
                                    itemId: itemId,
                                    error: err
                                }));
                            });
                        }, function(err) {
                            reject(_.extend({}, {
                                storage: syncLocation.server,
                                type: Constants.offlineItemStates.deleted,
                                contentType: collectionName,
                                error: err,
                                itemId: itemId
                            }));
                        });
                });
            });
    }

    _applyClientWins(collections) {
        var self = this;
        var syncData = this._getClientWinsSyncData(collections, true);
        var syncPromises = {};

        _.each(syncData, function(contentTypeData: any, typeName: string) {
            var dataCollection = self._everlive.data(typeName);
            if (contentTypeData.createdItems.length) {
                self._addCreatedItemsForSync(contentTypeData, syncPromises, dataCollection);
            }

            if (contentTypeData.modifiedItems.length) {
                self._addModifiedItemsForSyncClientWins(contentTypeData, syncPromises, dataCollection);
            }

            if (contentTypeData.deletedItems.length) {
                self._addDeletedItemsForSyncClientWins(contentTypeData, syncPromises, dataCollection);
            }
        });

        var syncResult;

        return Utils.promiseHashSettled(syncPromises)
            .then(function(result) {
                syncResult = result;
                if (self.options.syncUnmodified) {
                    var promises = [];
                    _.each(collections, function(collection: any, collectionName: string) {
                        var allOfflineItems = self._getPlainItemsForSync(collection);
                        var itemsToDownload = _.where(allOfflineItems, function(offlineItem) {
                            return offlineItem[Constants.offlineItemsStateMarker] !== undefined;
                        });

                        var DataCollection = self._everlive.data(collectionName);

                        var itemIdsForSync = _.pluck(itemsToDownload, '_id');
                        var downloadPromise = DataCollection
                            .isSync(true)
                            .useOffline(false)
                            .get({
                                Id: {
                                    $in: itemIdsForSync
                                }
                            })
                            .then(function(res) {
                                var serverItems = res.result;
                                var serverItemIds = _.pluck(serverItems, 'Id');
                                return self._unmodifiedClientWinsItemsDeletedOnServer(collectionName, serverItemIds, itemsToDownload)
                                    .then(function() {
                                        return self._unmodifiedClientWinsItemsUpdatedOnServer(collectionName, serverItems, itemsToDownload);
                                    });
                            });

                        promises.push(downloadPromise);
                    });

                    return Promise.all(promises);
                }
            })
            .then(function() {
                return syncResult;
            });
    }

    _unmodifiedClientWinsItemsDeletedOnServer(collectionName, serverItemIds, clientItems) {
        var self = this;
        var itemsForDeleteIds = [];
        var itemIdsForSync = _.pluck(clientItems, '_id');
        _.each(itemIdsForSync, function(itemId) {
            if (serverItemIds.indexOf(itemId) === -1) {
                itemsForDeleteIds.push(itemId);
            }
        });

        return Utils.successfulPromise()
            .then(function() {
                if (itemsForDeleteIds.length !== 0) {
                    var deleteQuery = new DataQuery({
                        operation: DataQuery.operations.Delete,
                        filter: {
                            Id: {
                                $in: itemsForDeleteIds
                            }
                        },
                        meta: {
                            collectionName: collectionName
                        },
                        isSync: true
                    });

                    return self.processQuery(deleteQuery).then(function() {
                        _.each(itemsForDeleteIds, function(itemsForDeleteId) {
                            self._onItemProcessed({Id: itemsForDeleteId}, collectionName, syncLocation.client, Constants.offlineItemStates.deleted);
                        });
                    });
                }
            });
    }

    _unmodifiedClientWinsItemsUpdatedOnServer(collectionName, serverItems, clientItems) {
        var self = this;
        var updatePromises = [];

        _.each(serverItems, function(serverItem: any) {
            var item: any = _.find(clientItems, function(clientItem: any) {
                return clientItem._id === serverItem.Id;
            });

            if (item) {
                var updateQuery = new DataQuery({
                    operation: DataQuery.operations.Update,
                    data: serverItem,
                    additionalOptions: {
                        id: item._id
                    },
                    meta: {
                        collectionName: collectionName
                    },
                    isSync: true
                });

                var itemUpdatedPromise = self.processQuery(updateQuery)
                    .then(function(res) {
                        self._onItemProcessed(serverItem, collectionName, syncLocation.client, Constants.offlineItemStates.modified);
                    });

                updatePromises.push(itemUpdatedPromise);
            }
        });

        return Promise.all(updatePromises);
    }

    _modifyFileStandardSync(syncPromises, itemId, item, collectionName, resolutionType) {
        var self = this;

        var filesCollection = self._everlive.files;
        syncPromises[itemId] = new Promise(function(resolve, reject) {
            var offlineLocation;
            self.files.getOfflineLocation(itemId)
                .then(function(locationOnDisk) {
                    offlineLocation = locationOnDisk;
                })
                .then(function() {
                    return filesCollection
                        .isSync(true)
                        .applyOffline(false)
                        .getById(itemId);
                })
                .then(function(response) {
                    var file = response.result;
                    if (file.ModifiedAt.getTime() !== item.ModifiedAt.getTime()) {
                        reject(_.extend({}, new EverliveError(EverliveErrors.syncConflict), {
                            contentType: collectionName
                        }));
                    } else {
                        if (offlineLocation) {
                            if (resolutionType === Constants.ConflictResolution.KeepServer) {
                                return self.files._saveFile(item.Uri, item.Filename, item.Id)
                                    .then(function() {
                                        return self.offlineFilesProcessor.purge(offlineLocation);
                                    })
                                    .then(function() {
                                        return response;
                                    });
                            } else if (resolutionType === Constants.ConflictResolution.KeepClient) {
                                return self._transferFile(true, item, offlineLocation);
                            }
                        }
                    }
                })
                .then(function() {
                    return self._everlive.files
                        .isSync(true)
                        .useOffline(true)
                        .updateSingle(item);
                })
                .then(resolve)
                .catch(reject);
        });
    }

    _modifyContentTypeStandardSync(syncPromises, itemId, dataCollection, item, itemFilter, collectionName, isCustom) {
        var self = this;

        syncPromises[itemId] = dataCollection
            .isSync(true)
            .applyOffline(false)
            .update(item, itemFilter)
            .then(function(res) {
                return self._onSyncResponse(res, item, collectionName, DataQuery.operations.Update, isCustom);
            }, function(err) {
                return new Promise(function(resolve, reject) {
                    reject({
                        type: Constants.offlineItemStates.modified,
                        itemId: item.Id,
                        contentType: collectionName,
                        error: err,
                        storage: syncLocation.server
                    });
                });
            });
    }

    _applyStandardSync(collections) {
        var self = this;

        var promises = {};
        _.each(collections, function(collection, contentType) {
            promises[contentType] = self._getSyncPromiseForCollection(collection, contentType);
        });

        return Utils.promiseHash(promises)
            .then(function(contentTypes) {
                return self._prepareSyncData(contentTypes);
            })
            .then(function(syncData) {
                return self._resolveConflicts(syncData);
            })
            .then(function(contentTypeSyncData) {
                var syncPromises: any = {};
                _.each(contentTypeSyncData, function(contentTypeData: any, collectionName: string) {
                    var dataCollection: any = self._everlive.data(collectionName);
                    if (contentTypeData.createdItems.length) {
                        self._addCreatedItemsForSync(contentTypeData, syncPromises, dataCollection);
                    }

                    if (contentTypeData.modifiedItems.length) {
                        self._addUpdatedItemsForSync(contentTypeData, getSyncFilterForItem, syncPromises, dataCollection, function(item, itemFilter, isCustom, resolutionType) {
                            var itemId = item.Id;

                            if (Utils.isContentType.files(collectionName)) {
                                self._modifyFileStandardSync(syncPromises, itemId, item, collectionName, resolutionType);
                            } else {
                                self._modifyContentTypeStandardSync(syncPromises, itemId, dataCollection, item, itemFilter, collectionName, isCustom);
                            }
                        });
                    }

                    if (contentTypeData.deletedItems.length) {
                        self._addDeletedItemsForSync(contentTypeData, getSyncFilterForItem, syncPromises, dataCollection, function(item, itemFilter, isCustom) {
                            syncPromises[item.Id] = dataCollection
                                .isSync(true)
                                .applyOffline(false)
                                .destroy(itemFilter)
                                .then(function(res) {
                                    return self._onSyncResponse(res, item, collectionName, DataQuery.operations.Delete, isCustom);
                                }, function(err) {
                                    return new Promise(function(resolve, reject) {
                                        reject({
                                            type: Constants.offlineItemStates.deleted,
                                            itemId: item.Id,
                                            contentType: collectionName,
                                            error: err,
                                            storage: syncLocation.server
                                        });
                                    });
                                });
                        });
                    }

                    _.each<any>(contentTypeData.deletedItemsOnServer, function(item: any) {
                        syncPromises[item.Id] = dataCollection
                            .isSync(true)
                            .useOffline(true)
                            .destroySingle({
                                Id: item.Id
                            })
                            .then(function(res) {
                                return self._onItemProcessed(item, collectionName, syncLocation.client, Constants.offlineItemStates.deleted);
                            }, function(err) {
                                return new Promise(function(resolve, reject) {
                                    reject({
                                        type: Constants.offlineItemStates.deleted,
                                        itemId: item.Id,
                                        contentType: collectionName,
                                        error: err,
                                        storage: syncLocation.client
                                    });
                                });
                            });
                    });

                    _.each<any>(contentTypeData.modifiedItemsOnServer, function(item: any) {
                        syncPromises[item.Id] = dataCollection
                            .isSync(true)
                            .useOffline(true)
                            .update(item, {
                                Id: item.Id
                            })
                            .then(function(res) {
                                return self._onItemProcessed(item, collectionName, syncLocation.client, Constants.offlineItemStates.modified);
                            }, function(err) {
                                return Utils.rejectedPromise({
                                    type: Constants.offlineItemStates.modified,
                                    itemId: item.Id,
                                    contentType: collectionName,
                                    error: err,
                                    storage: syncLocation.client
                                })
                            })
                    })
                });

                return Utils.promiseHashSettled(syncPromises);
            });
    }

    _applySync() {
        var self = this;
        return this.queryProcessor._getAllCollections()
            .then(function(collections) {
                if (self.options.conflicts.strategy === Constants.ConflictResolutionStrategy.ClientWins) {
                    return self._applyClientWins(collections);
                } else {
                    return self._applyStandardSync(collections);
                }
            });
    }

    /**
     * Get all the offline items that have not been synced online.
     * @method getItemsForSync
     * @name getItemsForSync
     * @memberOf OfflineModule.prototype
     * @param {function} [success] A success callback.
     * @param {function} [error] An error callback.
     */
    /**
     * Get all the offline items that have not been synced online.
     * @method getItemsForSync
     * @name getItemsForSync
     * @memberOf OfflineModule.prototype
     * @returns {Promise}
     */
    getItemsForSync(success, error) {
        var self = this;
        var plainItemsForSync: any = {};
        return Utils.buildPromise(function(successCb, errorCb) {
            self.queryProcessor._getAllCollections()
                .then(function(collections) {
                    _.each(collections, function(collection: any, collectionName: any) {
                        var plainItems = self._getPlainItemsForSync(collection);
                        plainItemsForSync[collectionName] = _.map(plainItems, function(item) {
                            var itemForSync = {
                                item: _.extend({}, item),
                                action: item[Constants.offlineItemsStateMarker]
                            };

                            delete itemForSync.item[Constants.offlineItemsStateMarker];
                            return itemForSync;
                        });
                    });

                    successCb(plainItemsForSync);
                }).catch(errorCb);
        }, success, error);
    }
}