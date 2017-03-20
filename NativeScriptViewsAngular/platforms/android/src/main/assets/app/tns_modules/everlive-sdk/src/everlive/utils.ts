declare const window: any, encodeURIComponent: any;

import * as _ from 'underscore';
import * as path from 'path';

import * as platform from '../common/platform';
import { Constants as constants } from './constants';
import { Utils as CommonUtils } from '../common/utils';

const unsupportedDbOperators = [
    '$geoWithin',
    '$geoIntersects',
    '$near',
    '$within',
    '$nearSphere'
];

export class DeviceRegistrationResult {
    constructor(public token: string) {}
}

export class Utils extends CommonUtils {
    static normalizeKeys(obj: any) { //brings down all keys to the same level (lowerCase)
        var normalizedKeys: any = {};

        _.each(obj, function (val, key: string) {
            var lowerKey = key.toLowerCase();

            if (!normalizedKeys.hasOwnProperty(lowerKey)) {
                normalizedKeys[lowerKey] = val;
            }
        });

        return normalizedKeys;
    }

    static buildAuthHeader(setup, options?): {authorization: string} {
        var authHeaderValue = null;
        if (options && options.authHeaders === false) {
            return authHeaderValue;
        }
        if (setup.token) {
            authHeaderValue = (setup.tokenType || 'bearer') + ' ' + setup.token;
        }
        else if (setup.masterKey) {
            authHeaderValue = 'masterkey ' + setup.masterKey;
        }
        if (authHeaderValue) {
            return {authorization: authHeaderValue};
        } else {
            return null;
        }
    }

    static buildUrl(setup): string {
        var url = '';
        if (typeof setup.scheme === 'string') {
            url += setup.scheme + ':';
        }
        url += setup.url;
        if (setup.appId) {
            url += setup.appId + '/';
        }
        return url;
    }

    static getDbOperators(expression, shallow?: boolean) {
        var dbOperators = [];

        if (typeof expression === 'string' || typeof expression === 'number') {
            return dbOperators;
        }

        var modifierKeys = Object.keys(expression || {});
        _.each(modifierKeys, function (key) {
            if (key.indexOf('$') === 0) {
                dbOperators.push(key);
            } else if (typeof expression[key] === 'object' && !shallow) {
                dbOperators = dbOperators.concat(Utils.getDbOperators(expression[key]));
            }
        });

        return dbOperators;
    };

    static disableRequestCache(url?, method?) {
        if (method === 'GET') {
            var timestamp = (new Date()).getTime();
            var separator = url.indexOf('?') > -1 ? '&' : '?';
            url += separator + '_el=' + timestamp;
        }

        return url;
    }

    static getUnsupportedOperators(filter) {
        var dbOperators = Utils.getDbOperators(filter);
        return _.intersection(dbOperators, unsupportedDbOperators);
    }

    static isQuerySupportedOffline(query) {
        var queryParams = query.getQueryParameters();
        var hasExpandExpression = !(<any>_).isEmptyObject(queryParams.expand);
        var unsupportedOperators = Utils.getUnsupportedOperators(queryParams.filter);
        var hasUnsupportedOperators = unsupportedOperators.length !== 0;
        var isUnsupportedInOffline = hasExpandExpression || hasUnsupportedOperators;
        return !isUnsupportedInOffline;
    }

    // http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript/16245768#16245768
    static b64toBlob(b64Data, contentType = '', sliceSize = 512) {
        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    // http://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
    static arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }

    static transformPlatformPath(platformPath) {
        if (!platformPath) {
            return '';
        }

        if (platform.isWindowsPhone) {
            if (platformPath.charAt(0) === '/' && platformPath.charAt(1) !== '/') {
                platformPath = '/' + platformPath;
            }
        } else { //TODO: probably desktop too
            if (platformPath.indexOf('file:/') !== -1 && platformPath.indexOf('file:///') === -1) {
                platformPath = platformPath.replace('file:/', 'file:///');
            }
        }

        return platformPath;
    }

    static _stringCompare(string, check) {
        return string.toLowerCase() === check;
    }

    static startsWith(str, word){
        return str.lastIndexOf(word, 0) === 0;
    }

    static endsWith(str, word){
        return str.indexOf(word, str.length - word.length) !== -1;
    }

    static isContentType = {
        files: function (collectionName) {
            return Utils._stringCompare(collectionName, 'files');
        },
        users: function (collectionName) {
            return Utils._stringCompare(collectionName, 'users');
        },
        pushNotifications: function (collectionName) {
            return Utils._stringCompare(collectionName, constants.Push.NotificationsType.toLowerCase());
        },
        pushDevices: function (collectionName) {
            return Utils._stringCompare(collectionName, constants.Push.DevicesType.toLowerCase());
        }
    };

