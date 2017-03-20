import * as _ from 'underscore';

import {Constants} from '../constants';
import {getPersister} from './offlinePersisters';
import {OfflineStorageModule} from './OfflineStorageModule';
import {EverliveError} from '../EverliveError';
import {isNativeScript} from '../../common/platform';
import {CryptographicProvider} from '../encryption/CryptographicProvider';
import { Everlive } from '../Everlive';

const defaultOfflineStorageOptions = {
    autoSync: true,
    enabled: true,
    conflicts: {
        strategy: Constants.ConflictResolutionStrategy.ClientWins,
        implementation: null
    },
    offline: false,
    storage: {
        name: '',
        provider: isNativeScript ? Constants.StorageProvider.FileSystem : Constants.StorageProvider.LocalStorage,
        implementation: null,
        storagePath: Constants.DefaultStoragePath,
        requestedQuota: Constants.DefaultFilesystemStorageQuota
    },
    typeSettings: {},
    encryption: {
        provider: Constants.EncryptionProvider.Default,
        implementation: null,
        key: ''
    },
    files: {
        storagePath: Constants.DefaultFilesStoragePath,
        metaPath: Constants.DefaultFilesMetadataPath,
        maxConcurrentDownloads: Constants.MaxConcurrentDownloadTasks
    }
};

var conflictResolutionStrategies = {};

conflictResolutionStrategies[Constants.ConflictResolutionStrategy.ClientWins] = function (collection, local, server) {
    return new Promise(function (resolve) {
        resolve(local);
    });
};

conflictResolutionStrategies[Constants.ConflictResolutionStrategy.ServerWins] = function (collection, local, server) {
    return new Promise(function (resolve) {
        resolve(server);
    });
};

var initStoragePersister = function initStoragePersister(options, sdk: Everlive) {
    var storageKey = options.storage.name || 'everliveOfflineStorage_' + sdk.setup.appId;
    var persister = getPersister(storageKey, options);
    options.storage.implementation = persister;
    return persister;
};

var initEncryptionProvider = function initEncryptionProvider(options, sdk: Everlive) {
    var encryptor;
    var encryptionProvider = options.encryption.provider;
    var encryptionImplementation = options.encryption.implementation;
    if (_.isObject(encryptionImplementation) && encryptionProvider === Constants.EncryptionProvider.Custom) {
        encryptor = encryptionImplementation;
    } else {
        switch (encryptionProvider) {
            case Constants.EncryptionProvider.Default:
                encryptor = new CryptographicProvider(options);
                break;
            case Constants.EncryptionProvider.Custom:
                throw new EverliveError({message: 'Custom encryption provider requires an implementation object'});
            default:
                throw new EverliveError({message: 'Unsupported encryption provider ' + encryptionProvider});
        }
    }

    options.encryption.implementation = encryptor;
    return encryptor;
};

function buildOfflineStorageOptions(sdkOptions) {
    var storageOptions = sdkOptions.offline || sdkOptions.offlineStorage;
    var options;
    if (storageOptions === true) { // explicit check for shorthand initialization
        options = _.defaults({}, defaultOfflineStorageOptions);
    } else if (_.isObject(storageOptions)) {
        options = _.defaults(storageOptions, defaultOfflineStorageOptions);
        options.storage = _.defaults(storageOptions.storage, defaultOfflineStorageOptions.storage);
        options.encryption = _.defaults(storageOptions.encryption, defaultOfflineStorageOptions.encryption);
        options.conflicts = _.defaults(storageOptions.conflicts, defaultOfflineStorageOptions.conflicts);
        options.files = _.defaults(storageOptions.files, defaultOfflineStorageOptions.files);
    } else {
        options = _.defaults({}, defaultOfflineStorageOptions);
        options.enabled = false;
        if (!storageOptions) {
            sdkOptions.offlineStorage = options;
        }
    }

    options.appId = sdkOptions.appId;
    options.cacheEnabled = sdkOptions.caching && sdkOptions.caching.enabled;
    return options;
}

var buildOfflineStorageModule = function buildOfflineStorageModule(sdkOptions, sdk: Everlive) {
    var options = buildOfflineStorageOptions(sdkOptions);
    var persister = initStoragePersister(options, sdk);
    var encryptionProvider = initEncryptionProvider(options, sdk);

    return new OfflineStorageModule(sdk, options, persister, encryptionProvider);
};

var initOfflineStorage = function (options, sdk: Everlive) {
    sdk.offlineStorage = buildOfflineStorageModule(options, sdk);
};

export {
    initOfflineStorage,
    buildOfflineStorageOptions
}