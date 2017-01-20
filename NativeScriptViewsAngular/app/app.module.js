"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var router_1 = require("nativescript-angular/router");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
var homeView_module_1 = require("./modules/homeView/homeView.module");
var connectivity = require("connectivity");
var Dialogs = require("ui/dialogs");
var shared = require("./shared/providers");
var AppModule = (function () {
    function AppModule(_provider) {
        this._provider = _provider;
        this.addConectivityListeners();
        this.addSyncEventListeners();
    }
    AppModule.prototype.addSyncEventListeners = function () {
        this._provider.instance.on('syncStart', function () {
            //	Dialogs.alert("Sync started");
        });
        this._provider.instance.on('syncEnd', function (syncInfo) {
            Dialogs.alert("Sync ended" + JSON.stringify(syncInfo));
        });
    };
    AppModule.prototype.addConectivityListeners = function () {
        var _this = this;
        connectivity.startMonitoring(function (newConnectionType) {
            switch (newConnectionType) {
                case connectivity.connectionType.none:
                    _this.connectionType = "None"; //0
                    _this._provider.instance.offline();
                    //	Dialogs.alert("Connection changed to " + this.connectionType);
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
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_1.NativeScriptModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routes_1.appRoutes),
                homeView_module_1.HomeViewModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [shared.backendServicesService])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map