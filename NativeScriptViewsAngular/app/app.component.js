"use strict";
var core_1 = require("@angular/core");
var services_1 = require('./shared/services');
var connectivity = require("connectivity");
var shared = require("./shared/providers");
var AppComponent = (function () {
    function AppComponent(_deliveriesService, _provider, zone) {
        this._deliveriesService = _deliveriesService;
        this._provider = _provider;
        this.zone = zone;
        this.connectionType = "Connection Status";
        this.synchronizationStatus = "Synchronization Status";
        this.synchronizationCompleted = false;
        this._deliveries = _deliveriesService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.addConectivityListeners();
        this.addSyncEventListeners();
    };
    ;
    AppComponent.prototype.addSyncEventListeners = function () {
        var self = this;
        this._provider.instance.on('syncStart', function (syncStartInfo) {
            self.synchronizationStatus = "Synchronization started successfully";
            if (syncStartInfo.canceled) {
                self.synchronizationStatus = "Synchronization canceled by user";
            }
        });
        this._provider.instance.on('syncEnd', function (syncEndInfo) {
            console.log("Sync completed." + "Synced to server: " + syncEndInfo.syncedToServer);
            self.zone.run(function () {
                self.synchronizationCompleted = true;
                self.synchronizationStatus = "Sync completed." + "Synced to server: " + syncEndInfo.syncedToServer;
            });
        });
    };
    AppComponent.prototype.addConectivityListeners = function () {
        var _this = this;
        connectivity.startMonitoring(function (newConnectionType) {
            _this.zone.run(function () {
                switch (newConnectionType) {
                    case connectivity.connectionType.none:
                        _this.connectionType = "None"; //0
                        _this._provider.instance.offline();
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
        });
    };
    ;
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-main",
            templateUrl: "app.component.html",
            providers: [services_1.DeliveriesService]
        }), 
        __metadata('design:paramtypes', [services_1.DeliveriesService, shared.backendServicesService, core_1.NgZone])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map