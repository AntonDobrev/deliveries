"use strict";
var core_1 = require("@angular/core");
var services_1 = require("./shared/services");
var connectivity = require("connectivity");
var shared = require("./shared");
var services_2 = require("./shared/services");
var shared_1 = require("./shared");
var page_1 = require("ui/page");
var shared_2 = require("./modules/homeView/shared");
var onlineConnectionMessage = "Online.";
var offlineConnectionMessage = "Offline.";
var AppComponent = (function () {
    function AppComponent(_provider, _page, zone, _notificationService, _store) {
        this._provider = _provider;
        this._page = _page;
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
        var message = this._page.getViewById("message");
        console.log(message);
        message.animate({
            opacity: 0,
            duration: 3000
        })
            .then(function () {
            message.visibility = 'collapsed';
        });
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
    __metadata("design:paramtypes", [shared.backendServicesService, page_1.Page,
        core_1.NgZone,
        services_2.NotificationService,
        shared_2.HomeViewStore])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF3RTtBQUN4RSw4Q0FBc0Q7QUFDdEQsMkNBQTZDO0FBQzdDLGlDQUFtQztBQUNuQyw4Q0FBd0Q7QUFDeEQsbUNBQXFDO0FBQ3JDLGdDQUErQjtBQUUvQixvREFBMEQ7QUFFMUQsSUFBTSx1QkFBdUIsR0FBRyxTQUFTLENBQUM7QUFDMUMsSUFBTSx3QkFBd0IsR0FBRyxVQUFVLENBQUM7QUFTNUMsSUFBYSxZQUFZO0lBTXhCLHNCQUNTLFNBQXdDLEVBQ3hDLEtBQVcsRUFDWCxJQUFZLEVBQ1osb0JBQXlDLEVBQ3pDLE1BQXFCO1FBSnJCLGNBQVMsR0FBVCxTQUFTLENBQStCO1FBQ3hDLFVBQUssR0FBTCxLQUFLLENBQU07UUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1oseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUN6QyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBVHZCLHFCQUFnQixHQUFXLEVBQUUsQ0FBQztRQUM5QiwwQkFBcUIsR0FBVyxFQUFFLENBQUM7UUFDbkMsNkJBQXdCLEdBQVksS0FBSyxDQUFDO0lBU2pELENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFN0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyQixPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ2YsT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsSUFBSTtTQUNkLENBQUM7YUFDRCxJQUFJLENBQ0o7WUFBVyxPQUFPLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FB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QUNILG1CQUFDO0FBQUQsQ0FBQyxBQWxGRCxJQWtGQztBQWxGWSxZQUFZO0lBUHhCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLG9CQUFvQjtRQUNqQyxTQUFTLEVBQUUsQ0FBQyw0QkFBaUIsQ0FBQztLQUM5QixDQUFDO3FDQVNtQixNQUFNLENBQUMsc0JBQXNCLEVBQ2pDLFdBQUk7UUFDTCxhQUFNO1FBQ1UsOEJBQW1CO1FBQ2pDLHNCQUFhO0dBWGxCLFlBQVksQ0FrRnhCO0FBbEZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERlbGl2ZXJpZXNTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMnO1xuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi9zaGFyZWRcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvc2VydmljZXNcIjtcbmltcG9ydCB7IGNvbnN0YW50cyB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcblxuaW1wb3J0IHsgSG9tZVZpZXdTdG9yZSB9IGZyb20gXCIuL21vZHVsZXMvaG9tZVZpZXcvc2hhcmVkXCI7XG5cbmNvbnN0IG9ubGluZUNvbm5lY3Rpb25NZXNzYWdlID0gXCJPbmxpbmUuXCI7XG5jb25zdCBvZmZsaW5lQ29ubmVjdGlvbk1lc3NhZ2UgPSBcIk9mZmxpbmUuXCI7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogXCJucy1tYWluXCIsXG5cdHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxuXHRwcm92aWRlcnM6IFtEZWxpdmVyaWVzU2VydmljZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHB1YmxpYyBjb25uZWN0aW9uU3RhdHVzOiBzdHJpbmcgPSBcIlwiO1xuXHRwdWJsaWMgc3luY2hyb25pemF0aW9uU3RhdHVzOiBzdHJpbmcgPSBcIlwiO1xuXHRwdWJsaWMgc3luY2hyb25pemF0aW9uQ29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBfcHJvdmlkZXI6IHNoYXJlZC5iYWNrZW5kU2VydmljZXNTZXJ2aWNlLFxuXHRcdHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG5cdFx0cHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG5cdFx0cHJpdmF0ZSBfbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcblx0XHRwcml2YXRlIF9zdG9yZTogSG9tZVZpZXdTdG9yZVxuXHQpIHtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuYWRkQ29uZWN0aXZpdHlMaXN0ZW5lcnMoKTtcblx0XHR0aGlzLmFkZFN5bmNFdmVudExpc3RlbmVycygpO1xuXG5cdFx0dmFyIG1lc3NhZ2UgPSB0aGlzLl9wYWdlLmdldFZpZXdCeUlkKFwibWVzc2FnZVwiKTtcblx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcblxuXHRcdG1lc3NhZ2UuYW5pbWF0ZSh7XG5cdFx0XHRvcGFjaXR5OiAwLFxuXHRcdFx0ZHVyYXRpb246IDMwMDBcblx0XHR9KVxuXHRcdC50aGVuKFxuXHRcdFx0ZnVuY3Rpb24oKXttZXNzYWdlLnZpc2liaWxpdHkgPSAnY29sbGFwc2VkJztcblx0XHR9KTtcblx0fTtcblxuXHRhZGRTeW5jRXZlbnRMaXN0ZW5lcnMoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0dGhpcy5fcHJvdmlkZXIuaW5zdGFuY2Uub24oJ3N5bmNTdGFydCcsIGZ1bmN0aW9uIChzeW5jU3RhcnRJbmZvKSB7XG5cdFx0XHRzZWxmLnpvbmUucnVuKCgpID0+IHtcblx0XHRcdFx0c2VsZi5zeW5jaHJvbml6YXRpb25TdGF0dXMgPSBcIlN5bmNocm9uaXphdGlvbiBzdGFydGVkLlwiO1xuXHRcdFx0XHRpZiAoc3luY1N0YXJ0SW5mby5jYW5jZWxlZCkge1xuXHRcdFx0XHRcdHNlbGYuc3luY2hyb25pemF0aW9uU3RhdHVzID0gXCJTeW5jaHJvbml6YXRpb24gY2FuY2VsZWQgYnkgdXNlclwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX3Byb3ZpZGVyLmluc3RhbmNlLm9uKCdzeW5jRW5kJywgZnVuY3Rpb24gKHN5bmNFbmRJbmZvKSB7XG5cdFx0XHRzZWxmLl9zdG9yZS5sb2FkQWxsKCk7IC8vIFRPRE8gLSB1c2UgYSBiZXR0ZXIgc2VydmljZSBmb3IgdGhpcyAvLyByZWJpbmRzIHRoZSBVSVxuXG5cdFx0XHRzZWxmLnpvbmUucnVuKCgpID0+IHtcblx0XHRcdFx0c2VsZi5zeW5jaHJvbml6YXRpb25Db21wbGV0ZWQgPSB0cnVlO1xuXHRcdFx0XHRzZWxmLnN5bmNocm9uaXphdGlvblN0YXR1cyA9IFwiU3luY2hyb25pemF0aW9uIGNvbXBsZXRlZC5cIjsgLy8gVE9ETyAtIGlzIHRoaXMgbmVlZGVkP1xuXG5cdFx0XHRcdGlmIChzeW5jRW5kSW5mby5mYWlsZWRJdGVtc1tjb25zdGFudHMuZGVsaXZlcmllc0NvbnRlbnRUeXBlTmFtZV0pIHtcblx0XHRcdFx0XHRzZWxmLl9ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHN5bmNFbmRJbmZvLmVycm9yLm1lc3NhZ2UpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHN5bmNFbmRJbmZvLmVycm9yKSB7XG5cdFx0XHRcdFx0c2VsZi5fbm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihzeW5jRW5kSW5mby5lcnJvci5tZXNzYWdlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgc3luY2hyb25pemF0aW9uU3RhdHVzTWVzc2FnZSA9IFwiU3luYyBjb21wbGV0ZWQuXCIgKyBcIlRvIHNlcnZlcjogXCIgKyBzeW5jRW5kSW5mby5zeW5jZWRUb1NlcnZlciArIFwiIEZyb20gc2VydmVyOiBcIiArIHN5bmNFbmRJbmZvLnN5bmNlZFRvQ2xpZW50O1xuXHRcdFx0XHRcdHNlbGYuX25vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhzeW5jaHJvbml6YXRpb25TdGF0dXNNZXNzYWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRDb25lY3Rpdml0eUxpc3RlbmVycygpIHtcblx0XHRjb25uZWN0aXZpdHkuc3RhcnRNb25pdG9yaW5nKChuZXdDb25uZWN0aW9uVHlwZTogbnVtYmVyKSA9PiB7XG5cdFx0XHR0aGlzLnpvbmUucnVuKCgpID0+IHtcblx0XHRcdFx0c3dpdGNoIChuZXdDb25uZWN0aW9uVHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XG5cdFx0XHRcdFx0XHR0aGlzLmNvbm5lY3Rpb25TdGF0dXMgPSBvZmZsaW5lQ29ubmVjdGlvbk1lc3NhZ2U7XG5cdFx0XHRcdFx0XHR0aGlzLl9wcm92aWRlci5pbnN0YW5jZS5vZmZsaW5lKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS53aWZpOlxuXHRcdFx0XHRcdGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm1vYmlsZTpcblx0XHRcdFx0XHRcdHRoaXMuY29ubmVjdGlvblN0YXR1cyA9IG9ubGluZUNvbm5lY3Rpb25NZXNzYWdlO1xuXHRcdFx0XHRcdFx0dGhpcy5fcHJvdmlkZXIuaW5zdGFuY2Uub25saW5lKCk7XG5cdFx0XHRcdFx0XHR0aGlzLl9wcm92aWRlci5pbnN0YW5jZS5zeW5jKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xufSJdfQ==