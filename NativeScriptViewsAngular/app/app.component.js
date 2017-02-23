"use strict";
var core_1 = require("@angular/core");
var services_1 = require("./shared/services");
var connectivity = require("connectivity");
var shared = require("./shared");
var services_2 = require("./shared/services");
var shared_1 = require("./shared");
var shared_2 = require("./modules/homeView/shared");
var onlineConnectionMessage = "You are working online";
var offlineConnectionMessage = "You are working offline";
var AppComponent = (function () {
    function AppComponent(_provider, zone, _notificationService, _store) {
        this._provider = _provider;
        this.zone = zone;
        this._notificationService = _notificationService;
        this._store = _store;
        this.connectionType = "Connection Status";
        this.connectionMessage = "";
        this.synchronizationStatus = "Synchronization Status";
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
                self.synchronizationStatus = "Synchronization started successfully";
                if (syncStartInfo.canceled) {
                    self.synchronizationStatus = "Synchronization canceled by user";
                }
            });
        });
        this._provider.instance.on('syncEnd', function (syncEndInfo) {
            // self._eventsService.on('sync-completed', function (info) {
            // 	console.log("Sync completed from app component" + info);
            // })
            self._store.loadAll(); // TODO - use a better service for this // rebinds the UI
            //	self._eventsService.broadcast('sync-completed', true);
            self.zone.run(function () {
                self.synchronizationCompleted = true;
                var synchronizationStatusMessage = "Sync completed." + "To server: " + syncEndInfo.syncedToServer + " From server: " + syncEndInfo.syncedToClient;
                if (syncEndInfo.failedItems[shared_1.constants.deliveriesContentTypeName]) {
                }
                self._notificationService.success(synchronizationStatusMessage);
            });
        });
    };
    AppComponent.prototype.addConectivityListeners = function () {
        var _this = this;
        connectivity.startMonitoring(function (newConnectionType) {
            _this.zone.run(function () {
                switch (newConnectionType) {
                    case connectivity.connectionType.none:
                        _this.connectionMessage = offlineConnectionMessage;
                        _this._provider.instance.offline();
                        break;
                    case connectivity.connectionType.wifi:
                    case connectivity.connectionType.mobile:
                        _this.connectionMessage = onlineConnectionMessage;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF3RTtBQUN4RSw4Q0FBc0Q7QUFDdEQsMkNBQTZDO0FBQzdDLGlDQUFtQztBQUNuQyw4Q0FBd0Q7QUFDeEQsbUNBQXFDO0FBRXJDLG9EQUEwRDtBQUUxRCxJQUFNLHVCQUF1QixHQUFHLHdCQUF3QixDQUFDO0FBQ3pELElBQU0sd0JBQXdCLEdBQUcseUJBQXlCLENBQUM7QUFTM0QsSUFBYSxZQUFZO0lBT3hCLHNCQUNTLFNBQXdDLEVBQ3hDLElBQVksRUFDWixvQkFBeUMsRUFDekMsTUFBcUI7UUFIckIsY0FBUyxHQUFULFNBQVMsQ0FBK0I7UUFDeEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQVR2QixtQkFBYyxHQUFXLG1CQUFtQixDQUFDO1FBQzdDLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUMvQiwwQkFBcUIsR0FBVyx3QkFBd0IsQ0FBQztRQUN6RCw2QkFBd0IsR0FBWSxLQUFLLENBQUM7SUFRakQsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLDRDQUFxQixHQUFyQjtRQUNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsYUFBYTtZQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDYixJQUFJLENBQUMscUJBQXFCLEdBQUcsc0NBQXNDLENBQUM7Z0JBQ3BFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMscUJBQXFCLEdBQUcsa0NBQWtDLENBQUM7Z0JBQ2pFLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLFdBQVc7WUFFMUQsNkRBQTZEO1lBQzdELDREQUE0RDtZQUM1RCxLQUFLO1lBRUwsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLHlEQUF5RDtZQUVoRix5REFBeUQ7WUFFekQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQztnQkFDckMsSUFBSSw0QkFBNEIsR0FBRyxpQkFBaUIsR0FBRyxhQUFhLEdBQUcsV0FBVyxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDO2dCQUVsSixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRW5FLENBQUM7Z0JBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBRWpFLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsOENBQXVCLEdBQXZCO1FBQUEsaUJBbUJDO1FBbEJBLFlBQVksQ0FBQyxlQUFlLENBQUMsVUFBQyxpQkFBeUI7WUFDdEQsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ2IsTUFBTSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO29CQUMzQixLQUFLLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSTt3QkFDcEMsS0FBSSxDQUFDLGlCQUFpQixHQUFHLHdCQUF3QixDQUFDO3dCQUNsRCxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDbEMsS0FBSyxDQUFDO29CQUNQLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7b0JBQ3RDLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNO3dCQUN0QyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsdUJBQXVCLENBQUM7d0JBQ2pELEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNqQyxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDL0IsS0FBSyxDQUFDO29CQUNQO3dCQUNDLEtBQUssQ0FBQztnQkFDUixDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFBQSxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBNUVELElBNEVDO0FBNUVZLFlBQVk7SUFQeEIsZ0JBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsU0FBUztRQUNuQixXQUFXLEVBQUUsb0JBQW9CO1FBQ2pDLFNBQVMsRUFBRSxDQUFDLDRCQUFpQixDQUFDO0tBQzlCLENBQUM7cUNBVW1CLE1BQU0sQ0FBQyxzQkFBc0IsRUFDbEMsYUFBTTtRQUNVLDhCQUFtQjtRQUNqQyxzQkFBYTtHQVhsQixZQUFZLENBNEV4QjtBQTVFWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEZWxpdmVyaWVzU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzJztcbmltcG9ydCAqIGFzIGNvbm5lY3Rpdml0eSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBjb25zdGFudHMgfSBmcm9tICcuL3NoYXJlZCc7XG5cbmltcG9ydCB7IEhvbWVWaWV3U3RvcmUgfSBmcm9tIFwiLi9tb2R1bGVzL2hvbWVWaWV3L3NoYXJlZFwiO1xuXG5jb25zdCBvbmxpbmVDb25uZWN0aW9uTWVzc2FnZSA9IFwiWW91IGFyZSB3b3JraW5nIG9ubGluZVwiO1xuY29uc3Qgb2ZmbGluZUNvbm5lY3Rpb25NZXNzYWdlID0gXCJZb3UgYXJlIHdvcmtpbmcgb2ZmbGluZVwiO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6IFwibnMtbWFpblwiLFxuXHR0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcblx0cHJvdmlkZXJzOiBbRGVsaXZlcmllc1NlcnZpY2VdXG59KVxuXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwdWJsaWMgY29ubmVjdGlvblR5cGU6IHN0cmluZyA9IFwiQ29ubmVjdGlvbiBTdGF0dXNcIjtcblx0cHVibGljIGNvbm5lY3Rpb25NZXNzYWdlOiBzdHJpbmcgPSBcIlwiO1xuXHRwdWJsaWMgc3luY2hyb25pemF0aW9uU3RhdHVzOiBzdHJpbmcgPSBcIlN5bmNocm9uaXphdGlvbiBTdGF0dXNcIjtcblx0cHVibGljIHN5bmNocm9uaXphdGlvbkNvbXBsZXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgX3Byb3ZpZGVyOiBzaGFyZWQuYmFja2VuZFNlcnZpY2VzU2VydmljZSxcblx0XHRwcml2YXRlIHpvbmU6IE5nWm9uZSxcblx0XHRwcml2YXRlIF9ub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuXHRcdHByaXZhdGUgX3N0b3JlOiBIb21lVmlld1N0b3JlXG5cdCkge1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5hZGRDb25lY3Rpdml0eUxpc3RlbmVycygpO1xuXHRcdHRoaXMuYWRkU3luY0V2ZW50TGlzdGVuZXJzKCk7XG5cdH07XG5cblx0YWRkU3luY0V2ZW50TGlzdGVuZXJzKCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHRoaXMuX3Byb3ZpZGVyLmluc3RhbmNlLm9uKCdzeW5jU3RhcnQnLCBmdW5jdGlvbiAoc3luY1N0YXJ0SW5mbykge1xuXHRcdFx0c2VsZi56b25lLnJ1bigoKSA9PiB7XG5cdFx0XHRcdHNlbGYuc3luY2hyb25pemF0aW9uU3RhdHVzID0gXCJTeW5jaHJvbml6YXRpb24gc3RhcnRlZCBzdWNjZXNzZnVsbHlcIjtcblx0XHRcdFx0aWYgKHN5bmNTdGFydEluZm8uY2FuY2VsZWQpIHtcblx0XHRcdFx0XHRzZWxmLnN5bmNocm9uaXphdGlvblN0YXR1cyA9IFwiU3luY2hyb25pemF0aW9uIGNhbmNlbGVkIGJ5IHVzZXJcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9wcm92aWRlci5pbnN0YW5jZS5vbignc3luY0VuZCcsIGZ1bmN0aW9uIChzeW5jRW5kSW5mbykge1xuXG5cdFx0XHQvLyBzZWxmLl9ldmVudHNTZXJ2aWNlLm9uKCdzeW5jLWNvbXBsZXRlZCcsIGZ1bmN0aW9uIChpbmZvKSB7XG5cdFx0XHQvLyBcdGNvbnNvbGUubG9nKFwiU3luYyBjb21wbGV0ZWQgZnJvbSBhcHAgY29tcG9uZW50XCIgKyBpbmZvKTtcblx0XHRcdC8vIH0pXG5cblx0XHRcdHNlbGYuX3N0b3JlLmxvYWRBbGwoKTsgLy8gVE9ETyAtIHVzZSBhIGJldHRlciBzZXJ2aWNlIGZvciB0aGlzIC8vIHJlYmluZHMgdGhlIFVJXG5cblx0XHRcdC8vXHRzZWxmLl9ldmVudHNTZXJ2aWNlLmJyb2FkY2FzdCgnc3luYy1jb21wbGV0ZWQnLCB0cnVlKTtcblxuXHRcdFx0c2VsZi56b25lLnJ1bigoKSA9PiB7XG5cdFx0XHRcdHNlbGYuc3luY2hyb25pemF0aW9uQ29tcGxldGVkID0gdHJ1ZTtcblx0XHRcdFx0dmFyIHN5bmNocm9uaXphdGlvblN0YXR1c01lc3NhZ2UgPSBcIlN5bmMgY29tcGxldGVkLlwiICsgXCJUbyBzZXJ2ZXI6IFwiICsgc3luY0VuZEluZm8uc3luY2VkVG9TZXJ2ZXIgKyBcIiBGcm9tIHNlcnZlcjogXCIgKyBzeW5jRW5kSW5mby5zeW5jZWRUb0NsaWVudDtcblxuXHRcdFx0XHRpZiAoc3luY0VuZEluZm8uZmFpbGVkSXRlbXNbY29uc3RhbnRzLmRlbGl2ZXJpZXNDb250ZW50VHlwZU5hbWVdKSB7XG5cdFx0XHRcdFx0Ly8gVE9ETyAvLyBzZWUgdGhlIGVycm9yIHByb3BlcnR5IHRvbyBcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNlbGYuX25vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhzeW5jaHJvbml6YXRpb25TdGF0dXNNZXNzYWdlKTtcblxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRDb25lY3Rpdml0eUxpc3RlbmVycygpIHtcblx0XHRjb25uZWN0aXZpdHkuc3RhcnRNb25pdG9yaW5nKChuZXdDb25uZWN0aW9uVHlwZTogbnVtYmVyKSA9PiB7XG5cdFx0XHR0aGlzLnpvbmUucnVuKCgpID0+IHtcblx0XHRcdFx0c3dpdGNoIChuZXdDb25uZWN0aW9uVHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XG5cdFx0XHRcdFx0XHR0aGlzLmNvbm5lY3Rpb25NZXNzYWdlID0gb2ZmbGluZUNvbm5lY3Rpb25NZXNzYWdlO1xuXHRcdFx0XHRcdFx0dGhpcy5fcHJvdmlkZXIuaW5zdGFuY2Uub2ZmbGluZSgpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUud2lmaTpcblx0XHRcdFx0XHRjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5tb2JpbGU6XG5cdFx0XHRcdFx0XHR0aGlzLmNvbm5lY3Rpb25NZXNzYWdlID0gb25saW5lQ29ubmVjdGlvbk1lc3NhZ2U7XG5cdFx0XHRcdFx0XHR0aGlzLl9wcm92aWRlci5pbnN0YW5jZS5vbmxpbmUoKTtcblx0XHRcdFx0XHRcdHRoaXMuX3Byb3ZpZGVyLmluc3RhbmNlLnN5bmMoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG59Il19