    static isElement = {
        _isElement: function (el, check) {
            var tag = el;

            if (typeof tag !== 'string') {
                if (el instanceof HTMLElement) {
                    tag = el.tagName;
                }
            }

            return Utils._stringCompare(tag, check);
        },
        image: function (el) {
            return Utils.isElement._isElement(el, 'img');
        },
        anchor: function (el) {
            return Utils.isElement._isElement(el, 'a');
        }
    };

    static joinPath(...args: string[]) {
        var paths = [].slice.apply(args).map(function (arg) {
            return arg || '';
        });

        var joinedPath = path.join.apply(path, paths);
        return Utils.transformPlatformPath(joinedPath);
    }

    static getId(obj) {
        return obj.Id || obj._id || obj.id;
    }

    static _inAppBuilderSimulator() {
        return typeof window !== 'undefined' && window.navigator && window.navigator.simulator;
    }

    static isValidId(input) {
        var isValidString = typeof input === 'string' && input !== '';
        var isValidNumber = typeof input === 'number' && !_.isNaN(input);

        return isValidString || isValidNumber;
    }

    static modelHasValidId(model) {
        var idToValidate = (typeof model === 'object' && model !== null) ? model.Id : model;
        return Utils.isValidId(idToValidate);
    }

    static callbackAndPromiseErrorResponse(err, errorHandler): Promise<any> {
        errorHandler = errorHandler || _.noop;
        errorHandler(err);
        return Utils.rejectedPromise(err);
    }

    static toQueryString(obj: any) {
        var queryString = '',
            encode = encodeURIComponent,
            append = function (k, v) {
                queryString += encode(k) + '=' + encode(v) + '&'
            };

        if (_.isArray(obj)) {
            for (var i = 0; obj && i < obj.length; i++) {
                append((<any>obj[i]).name, (<any>obj[i]).value);
            }
        } else {
            for (var propName in obj) {
                if (!obj.hasOwnProperty(propName)) {
                    continue;
                }

                var value = obj[propName];

                if (_.isArray(value)) {
                    for (i = 0; i < value.length; i++) {
                        append(propName, value[i]);
                    }
                } else {
                    append(propName, obj[propName]);
                }
            }
        }

        // spaces should be + according to spec
        return queryString.replace(/&$/, '').replace(/%20/g, '+');
    }

    static lazyRequire(_dynamic_module_, exportName) {
        exportName = exportName || _dynamic_module_;
        var obj = {};

        Object.defineProperty(obj, exportName, {
            get: function () {
                return require(_dynamic_module_);
            }
        });

        return obj;
    }

    static promiseHash(obj: any): Promise<any> {
        return Utils._mapPromises(obj, true).then((res) => {
            let resultObj: any = {};

            _.each<any>(res, (settlement, key) => {
                if (settlement.state === 'fulfilled') {
                    resultObj[key] = settlement.value;
                }
            });

            return Promise.resolve(resultObj);
        }, err => Promise.reject(err));
    }

    static promiseHashSettled(obj: any): Promise<any> {
        return Utils._mapPromises(obj);
    }

    static promisesAllSettled(promises: Promise<any>[]): Promise<any> {
        return Utils._mapPromises(promises);
    }

    private static _mapPromises(promises: Promise<any>[]|Object, stopOnError = false): Promise<any> {
        let promiseCount = _.size(promises);
        let resultObj: any = Array.isArray(promises) ? [] : {};

        if (promiseCount === 0) {
            return Promise.resolve(resultObj);
        }

        return new Promise<any>((resolve, reject) => {
            let aborted = false;
            let settledCount = 0;

            let storeResponse = (response: any, key: string|number, isError = false) => {
                if (aborted) return;
                let settlement: PromiseSettlement;

                if (isError) {
                    settlement = { state: 'rejected', reason: response };
                } else {
                    settlement = { state: 'fulfilled', value: response };
                }

                resultObj[key] = settlement;
                settledCount++;

                if (settledCount === promiseCount) {
                    resolve(resultObj);
                }
            };

            _.each<any>(promises, (promise: Promise<any>, key: string|number) => {
                promise.then((res) => {
                    storeResponse(res, key);
                    return Promise.resolve(res);
                }, (err) => {
                    if (stopOnError) {
                        reject(err);
                        aborted = true;
                    }

                    storeResponse(err, key, true);
                    return Promise.reject(err);
                });
            });
        });
    }

    static isOfflineStorageEnabled(setup: any) { //TODO: setup
        const offlineStorageOptions = setup.offlineStorage || setup.offline;
        return offlineStorageOptions && offlineStorageOptions.enabled !== false;
    }

    static existsAndIsNotEmpty(obj: string|Array<any>|Object) {
        return (!!obj) && (_.size(obj) > 0);
    }
}

export type PromiseSettlementState = 'fulfilled' | 'rejected';

export type PromiseSettlement =
    { state: PromiseSettlementState; value: any; }
    | { state: PromiseSettlementState; reason: any; };
