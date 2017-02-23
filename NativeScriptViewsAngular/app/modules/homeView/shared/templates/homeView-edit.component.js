"use strict";
var core_1 = require("@angular/core");
var services_1 = require("../../../../shared/services");
var shared = require("../../../../shared");
var enums_1 = require("../../../../shared/enums");
var orderStatusNames = {
    "Pending": enums_1.OrderStatus.Pending,
    "Current": enums_1.OrderStatus.Current,
    "Delivered": enums_1.OrderStatus.Delivered,
    "Refused": enums_1.OrderStatus.Refused,
    "Problem": enums_1.OrderStatus.Problem
};
var HomeViewEditComponent = (function () {
    function HomeViewEditComponent(_notificationService) {
        this._notificationService = _notificationService;
        this.statusNamesArray = ["Pending", "Current", "Delivered", "Refused", "Problem"];
        this.update = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
    }
    Object.defineProperty(HomeViewEditComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
            this.currentItemStatusIndex = this.statusNamesArray.indexOf(enums_1.OrderStatus[this.item.data.Status]); // indexOf("Pending")
        },
        enumerable: true,
        configurable: true
    });
    HomeViewEditComponent.prototype.selectedIndexChanged = function (picker) {
        var selectedStatusName = this.statusNamesArray[picker.selectedIndex].toString();
        var statusIndex = enums_1.OrderStatus[selectedStatusName]; // 1, 2, , 10 
        this.item.data.Status = statusIndex;
    };
    HomeViewEditComponent.prototype.onUpdate = function () {
        this.update.emit({
            item: this.item
        });
    };
    HomeViewEditComponent.prototype.onDelete = function () {
        var _this = this;
        this._notificationService.confirm("Deleting an item").then(function (isConfirmed) {
            if (isConfirmed) {
                _this.delete.emit({
                    item: _this.item
                });
            }
        });
    };
    return HomeViewEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HomeViewEditComponent.prototype, "current", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HomeViewEditComponent.prototype, "update", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HomeViewEditComponent.prototype, "delete", void 0);
HomeViewEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "ns-homeView-edit",
        templateUrl: "homeView-edit.component.html",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [services_1.NotificationService])
], HomeViewEditComponent);
exports.HomeViewEditComponent = HomeViewEditComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy1lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWdHO0FBQ2hHLHdEQUFpRTtBQUdqRSwyQ0FBNkM7QUFDN0Msa0RBQXVEO0FBRXZELElBQU0sZ0JBQWdCLEdBQUc7SUFDckIsU0FBUyxFQUFFLG1CQUFXLENBQUMsT0FBTztJQUM5QixTQUFTLEVBQUUsbUJBQVcsQ0FBQyxPQUFPO0lBQzlCLFdBQVcsRUFBRSxtQkFBVyxDQUFDLFNBQVM7SUFDbEMsU0FBUyxFQUFFLG1CQUFXLENBQUMsT0FBTztJQUM5QixTQUFTLEVBQUUsbUJBQVcsQ0FBQyxPQUFPO0NBQ2pDLENBQUM7QUFTRixJQUFhLHFCQUFxQjtJQWM5QiwrQkFBb0Isb0JBQXlDO1FBQXpDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFaN0QscUJBQWdCLEdBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFPNUUsV0FBTSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzVCLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQU10QyxDQUFDO0lBWlEsc0JBQUksMENBQU87YUFBWCxVQUFZLEtBQWtCO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQVMsTUFBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsbUJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCO1FBQzFILENBQUM7OztPQUFBO0lBYUQsb0RBQW9CLEdBQXBCLFVBQXFCLE1BQU07UUFDdkIsSUFBSSxrQkFBa0IsR0FBVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hGLElBQUksV0FBVyxHQUFHLG1CQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGNBQWM7UUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztJQUV4QyxDQUFDO0lBQ0Qsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsV0FBVztZQUNsRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNiLElBQUksRUFBRSxLQUFJLENBQUMsSUFBSTtpQkFDbEIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXJDWTtJQUFSLFlBQUssRUFBRTs7O29EQUdQO0FBRVM7SUFBVCxhQUFNLEVBQUU7O3FEQUE2QjtBQUM1QjtJQUFULGFBQU0sRUFBRTs7cURBQTZCO0FBVjdCLHFCQUFxQjtJQU5qQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLDhCQUE4QjtRQUMzQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtLQUNsRCxDQUFDO3FDQWU0Qyw4QkFBbUI7R0FkcEQscUJBQXFCLENBeUNqQztBQXpDWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXNcIlxuXG5pbXBvcnQgKiBhcyBjb21tb24gZnJvbSBcIi4vXCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4uLy4uLy4uLy4uL3NoYXJlZFwiO1xuaW1wb3J0IHsgT3JkZXJTdGF0dXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkL2VudW1zXCI7XG5cbmNvbnN0IG9yZGVyU3RhdHVzTmFtZXMgPSB7XG4gICAgXCJQZW5kaW5nXCI6IE9yZGVyU3RhdHVzLlBlbmRpbmcsXG4gICAgXCJDdXJyZW50XCI6IE9yZGVyU3RhdHVzLkN1cnJlbnQsXG4gICAgXCJEZWxpdmVyZWRcIjogT3JkZXJTdGF0dXMuRGVsaXZlcmVkLFxuICAgIFwiUmVmdXNlZFwiOiBPcmRlclN0YXR1cy5SZWZ1c2VkLFxuICAgIFwiUHJvYmxlbVwiOiBPcmRlclN0YXR1cy5Qcm9ibGVtXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwibnMtaG9tZVZpZXctZWRpdFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImhvbWVWaWV3LWVkaXQuY29tcG9uZW50Lmh0bWxcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBIb21lVmlld0VkaXRDb21wb25lbnQge1xuICAgIFxuICAgIHN0YXR1c05hbWVzQXJyYXk6c3RyaW5nW10gPSBbXCJQZW5kaW5nXCIsIFwiQ3VycmVudFwiLCBcIkRlbGl2ZXJlZFwiLCBcIlJlZnVzZWRcIiwgXCJQcm9ibGVtXCJdO1xuXG4gICAgQElucHV0KCkgc2V0IGN1cnJlbnQodmFsdWU6IHNoYXJlZC5JdGVtKSB7XG4gICAgICAgIHRoaXMuaXRlbSA9ICg8YW55Pk9iamVjdCkuYXNzaWduKHt9LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW1TdGF0dXNJbmRleCA9IHRoaXMuc3RhdHVzTmFtZXNBcnJheS5pbmRleE9mKE9yZGVyU3RhdHVzW3RoaXMuaXRlbS5kYXRhLlN0YXR1c10pOyAvLyBpbmRleE9mKFwiUGVuZGluZ1wiKVxuICAgIH1cblxuICAgIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGl0ZW06IHNoYXJlZC5JdGVtO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgY3VycmVudEl0ZW1TdGF0dXNJbmRleDogbnVtYmVyO1xuXG4gICAgc2VsZWN0ZWRJbmRleENoYW5nZWQocGlja2VyKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZFN0YXR1c05hbWU6IHN0cmluZyA9IHRoaXMuc3RhdHVzTmFtZXNBcnJheVtwaWNrZXIuc2VsZWN0ZWRJbmRleF0udG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIHN0YXR1c0luZGV4ID0gT3JkZXJTdGF0dXNbc2VsZWN0ZWRTdGF0dXNOYW1lXTsgLy8gMSwgMiwgLCAxMCBcbiAgICAgICAgdGhpcy5pdGVtLmRhdGEuU3RhdHVzID0gc3RhdHVzSW5kZXg7XG5cbiAgICB9XG4gICAgb25VcGRhdGUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlLmVtaXQoe1xuICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRGVsZXRlKCkge1xuICAgICAgICB0aGlzLl9ub3RpZmljYXRpb25TZXJ2aWNlLmNvbmZpcm0oXCJEZWxldGluZyBhbiBpdGVtXCIpLnRoZW4oaXNDb25maXJtZWQgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ29uZmlybWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGUuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59Il19