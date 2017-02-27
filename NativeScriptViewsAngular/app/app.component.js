"use strict";
var core_1 = require("@angular/core");
var services_1 = require("./shared/services");
var connectivity = require("connectivity");
var shared = require("./shared");
var services_2 = require("./shared/services");
var shared_1 = require("./shared");
var shared_2 = require("./modules/homeView/shared");
var onlineConnectionMessage = "Online.";
var offlineConnectionMessage = "Offline.";
var AppComponent = (function () {
    function AppComponent(_provider, zone, _notificationService, _store) {
        this._provider = _provider;
        this.zone = zone;
        this._notificationService = _notificationService;
        this._store = _store;
        this.connectionStatus = "";
        this.synchronizationStatus = "";
        this.synchronizationCompleted = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.addConectivityListeners();
        this.addSyncEventListeners();
    };
    ;
    AppComponent.prototype.addSyncEventListeners = function () {
        var self = this;
        this._provider.instance.on('syncStart', function (syncStartInfo) {
            self.zone.run(function () {
                self.synchronizationStatus = "Synchronization started.";
                if (syncStartInfo.canceled) {
                    self.synchronizationStatus = "Synchronization canceled by user";
                }
            });
        });
        this._provider.instance.on('syncEnd', function (syncEndInfo) {
            self._store.loadAll(); // TODO - use a better service for this // rebinds the UI
            self.zone.run(function () {
                self.synchronizationCompleted = true;
                self.synchronizationStatus = "Synchronization completed."; // TODO - is this needed?
                if (syncEndInfo.failedItems[shared_1.constants.deliveriesContentTypeName]) {
                    self._notificationService.error(syncEndInfo.error.message);
                }
                else if (syncEndInfo.error) {
                    self._notificationService.error(syncEndInfo.error.message);
                }
                else {
                    var synchronizationStatusMessage = "Sync completed." + "To server: " + syncEndInfo.syncedToServer + " From server: " + syncEndInfo.syncedToClient;
                    self._notificationService.success(synchronizationStatusMessage);
                }
            });
        });
    };
    AppComponent.prototype.addConectivityListeners = function () {
        var _this = this;
        connectivity.startMonitoring(function (newConnectionType) {
            _this.zone.run(function () {
                switch (newConnectionType) {
                    case connectivity.connectionType.none:
                        _this.connectionStatus = offlineConnectionMessage;
                        _this._provider.instance.offline();
                        break;
                    case connectivity.connectionType.wifi:
                    case connectivity.connectionType.mobile:
                        _this.connectionStatus = onlineConnectionMessage;
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
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "ns-main",
        templateUrl: "app.component.html",
        providers: [services_1.DeliveriesService]
    }),
    __metadata("design:paramtypes", [shared.backendServicesService, core_1.NgZone,
        services_2.NotificationService,
        shared_2.HomeViewStore])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF3RTtBQUN4RSw4Q0FBc0Q7QUFDdEQsMkNBQTZDO0FBQzdDLGlDQUFtQztBQUNuQyw4Q0FBd0Q7QUFDeEQsbUNBQXFDO0FBRXJDLG9EQUEwRDtBQUUxRCxJQUFNLHVCQUF1QixHQUFHLFNBQVMsQ0FBQztBQUMxQyxJQUFNLHdCQUF3QixHQUFHLFVBQVUsQ0FBQztBQVM1QyxJQUFhLFlBQVk7SUFNeEIsc0JBQ1MsU0FBd0MsRUFDeEMsSUFBWSxFQUNaLG9CQUF5QyxFQUN6QyxNQUFxQjtRQUhyQixjQUFTLEdBQVQsU0FBUyxDQUErQjtRQUN4QyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1oseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUN6QyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBUnZCLHFCQUFnQixHQUFXLEVBQUUsQ0FBQztRQUM5QiwwQkFBcUIsR0FBVyxFQUFFLENBQUM7UUFDbkMsNkJBQXdCLEdBQVksS0FBSyxDQUFDO0lBUWpELENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFRiw0Q0FBcUIsR0FBckI7UUFDQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLGFBQWE7WUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLDBCQUEwQixDQUFDO2dCQUN4RCxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFD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bmVudCwgT25Jbml0LCBOZ1pvbmUsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEZWxpdmVyaWVzU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzJztcbmltcG9ydCAqIGFzIGNvbm5lY3Rpdml0eSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBjb25zdGFudHMgfSBmcm9tICcuL3NoYXJlZCc7XG5cbmltcG9ydCB7IEhvbWVWaWV3U3RvcmUgfSBmcm9tIFwiLi9tb2R1bGVzL2hvbWVWaWV3L3NoYXJlZFwiO1xuXG5jb25zdCBvbmxpbmVDb25uZWN0aW9uTWVzc2FnZSA9IFwiT25saW5lLlwiO1xuY29uc3Qgb2ZmbGluZUNvbm5lY3Rpb25NZXNzYWdlID0gXCJPZmZsaW5lLlwiO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6IFwibnMtbWFpblwiLFxuXHR0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcblx0cHJvdmlkZXJzOiBbRGVsaXZlcmllc1NlcnZpY2VdXG59KVxuXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwdWJsaWMgY29ubmVjdGlvblN0YXR1czogc3RyaW5nID0gXCJcIjtcblx0cHVibGljIHN5bmNocm9uaXphdGlvblN0YXR1czogc3RyaW5nID0gXCJcIjtcblx0cHVibGljIHN5bmNocm9uaXphdGlvbkNvbXBsZXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgX3Byb3ZpZGVyOiBzaGFyZWQuYmFja2VuZFNlcnZpY2VzU2VydmljZSxcblx0XHRwcml2YXRlIHpvbmU6IE5nWm9uZSxcblx0XHRwcml2YXRlIF9ub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuXHRcdHByaXZhdGUgX3N0b3JlOiBIb21lVmlld1N0b3JlXG5cdCkge1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5hZGRDb25lY3Rpdml0eUxpc3RlbmVycygpO1xuXHRcdHRoaXMuYWRkU3luY0V2ZW50TGlzdGVuZXJzKCk7XG5cdH07XG5cblx0YWRkU3luY0V2ZW50TGlzdGVuZXJzKCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHRoaXMuX3Byb3ZpZGVyLmluc3RhbmNlLm9uKCdzeW5jU3RhcnQnLCBmdW5jdGlvbiAoc3luY1N0YXJ0SW5mbykge1xuXHRcdFx0c2VsZi56b25lLnJ1bigoKSA9PiB7XG5cdFx0XHRcdHNlbGYuc3luY2hyb25pemF0aW9uU3RhdHVzID0gXCJTeW5jaHJvbml6YXRpb24gc3RhcnRlZC5cIjtcblx0XHRcdFx0aWYgKHN5bmNTdGFydEluZm8uY2FuY2VsZWQpIHtcblx0XHRcdFx0XHRzZWxmLnN5bmNocm9uaXphdGlvblN0YXR1cyA9IFwiU3luY2hyb25pemF0aW9uIGNhbmNlbGVkIGJ5IHVzZXJcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9wcm92aWRlci5pbnN0YW5jZS5vbignc3luY0VuZCcsIGZ1bmN0aW9uIChzeW5jRW5kSW5mbykge1xuXHRcdFx0c2VsZi5fc3RvcmUubG9hZEFsbCgpOyAvLyBUT0RPIC0gdXNlIGEgYmV0dGVyIHNlcnZpY2UgZm9yIHRoaXMgLy8gcmViaW5kcyB0aGUgVUlcblxuXHRcdFx0c2VsZi56b25lLnJ1bigoKSA9PiB7XG5cdFx0XHRcdHNlbGYuc3luY2hyb25pemF0aW9uQ29tcGxldGVkID0gdHJ1ZTtcblx0XHRcdFx0c2VsZi5zeW5jaHJvbml6YXRpb25TdGF0dXMgPSBcIlN5bmNocm9uaXphdGlvbiBjb21wbGV0ZWQuXCI7IC8vIFRPRE8gLSBpcyB0aGlzIG5lZWRlZD9cblxuXHRcdFx0XHRpZiAoc3luY0VuZEluZm8uZmFpbGVkSXRlbXNbY29uc3RhbnRzLmRlbGl2ZXJpZXNDb250ZW50VHlwZU5hbWVdKSB7XG5cdFx0XHRcdFx0c2VsZi5fbm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihzeW5jRW5kSW5mby5lcnJvci5tZXNzYWdlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChzeW5jRW5kSW5mby5lcnJvcikge1xuXHRcdFx0XHRcdHNlbGYuX25vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3Ioc3luY0VuZEluZm8uZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIHN5bmNocm9uaXphdGlvblN0YXR1c01lc3NhZ2UgPSBcIlN5bmMgY29tcGxldGVkLlwiICsgXCJUbyBzZXJ2ZXI6IFwiICsgc3luY0VuZEluZm8uc3luY2VkVG9TZXJ2ZXIgKyBcIiBGcm9tIHNlcnZlcjogXCIgKyBzeW5jRW5kSW5mby5zeW5jZWRUb0NsaWVudDtcblx0XHRcdFx0XHRzZWxmLl9ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3Moc3luY2hyb25pemF0aW9uU3RhdHVzTWVzc2FnZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0YWRkQ29uZWN0aXZpdHlMaXN0ZW5lcnMoKSB7XG5cdFx0Y29ubmVjdGl2aXR5LnN0YXJ0TW9uaXRvcmluZygobmV3Q29ubmVjdGlvblR5cGU6IG51bWJlcikgPT4ge1xuXHRcdFx0dGhpcy56b25lLnJ1bigoKSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobmV3Q29ubmVjdGlvblR5cGUpIHtcblx0XHRcdFx0XHRjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5ub25lOlxuXHRcdFx0XHRcdFx0dGhpcy5jb25uZWN0aW9uU3RhdHVzID0gb2ZmbGluZUNvbm5lY3Rpb25NZXNzYWdlO1xuXHRcdFx0XHRcdFx0dGhpcy5fcHJvdmlkZXIuaW5zdGFuY2Uub2ZmbGluZSgpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUud2lmaTpcblx0XHRcdFx0XHRjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5tb2JpbGU6XG5cdFx0XHRcdFx0XHR0aGlzLmNvbm5lY3Rpb25TdGF0dXMgPSBvbmxpbmVDb25uZWN0aW9uTWVzc2FnZTtcblx0XHRcdFx0XHRcdHRoaXMuX3Byb3ZpZGVyLmluc3RhbmNlLm9ubGluZSgpO1xuXHRcdFx0XHRcdFx0dGhpcy5fcHJvdmlkZXIuaW5zdGFuY2Uuc3luYygpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcbn0iXX0=