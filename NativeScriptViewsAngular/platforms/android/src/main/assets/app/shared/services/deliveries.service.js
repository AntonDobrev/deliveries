"use strict";
var core_1 = require("@angular/core");
var providers_1 = require("../providers");
var DeliveriesService = (function () {
    function DeliveriesService(_backendProvider) {
        this._backendProvider = _backendProvider;
        this._deliveriesContentTypeName = "DeliveryOrder"; // TODO - should this be a constant
        this._data = this._backendProvider.instance.data(this._deliveriesContentTypeName);
    }
    return DeliveriesService;
}());
DeliveriesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [providers_1.backendServicesService])
], DeliveriesService);
exports.DeliveriesService = DeliveriesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcmllcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVsaXZlcmllcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsMENBQXNEO0FBS3RELElBQWEsaUJBQWlCO0lBSzdCLDJCQUFvQixnQkFBd0M7UUFBeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF3QjtRQUgzQywrQkFBMEIsR0FBVyxlQUFlLENBQUMsQ0FBQyxtQ0FBbUM7UUFJekcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBQ0Ysd0JBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLGlCQUFpQjtJQUQ3QixpQkFBVSxFQUFFO3FDQU0wQixrQ0FBc0I7R0FMaEQsaUJBQWlCLENBUTdCO0FBUlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYmFja2VuZFNlcnZpY2VzU2VydmljZSB9IGZyb20gXCIuLi9wcm92aWRlcnNcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvZXZlcmxpdmUtc2RrL2Rpc3QvZGVjbGFyYXRpb25zL2V2ZXJsaXZlL3R5cGVzL0RhdGEnOyAvLyBUT0RPIG1hbmFnZSB0aGUgZGVwZW5kZW5jeSBpbiBBQiBhbmQgTlNcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVsaXZlcmllc1NlcnZpY2Uge1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2RlbGl2ZXJpZXNDb250ZW50VHlwZU5hbWU6IHN0cmluZyA9IFwiRGVsaXZlcnlPcmRlclwiOyAvLyBUT0RPIC0gc2hvdWxkIHRoaXMgYmUgYSBjb25zdGFudFxuXHRwcml2YXRlIF9kYXRhOiBEYXRhPGFueT47IFx0Ly8gVE9ETyAtIGNyZWF0ZSBhIERlbGl2ZXJ5T3JkZXIgbW9kZWwgaW50ZXJmYWNlIFxuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgX2JhY2tlbmRQcm92aWRlcjogYmFja2VuZFNlcnZpY2VzU2VydmljZSkge1xuXHRcdHRoaXMuX2RhdGEgPSB0aGlzLl9iYWNrZW5kUHJvdmlkZXIuaW5zdGFuY2UuZGF0YSh0aGlzLl9kZWxpdmVyaWVzQ29udGVudFR5cGVOYW1lKTtcblx0fVxufSJdfQ==