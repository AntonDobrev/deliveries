"use strict";
var core_1 = require('@angular/core');
var everlive_sdk_1 = require('everlive-sdk');
var backendServicesService = (function () {
    function backendServicesService() {
        this._options = {
            appId: 'y1awicxxgmw0vtrc',
            scheme: 'https',
            offline: {
                storage: {
                    provider: everlive_sdk_1.default.Constants.StorageProvider.SQLite,
                    storagePath: 'deliveries'
                },
                typeSettings: {
                    'DeliveryOrder': {
                        'Scheme': [
                            {
                                'Name': 'Status',
                                'Type': 'INT'
                            },
                            {
                                'Name': 'Comments',
                                'Type': 'TEXT'
                            },
                            {
                                'Name': 'DeliveryItem',
                                'Type': 'TEXT'
                            },
                            {
                                'Name': 'DeliveryItemType',
                                'Type': 'TEXT'
                            },
                            {
                                'Name': 'DeliveryName',
                                'Type': 'TEXT'
                            },
                            {
                                'Name': 'DeliveryAddressCity',
                                'Type': 'TEXT'
                            },
                            {
                                'Name': 'DeliveryAddressLine1',
                                'Type': 'TEXT'
                            },
                            {
                                'Name': 'DeliveryAddressPostcode',
                                'Type': 'TEXT'
                            },
                            {
                                'Name': 'DeliveryAddressLine2',
                                'Type': 'TEXT'
                            }
                        ]
                    }
                }
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