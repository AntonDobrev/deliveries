"use strict";
var delivery_model_1 = require("./../../../../shared/models/delivery.model");
var core_1 = require("@angular/core");
var services_1 = require("../../../../shared/services");
var enums_1 = require("../../../../shared/enums");
var orderStatusNames = {
    "Pending": enums_1.OrderStatus.Pending,
    "In Progress": enums_1.OrderStatus['In Progress'],
    "Delivered": enums_1.OrderStatus.Delivered,
    "Refused": enums_1.OrderStatus.Refused,
    "Lost": enums_1.OrderStatus.Lost
};
var HomeViewEditComponent = (function () {
    function HomeViewEditComponent(_notificationService) {
        this._notificationService = _notificationService;
        this.statusNamesArray = ["Pending", "In Progress", "Delivered", "Refused", "Lost"];
        this.update = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
    }
    Object.defineProperty(HomeViewEditComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
            this.currentItemStatusIndex = this.statusNamesArray.indexOf(enums_1.OrderStatus[this.item.Status]); // indexOf("Pending")
        },
        enumerable: true,
        configurable: true
    });
    HomeViewEditComponent.prototype.selectedIndexChanged = function (picker) {
        var selectedStatusName = this.statusNamesArray[picker.selectedIndex].toString();
        var statusIndex = enums_1.OrderStatus[selectedStatusName]; // 1, 2, , 10 
        this.item.Status = statusIndex;
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
    __metadata("design:type", delivery_model_1.Delivery),
    __metadata("design:paramtypes", [delivery_model_1.Delivery])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy1lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkVBQXNFO0FBQ3RFLHNDQUFnRztBQUNoRyx3REFBaUU7QUFJakUsa0RBQXVEO0FBRXZELElBQU0sZ0JBQWdCLEdBQUc7SUFDckIsU0FBUyxFQUFFLG1CQUFXLENBQUMsT0FBTztJQUM5QixhQUFhLEVBQUUsbUJBQVcsQ0FBQyxhQUFhLENBQUM7SUFDekMsV0FBVyxFQUFFLG1CQUFXLENBQUMsU0FBUztJQUNsQyxTQUFTLEVBQUUsbUJBQVcsQ0FBQyxPQUFPO0lBQzlCLE1BQU0sRUFBRSxtQkFBVyxDQUFDLElBQUk7Q0FDM0IsQ0FBQztBQVNGLElBQWEscUJBQXFCO0lBYzlCLCtCQUFvQixvQkFBeUM7UUFBekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQVo3RCxxQkFBZ0IsR0FBWSxDQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQU83RSxXQUFNLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDNUIsV0FBTSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBTXRDLENBQUM7SUFaUSxzQkFBSSwwQ0FBTzthQUFYLFVBQVksS0FBZTtZQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFTLE1BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLG1CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCO1FBQ3JILENBQUM7OztPQUFBO0lBYUQsb0RBQW9CLEdBQXBCLFVBQXFCLE1BQU07UUFDdkIsSUFBSSxrQkFBa0IsR0FBVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hGLElBQUksV0FBVyxHQUFHLG1CQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGNBQWM7UUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBRW5DLENBQUM7SUFDRCx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxXQUFXO1lBQ2xFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2IsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJO2lCQUNsQixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDO0FBckNZO0lBQVIsWUFBSyxFQUFFOzhCQUFvQix5QkFBUTtxQ0FBUix5QkFBUTtvREFHbkM7QUFFUztJQUFULGFBQU0sRUFBRTs7cURBQTZCO0FBQzVCO0lBQVQsYUFBTSxFQUFFOztxREFBNkI7QUFWN0IscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2xELENBQUM7cUNBZTRDLDhCQUFtQjtHQWRwRCxxQkFBcUIsQ0F5Q2pDO0FBekNZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlbGl2ZXJ5IH0gZnJvbSAnLi8uLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2RlbGl2ZXJ5Lm1vZGVsJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlc1wiXG5cbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tIFwiLi9cIjtcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBPcmRlclN0YXR1cyB9IGZyb20gXCIuLi8uLi8uLi8uLi9zaGFyZWQvZW51bXNcIjtcblxuY29uc3Qgb3JkZXJTdGF0dXNOYW1lcyA9IHtcbiAgICBcIlBlbmRpbmdcIjogT3JkZXJTdGF0dXMuUGVuZGluZyxcbiAgICBcIkluIFByb2dyZXNzXCI6IE9yZGVyU3RhdHVzWydJbiBQcm9ncmVzcyddLFxuICAgIFwiRGVsaXZlcmVkXCI6IE9yZGVyU3RhdHVzLkRlbGl2ZXJlZCxcbiAgICBcIlJlZnVzZWRcIjogT3JkZXJTdGF0dXMuUmVmdXNlZCxcbiAgICBcIkxvc3RcIjogT3JkZXJTdGF0dXMuTG9zdFxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcIm5zLWhvbWVWaWV3LWVkaXRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJob21lVmlldy1lZGl0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSG9tZVZpZXdFZGl0Q29tcG9uZW50IHtcbiAgICBcbiAgICBzdGF0dXNOYW1lc0FycmF5OnN0cmluZ1tdID0gW1wiUGVuZGluZ1wiLCBcIkluIFByb2dyZXNzXCIsIFwiRGVsaXZlcmVkXCIsIFwiUmVmdXNlZFwiLCBcIkxvc3RcIl07XG5cbiAgICBASW5wdXQoKSBzZXQgY3VycmVudCh2YWx1ZTogRGVsaXZlcnkpIHtcbiAgICAgICAgdGhpcy5pdGVtID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24oe30sIHZhbHVlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbVN0YXR1c0luZGV4ID0gdGhpcy5zdGF0dXNOYW1lc0FycmF5LmluZGV4T2YoT3JkZXJTdGF0dXNbdGhpcy5pdGVtLlN0YXR1c10pOyAvLyBpbmRleE9mKFwiUGVuZGluZ1wiKVxuICAgIH1cblxuICAgIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGl0ZW06IERlbGl2ZXJ5O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgY3VycmVudEl0ZW1TdGF0dXNJbmRleDogbnVtYmVyO1xuXG4gICAgc2VsZWN0ZWRJbmRleENoYW5nZWQocGlja2VyKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZFN0YXR1c05hbWU6IHN0cmluZyA9IHRoaXMuc3RhdHVzTmFtZXNBcnJheVtwaWNrZXIuc2VsZWN0ZWRJbmRleF0udG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIHN0YXR1c0luZGV4ID0gT3JkZXJTdGF0dXNbc2VsZWN0ZWRTdGF0dXNOYW1lXTsgLy8gMSwgMiwgLCAxMCBcbiAgICAgICAgdGhpcy5pdGVtLlN0YXR1cyA9IHN0YXR1c0luZGV4O1xuXG4gICAgfVxuICAgIG9uVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZS5lbWl0KHtcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5fbm90aWZpY2F0aW9uU2VydmljZS5jb25maXJtKFwiRGVsZXRpbmcgYW4gaXRlbVwiKS50aGVuKGlzQ29uZmlybWVkID0+IHtcbiAgICAgICAgICAgIGlmIChpc0NvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19