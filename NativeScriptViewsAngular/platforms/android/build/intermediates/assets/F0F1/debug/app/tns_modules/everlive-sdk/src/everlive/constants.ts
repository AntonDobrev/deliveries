import { Constants as CommonConstants, DataQueryOperation } from '../common/Constants';

export { DataQueryOperation }

/**
 * Constants used by the SDK* @typedef {Object} Everlive.Constants
 */
export class Constants extends CommonConstants {
    static idField = 'Id';
    static guidEmpty = '00000000-0000-0000-0000-000000000000';
    static cloudFuncsEndpoint = 'Functions';
    static sqlProceduresEndpoint = 'Invoke/SqlProcedures';
    static everliveUrl = '//api.everlive.com/v1/';

    static DataQueryOperation = DataQueryOperation;

    /**
     * A class used to represent the conflict resolution strategies.
     * @property {string} ClientWins
     * @property {string} ServerWins
     * @property {string} Custom
     * @typedef {string} Everlive.Constants.ConflictResolutionStrategy
     */
    static ConflictResolutionStrategy = {
        ClientWins: 'clientWins',
        ServerWins: 'serverWins',
        Custom: 'custom'
    };

    static ConflictResolution = {
        KeepServer: 'keepServer',
        KeepClient: 'keepClient',
        Custom: 'custom',
        Skip: 'skip'
    };
    /**
     * A class used to represent the available storage providers.
     * @property {string} LocalStorage
     * @property {string} FileSystem
     * @property {string} Custom
     * @typedef {string} Everlive.Constants.StorageProvider
     */
    static StorageProvider = {
        LocalStorage: 'localStorage',
        FileSystem: 'fileSystem',
        SQLite: 'sqlite',
        Custom: 'custom'
    };

    static DefaultStoragePath = 'el_store';

    // the default location for storing files offline
    static DefaultFilesStoragePath = 'el_file_store';

    // the default location for storing offline to online location map
    static DefaultFilesMetadataPath = 'el_file_mapping';

    static EncryptionProvider = {
        Default: 'default',
        Custom: 'custom'
    };

    // The headers used by the Everlive services
    static Headers = {
        ContentType: 'content-type',

        filter: 'x-everlive-filter',
        select: 'x-everlive-fields',
        sort: 'x-everlive-sort',
        skip: 'x-everlive-skip',
        take: 'x-everlive-take',
        expand: 'x-everlive-expand',
        singleField: 'x-everlive-single-field',
        includeCount: 'x-everlive-include-count',
        powerFields: 'x-everlive-power-fields',
        debug: 'x-everlive-debug',
        overrideSystemFields: 'x-everlive-override-system-fields',
        sdk: 'x-everlive-sdk',
        sync: 'x-everlive-sync',
        aggregate: 'x-everlive-aggregate',
        customParameters: 'x-everlive-custom-parameters'
    };
    //Constants for different platforms in Everlive
    static Platform = {
        WindowsPhone: 1,
        Windows: 2,
        Android: 3,
        iOS: 4,
        OSX: 5,
        Blackberry: 6,
        Nokia: 7,
        Unknown: 100
    };
    static OperatorType = {
        query: 1,

        where: 100,
        filter: 101,

        and: 110,
        or: 111,
        not: 112,

        equal: 120,
        not_equal: 121,
        lt: 122,
        lte: 123,
        gt: 124,
        gte: 125,
        isin: 126,
        notin: 127,
        all: 128,
        size: 129,
        regex: 130,
        contains: 131,
        startsWith: 132,
        endsWith: 133,

        nearShpere: 140,
        withinBox: 141,
        withinPolygon: 142,
        withinShpere: 143,

        select: 200,
        exclude: 201,

        order: 300,
        order_desc: 301,

        skip: 400,
        take: 401,
        expand: 402
    };

    /**
     * A class used to represent the current authentication status of the {{site.TelerikBackendServices}} JavaScript SDK instance.
     * @property {string} unauthenticated Indicates that no user is authenticated.
     * @property {string} masterKey Indicates that a master key authentication is used.
     * @property {string} invalidAuthentication Indicates an authentication has been attempted, but it was invalid.
     * @property {string} authenticated Indicates that a user is authenticated.
     * @property {string} authenticating Indicates that a user is currently authenticating. Some requests might be pending and waiting for the user to authenticate.
     * @property {string} expiredAuthentication Indicates that a user's authentication has expired and that the user must log back in.
     * @typedef {string} Everlive.AuthStatus
     */
    static AuthStatus = {
        unauthenticated: 'unauthenticated',
        masterKey: 'masterKey',
        invalidAuthentication: 'invalidAuthentication',
        authenticated: 'authenticated',
        expiredAuthentication: 'expiredAuthentication',
        authenticating: 'authenticating'
    };
    static offlineItemStates = {
        created: 'create',
        modified: 'update',
        deleted: 'delete'
    };

    /**
     * HTTP Methods
     * @typedef {string} constants.HttpMethod
     * @property {string} GET
     * @property {string} POST
     * @property {string} PUT
     * @property {string} DELETE
     */
    static HttpMethod = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    };
    static maxDistanceConsts = {
        radians: '$maxDistance',
        km: '$maxDistanceInKilometers',
        miles: '$maxDistanceInMiles'
    };
    static radiusConsts = {
        radians: 'radius',
        km: 'radiusInKilometers',
        miles: 'radiusInMiles'
    };

    // using an invalid field name in the context of Everlive
    // to ensure no naming collisions can occur
    static offlineItemsStateMarker = '__everlive_offline_state';

    static SyncErrors = {
        generalError: 'generalError',
        itemSyncError: 'itemSyncError'
    };

    static syncBatchSize = 10;

    static AuthStoreKey = '__everlive_auth_key';
    static CachingStoreKey = '__everlive_cache';

    // the minimum interval between sync requests
    static defaultSyncInterval = 1000 * 60 * 10; // 10 minutes
    static fileUploadKey = 'fileUpload';
    static fileUploadDelimiter = '_';

    static FilesTypeNameLegacy = 'system.files';
    static FilesTypeName = 'Files';
    static MaxConcurrentDownloadTasks = 3;
    static DefaultFilesystemStorageQuota = 10485760;

    static Events = {
        SyncStart: 'syncStart',
        SyncEnd: 'syncEnd',
        Processed: 'processed',
        ItemProcessed: 'itemProcessed',
        BeforeExecute: 'beforeExecute'
    };

    static Aggregation = {
        MaxDocumentsCount: 100000
    };

    static Push = {
        NotificationsType: 'Push/Notifications',
        DevicesType: 'Push/Devices'
    };

    static EncodableHeaders = [
        Constants.Headers.filter,
        Constants.Headers.expand,
        Constants.Headers.powerFields,
        Constants.Headers.customParameters
    ];

    static SqliteTypes = {
        Text: 'TEXT',
        Number: 'INT',
        Float: 'FLOAT'
    };

    static SqliteUnsupportedTypes = {
        ARRAY: 'ARRAY',
        OBJECT: 'OBJECT',
        DATE: 'DATE',
        BOOLEAN: 'BOOLEAN',
        NULL: 'NULL'
    }
}
