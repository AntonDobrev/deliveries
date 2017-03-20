import * as _ from 'underscore';
import * as jsonStringify from 'json-stable-stringify';

import { Constants, DataQueryOperation } from '../constants';
import { Utils } from '../utils';
import { RequestService } from '../services/RequestService';
import { BasePersister, getPersister } from '../offline/offlinePersisters';
import { buildOfflineStorageOptions } from '../offline/offline';
import { EverliveError, EverliveErrors, EverliveErrorHelper } from '../EverliveError';
import { Everlive } from '../Everlive';
import { ErrorCallback } from "../interfaces/ErrorCallback";
import { SuccessCallback } from "../interfaces/SuccessCallback";

const cacheableOperations = [
    DataQueryOperation.Read,
    DataQueryOperation.ReadById,
    DataQueryOperation.Count
];

/**
 * @class CacheModule
 * @classDesc A class providing access to the various caching features.
 */
/**
 * Represents the {@link CacheModule} class.
 * @memberOf Everlive.prototype
 * @member {CacheModule} cache
 */
export class CacheModule {
    typeSettings:any;
    maxAgeInMs:number;
    persister:BasePersister;
    cacheData:any;

    constructor(public options:any,
                private _everlive:Everlive) {
        this.typeSettings = this.options.typeSettings;
        this.maxAgeInMs = this.options.maxAgeInMs;
    }

    _hash(obj) {
        return (<any>jsonStringify)(obj);
    }

    _initStore(sdkOptions) {
        if (!this.persister) {
            var offlineStorageOptions = buildOfflineStorageOptions(sdkOptions);
            var storageKey = this.options.storage.storagePath + '_' + sdkOptions.appId;

            this.persister = getPersister(storageKey, offlineStorageOptions);
        }
    }

    _getCacheData() {
        var self = this;

        if (!this.cacheData) {
            return this._persisterGetAllDataWrap()
                .then(function (cacheData) {
                    self.cacheData = cacheData;
                    return self.cacheData;
                });
        }

        return Utils.successfulPromise(this.cacheData);
    }

    _persisterGetAllDataWrap() {
        var self = this;

        return new Promise(function (resolve, reject) {
            return self.persister.getAllData(resolve, reject);
        });
    }

