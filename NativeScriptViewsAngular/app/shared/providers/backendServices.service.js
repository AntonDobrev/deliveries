"use strict";
var core_1 = require('@angular/core');
var everlive_sdk_1 = require('everlive-sdk');
var shared_1 = require('../../shared');
var backendServicesService = (function () {
    function backendServicesService() {
        this._options = {
            appId: shared_1.constants.appId,
            scheme: shared_1.constants.httpScheme,
            offline: {
                storage: {
                    provider: everlive_sdk_1.default.Constants.StorageProvider.SQLite,
                    storagePath: shared_1.constants.deliveriesStoragePathName
                },
                typeSettings: shared_1.constants.deliveriesMappingScheme
            }
        };
        this._everlive = new everlive_sdk_1.default(this._options);
        this._everliveQuery = new everlive_sdk_1.default.Query();
    }
    Object.defineProperty(backendServicesService.prototype, "instance", {
        get: function () {
            return this._everlive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(backendServicesService.prototype, "query", {
        get: function () {
            return this._everliveQuery;
        },
        enumerable: true,
        configurable: true
    });
    backendServicesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], backendServicesService);
    return backendServicesService;
}());
exports.backendServicesService = backendServicesService;
// START_CUSTOM_CODE_backendServices
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_backendServices 
//# sourceMappingURL=backendServices.service.js.map