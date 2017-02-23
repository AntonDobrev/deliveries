"use strict";
var core_1 = require("@angular/core");
var everlive_sdk_1 = require("everlive-sdk");
var shared_1 = require("../../shared");
var backendServicesService = (function () {
    function backendServicesService() {
        this._options = {
            appId: shared_1.constants.appId,
            scheme: shared_1.constants.httpScheme,
            offline: {
                syncUnmodified: shared_1.constants.shouldSyncItemsFromServer,
                conflicts: {
                    strategy: everlive_sdk_1.default.Constants.ConflictResolutionStrategy.ClientWins
                },
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
    return backendServicesService;
}());
backendServicesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], backendServicesService);
exports.backendServicesService = backendServicesService;
// START_CUSTOM_CODE_backendServices
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_backendServices 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZFNlcnZpY2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWNrZW5kU2VydmljZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLDZDQUFvQztBQUNwQyx1Q0FBeUM7QUFJekMsSUFBYSxzQkFBc0I7SUFLbEM7UUFDQyxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2YsS0FBSyxFQUFFLGtCQUFTLENBQUMsS0FBSztZQUN0QixNQUFNLEVBQUUsa0JBQVMsQ0FBQyxVQUFVO1lBQzVCLE9BQU8sRUFBRTtnQkFDUixjQUFjLEVBQUUsa0JBQVMsQ0FBQyx5QkFBeUI7Z0JBQ25ELFNBQVMsRUFBRTtvQkFDVixRQUFRLEVBQUUsc0JBQVEsQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsVUFBVTtpQkFDbEU7Z0JBQ0QsT0FBTyxFQUFFO29CQUNSLFFBQVEsRUFBRSxzQkFBUSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTTtvQkFDbkQsV0FBVyxFQUFFLGtCQUFTLENBQUMseUJBQXlCO2lCQUNoRDtnQkFDRCxZQUFZLEVBQUUsa0JBQVMsQ0FBQyx1QkFBdUI7YUFDL0M7U0FDRCxDQUFBO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHNCQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxzQkFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxzQkFBSSw0Q0FBUTthQUFaO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx5Q0FBSzthQUFUO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFDRiw2QkFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7QUFqQ1ksc0JBQXNCO0lBRmxDLGlCQUFVLEVBQUU7O0dBRUEsc0JBQXNCLENBaUNsQztBQWpDWSx3REFBc0I7QUFtQ25DLG9DQUFvQztBQUNwQyxtS0FBbUs7QUFFbkssa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IEV2ZXJsaXZlIGZyb20gJ2V2ZXJsaXZlLXNkayc7XG5pbXBvcnQgeyBjb25zdGFudHMgfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuXG5ASW5qZWN0YWJsZSgpXG5cbmV4cG9ydCBjbGFzcyBiYWNrZW5kU2VydmljZXNTZXJ2aWNlIHtcblx0cHJpdmF0ZSBfZXZlcmxpdmU6IEV2ZXJsaXZlO1xuXHRwcml2YXRlIF9ldmVybGl2ZVF1ZXJ5OiBhbnk7XG5cdHByaXZhdGUgX29wdGlvbnM6IHt9O1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX29wdGlvbnMgPSB7XG5cdFx0XHRhcHBJZDogY29uc3RhbnRzLmFwcElkLFxuXHRcdFx0c2NoZW1lOiBjb25zdGFudHMuaHR0cFNjaGVtZSxcblx0XHRcdG9mZmxpbmU6IHtcblx0XHRcdFx0c3luY1VubW9kaWZpZWQ6IGNvbnN0YW50cy5zaG91bGRTeW5jSXRlbXNGcm9tU2VydmVyLFxuXHRcdFx0XHRjb25mbGljdHM6IHtcblx0XHRcdFx0XHRzdHJhdGVneTogRXZlcmxpdmUuQ29uc3RhbnRzLkNvbmZsaWN0UmVzb2x1dGlvblN0cmF0ZWd5LkNsaWVudFdpbnNcblx0XHRcdFx0fSxcblx0XHRcdFx0c3RvcmFnZToge1xuXHRcdFx0XHRcdHByb3ZpZGVyOiBFdmVybGl2ZS5Db25zdGFudHMuU3RvcmFnZVByb3ZpZGVyLlNRTGl0ZSxcblx0XHRcdFx0XHRzdG9yYWdlUGF0aDogY29uc3RhbnRzLmRlbGl2ZXJpZXNTdG9yYWdlUGF0aE5hbWVcblx0XHRcdFx0fSxcblx0XHRcdFx0dHlwZVNldHRpbmdzOiBjb25zdGFudHMuZGVsaXZlcmllc01hcHBpbmdTY2hlbWVcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9ldmVybGl2ZSA9IG5ldyBFdmVybGl2ZSh0aGlzLl9vcHRpb25zKTtcblx0XHR0aGlzLl9ldmVybGl2ZVF1ZXJ5ID0gbmV3IEV2ZXJsaXZlLlF1ZXJ5KCk7XG5cdH1cblxuXHRnZXQgaW5zdGFuY2UoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2V2ZXJsaXZlO1xuXHR9XG5cblx0Z2V0IHF1ZXJ5KCkge1xuXHRcdHJldHVybiB0aGlzLl9ldmVybGl2ZVF1ZXJ5O1xuXHR9XG59XG5cbi8vIFNUQVJUX0NVU1RPTV9DT0RFX2JhY2tlbmRTZXJ2aWNlc1xuLy8gQWRkIGN1c3RvbSBjb2RlIGhlcmUuIEZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGN1c3RvbSBjb2RlLCBzZWUgaHR0cDovL2RvY3MudGVsZXJpay5jb20vcGxhdGZvcm0vc2NyZWVuYnVpbGRlci90cm91Ymxlc2hvb3RpbmcvaG93LXRvLWtlZXAtY3VzdG9tLWNvZGUtY2hhbmdlc1xuXG4vLyBFTkRfQ1VTVE9NX0NPREVfYmFja2VuZFNlcnZpY2VzIl19