    _persisterSaveDataWrap(contentType, data) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return self.persister.saveData(contentType, JSON.stringify(data), resolve, reject);
        });
    }

    _getCacheDataForContentType(contentType) {
        return this._getCacheData()
            .then(function (cacheData) {
                if (typeof cacheData[contentType] === 'string') {
                    cacheData[contentType] = JSON.parse(cacheData[contentType]);
                } else {
                    cacheData[contentType] = cacheData[contentType] || {};
                }

                return _.clone(cacheData[contentType]);
            });
    }

    //TODO: this method is copied from the cache query processor. It is used in Data.ts -> _applyQueryOnline.
    //This one is not expected to be working ATM
    _cacheDataQuery(query) {
        const shouldSkipCache = this._everlive.cache._shouldSkipCache(query);
        if (shouldSkipCache) {
            if (query.ignoreCache && !this._everlive.cache.isQueryUnsupportedOffline(query)) {
                const hash = this._everlive.cache._getHashForQuery(query);

                return this._everlive.cache._cacheQuery(query, hash, null);
            } else {
                return RequestService.handleRequestProcessing(query, null);
            }
        } else {
            query.useCache = false;
            return this._everlive.cache._processCacheItem(query, null);
        }
    }

    _persistCacheData(contentType, cacheData) {
        var self = this;

        return this._getCacheDataForContentType(contentType)
            .then(function () {
                var dataToCache = _.extend({}, self.cacheData[contentType], cacheData);
                self.cacheData[contentType] = (<any>_).compactObject(dataToCache);
                return self._persisterSaveDataWrap(contentType, self.cacheData[contentType]);
            });
    }

    isQueryUnsupportedOffline(dataQuery) {
        var hasPowerfieldsExpression = !!dataQuery.getHeader(Constants.Headers.powerFields);
        var queryParams = dataQuery.getQueryParameters();
        var dataQueryFilter = queryParams.filter;
        var unsupportedDbOperators = Utils.getUnsupportedOperators(dataQueryFilter);
        var hasUnsupportedOperators = unsupportedDbOperators.length !== 0;
        return hasPowerfieldsExpression || hasUnsupportedOperators;
    }

    _shouldSkipCache(dataQuery) {
        var operationShouldSkipCache = cacheableOperations.indexOf(dataQuery.operation) === -1;
        var collectionName = dataQuery.collectionName;
        var typeSettings = this.typeSettings;
        var cacheDisabledForContentType = typeSettings && typeSettings && typeSettings[collectionName]
            && typeSettings[collectionName].enabled === false;
        var ignoreCacheForQuery = dataQuery.ignoreCache;

        var isUnsupportedOffline = this.isQueryUnsupportedOffline(dataQuery);
        var isForCurrentUser = dataQuery.additionalOptions && dataQuery.additionalOptions.id === 'me';

        return operationShouldSkipCache || cacheDisabledForContentType || isForCurrentUser || ignoreCacheForQuery
            || isUnsupportedOffline;
    }

    _processCacheItem(dataQuery, data) {
        var self = this;

        var contentType = dataQuery.collectionName;
        var hash = this._getHashForQuery(dataQuery);

        return self._getCacheDataForContentType(contentType)
            .then(function (cacheData) {
                if (cacheData[hash]) {
                    return self._isHashExpired(contentType, hash, dataQuery.maxAge)
                        .then(function (isExpired) {
                            if (isExpired && !dataQuery.forceCache) {
                                return self._purgeForHash(contentType, hash)
                                    .then(function () {
                                        return self._cacheQuery(dataQuery, hash, data);
                                    });
                            } else {
                                //If cache is used, change 'me' to the ID of the logged in user (only for currentUser() requests).
                                if (dataQuery.operation === DataQueryOperation.ReadById && dataQuery.additionalOptions.id === 'me') {
                                    dataQuery.additionalOptions.id = self._everlive.setup.principalId;
                                }

                                return self._everlive.offlineStorage.processQuery(dataQuery);
                            }
                        });
                } else {
                    return self._cacheQuery(dataQuery, hash, data);
                }
            });
    }

    _addObjectToCache(obj, contentType) {
        var itemHash = obj.Id;
        return this._cacheResultFromDataQuery(contentType, itemHash);
    }

    _cacheQuery(dataQuery, hash, data) {
        const self = this;
        const contentType = dataQuery.collectionName;

        const promise = new Promise(function (resolve, reject) {
            let result;
            return RequestService.handleRequestProcessing(dataQuery, data)
                .then(function (response: any) {
                    result = response.result || response;
                    return self._getCacheData();
                }).then(function success() {
                    let cacheForItems = [];
                    let resultToCache = result.Result || result;
                    if (dataQuery.operation !== DataQueryOperation.Count) {
                        if (Array.isArray(resultToCache)) {
                            _.each(resultToCache, function (singleResult) {
                                var cacheItemPromise = self._addObjectToCache(singleResult, contentType);
                                cacheForItems.push(cacheItemPromise);
                            });
                        } else if (_.isObject(resultToCache)) {
                            var cacheItemPromise = self._addObjectToCache(resultToCache, contentType);
                            cacheForItems.push(cacheItemPromise);
                        }
                    }

                    return Promise.all(cacheForItems);
                }).then(function success() {
                    if (dataQuery.operation !== DataQueryOperation.Count) {
                        return self._cacheResultFromDataQuery(contentType, hash);
                    }
                }).then(function success() {
                    resolve(result);
                }).catch(function (err) {
                    reject(err);
                });
        });

        return promise;
    }

    _cacheResultFromDataQuery(contentType, hash) {
        var cacheData = {};
        cacheData[hash] = {
            cachedAt: Date.now()
        };

        return this._persistCacheData(contentType, cacheData);
    }

    _getExpirationForHash(contentType, hash) {
        return this._getCacheDataForContentType(contentType)
            .then(function (cacheData) {
                return cacheData[hash].cachedAt;
            });
    }

    _isHashExpired(contentType, hash, maxAge) {
        var self = this;

        return this._getExpirationForHash(contentType, hash)
            .then(function (cachedAt) {
                var maxAgeForContentType = self.typeSettings && self.typeSettings[contentType] ?
                self.typeSettings[contentType].maxAge * 60 * 1000 : null;

                var cacheAge;
                if (maxAge || maxAge === 0) {
                    cacheAge = maxAge;
                } else if (maxAgeForContentType || maxAgeForContentType === 0) {
                    cacheAge = maxAgeForContentType;
                } else {
                    cacheAge = self.maxAgeInMs;
                }
                return (cachedAt + cacheAge) < Date.now();
            });
    }

    _purgeForHash(contentType, hash) {
        var cacheData = {};
        cacheData[hash] = null;

        return this._persistCacheData(contentType, cacheData);
    }

    _getHashForQuery(dataQuery) {
        if (dataQuery.operation === DataQueryOperation.ReadById) {
            return dataQuery.additionalOptions.id;
        }

        var queryParams = dataQuery.getQueryParameters();
        return this._hash(queryParams);
    }

    /**
     * Clears the cached data for a specified content type.
     * @method clear
     * @name clear
     * @param {string} contentType The content type to clear.
     * @memberOf CacheModule.prototype
     * @returns {Promise}
     */
    /**
     * Clears the cached data for a specified content type.
     * @method clear
     * @name clear
     * @param {string} contentType The content type to clear.
     * @memberOf CacheModule.prototype
     * @param {function} [success] A success callback.
     * @param {function} [error] An error callback.
     */
    clear(contentType: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        var self = this;

        return Utils.buildPromise(function (success, error) {
            if (!self.options.enabled) {
                const errorMessage = EverliveErrorHelper.buildCacheDisabledErrorMessage('clear');
                return error(new EverliveError({message: errorMessage, code: EverliveErrors.cacheDisabled.code}));
            }

            return self.persister.purge(contentType, function () {
                if (self.cacheData && self.cacheData[contentType]) {
                    delete self.cacheData[contentType];
                }

                if (self._everlive.offlineStorage.options.enabled) {
                    success();
                } else {
                    self._everlive.offlineStorage.queryProcessor.persister.purge(contentType, success, error);
                }
            }, error);
        }, success, error);
    }

    /**
     * Clears all data from the cache.
     * @method clearAll
     * @name clearAll
     * @memberOf CacheModule.prototype
     * @returns {Promise}
     */
    /**
     * Clears all data from the cache.
     * @method clearAll
     * @name clearAll
     * @memberOf CacheModule.prototype
     * @param {function} [success] A success callback.
     * @param {function} [error] An error callback.
     */
    clearAll(success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        var self = this;
        self.cacheData = null;

        return Utils.buildPromise(function (success, error) {
            if (self.options.enabled === false) {
                const errorMessage = EverliveErrorHelper.buildCacheDisabledErrorMessage('clearAll');
                return error(new EverliveError({message: errorMessage, code: EverliveErrors.cacheDisabled.code}));
            }

            return self.persister.purgeAll(function () {
                if (self._everlive.offlineStorage.options.enabled) {
                    success();
                } else {
                    self._everlive.offlineStorage.queryProcessor.persister.purgeAll(success, error);
                }
            }, error)
        }, success, error);
    }
}