"use strict";
var core_1 = require("@angular/core");
// import { backendServicesService } from "./shared";
var services_1 = require('./shared/services');
var connectivity = require("connectivity");
var Dialogs = require("ui/dialogs");
var shared = require("./shared/providers");
var AppComponent = (function () {
    function AppComponent(_deliveriesService, _provider) {
        this._deliveriesService = _deliveriesService;
        this._provider = _provider;
        this.connectionType = "Connection Status";
        this._deliveries = _deliveriesService;
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("onInit");
        this.addConectivityListeners();
        this.addSyncEventListeners();
        this._deliveries.getItemsCount().then(function (itemsCount) {
            console.log("OK items count");
        }, this.onCountError);
    };
    ;
    AppComponent.prototype.addSyncEventListeners = function () {
        this._provider.instance.on('syncStart', function () {
            //	Dialogs.alert("Sync started");
        });
        this._provider.instance.on('syncEnd', function (syncInfo) {
            Dialogs.alert("Sync ended" + JSON.stringify(syncInfo));
        });
    };
    AppComponent.prototype.addConectivityListeners = function () {
        var _this = this;
        connectivity.startMonitoring(function (newConnectionType) {
            switch (newConnectionType) {
                case connectivity.connectionType.none:
                    _this.connectionType = "None"; //0
                    _this._provider.instance.offline();
                    Dialogs.alert("Connection changed to " + _this.connectionType);
                    break;
                case connectivity.connectionType.wifi:
                    _this.connectionType = "Wi-Fi"; // 1
                    _this._provider.instance.online();
                    _this._provider.instance.sync();
                    break;
                case connectivity.connectionType.mobile:
                    _this.connectionType = "Mobile";
                    _this._provider.instance.online();
                    _this._provider.instance.sync();
                    break;
                default:
                    break;
            }
        });
    };
    ;
    AppComponent.prototype.onCountError = function (err) {
        console.log("Cannot retrieve items count");
        // TODO - init logic here
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-main",
            templateUrl: "app.component.html",
            providers: [services_1.DeliveriesService]
        }), 
        __metadata('design:paramtypes', [services_1.DeliveriesService, shared.backendServicesService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map