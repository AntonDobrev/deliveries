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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy1lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkVBQXNFO0FBQ3RFLHNDQUFnRztBQUNoRyx3REFBaUU7QUFFakUsa0RBQXVEO0FBRXZELElBQU0sZ0JBQWdCLEdBQUc7SUFDckIsU0FBUyxFQUFFLG1CQUFXLENBQUMsT0FBTztJQUM5QixhQUFhLEVBQUUsbUJBQVcsQ0FBQyxhQUFhLENBQUM7SUFDekMsV0FBVyxFQUFFLG1CQUFXLENBQUMsU0FBUztJQUNsQyxTQUFTLEVBQUUsbUJBQVcsQ0FBQyxPQUFPO0lBQzlCLE1BQU0sRUFBRSxtQkFBVyxDQUFDLElBQUk7Q0FDM0IsQ0FBQztBQVNGLElBQWEscUJBQXFCO0lBZTlCLCtCQUFvQixvQkFBeUM7UUFBekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQWI3RCxxQkFBZ0IsR0FBWSxDQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQU83RSxXQUFNLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDNUIsV0FBTSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBT3RDLENBQUM7SUFiUSxzQkFBSSwwQ0FBTzthQUFYLFVBQVksS0FBZTtZQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFTLE1BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLG1CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCO1FBQ3JILENBQUM7OztPQUFBO0lBWUQsb0RBQW9CLEdBQXBCLFVBQXFCLE1BQU07UUFDdkIsSUFBSSxrQkFBa0IsR0FBVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hGLElBQUksV0FBVyxHQUFHLG1CQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGNBQWM7UUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBRW5DLENBQUM7SUFDRCx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxXQUFXO1lBQ2xFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2IsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJO2lCQUNsQixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBcENZO0lBQVIsWUFBSyxFQUFFOzhCQUFvQix5QkFBUTtxQ0FBUix5QkFBUTtvREFHbkM7QUFFUztJQUFULGFBQU0sRUFBRTs7cURBQTZCO0FBQzVCO0lBQVQsYUFBTSxFQUFFOztxREFBNkI7QUFWN0IscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2xELENBQUM7cUNBZ0I0Qyw4QkFBbUI7R0FmcEQscUJBQXFCLENBd0NqQztBQXhDWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWxpdmVyeSB9IGZyb20gJy4vLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9kZWxpdmVyeS5tb2RlbCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXNcIlxuXG5pbXBvcnQgeyBPcmRlclN0YXR1cyB9IGZyb20gXCIuLi8uLi8uLi8uLi9zaGFyZWQvZW51bXNcIjtcblxuY29uc3Qgb3JkZXJTdGF0dXNOYW1lcyA9IHtcbiAgICBcIlBlbmRpbmdcIjogT3JkZXJTdGF0dXMuUGVuZGluZyxcbiAgICBcIkluIFByb2dyZXNzXCI6IE9yZGVyU3RhdHVzWydJbiBQcm9ncmVzcyddLFxuICAgIFwiRGVsaXZlcmVkXCI6IE9yZGVyU3RhdHVzLkRlbGl2ZXJlZCxcbiAgICBcIlJlZnVzZWRcIjogT3JkZXJTdGF0dXMuUmVmdXNlZCxcbiAgICBcIkxvc3RcIjogT3JkZXJTdGF0dXMuTG9zdFxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcIm5zLWhvbWVWaWV3LWVkaXRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJob21lVmlldy1lZGl0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSG9tZVZpZXdFZGl0Q29tcG9uZW50IHtcbiAgICBcbiAgICBzdGF0dXNOYW1lc0FycmF5OnN0cmluZ1tdID0gW1wiUGVuZGluZ1wiLCBcIkluIFByb2dyZXNzXCIsIFwiRGVsaXZlcmVkXCIsIFwiUmVmdXNlZFwiLCBcIkxvc3RcIl07XG5cbiAgICBASW5wdXQoKSBzZXQgY3VycmVudCh2YWx1ZTogRGVsaXZlcnkpIHtcbiAgICAgICAgdGhpcy5pdGVtID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24oe30sIHZhbHVlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbVN0YXR1c0luZGV4ID0gdGhpcy5zdGF0dXNOYW1lc0FycmF5LmluZGV4T2YoT3JkZXJTdGF0dXNbdGhpcy5pdGVtLlN0YXR1c10pOyAvLyBpbmRleE9mKFwiUGVuZGluZ1wiKVxuICAgIH1cblxuICAgIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGl0ZW06IERlbGl2ZXJ5O1xuICAgIGN1cnJlbnRJdGVtU3RhdHVzSW5kZXg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHNlbGVjdGVkSW5kZXhDaGFuZ2VkKHBpY2tlcikge1xuICAgICAgICB2YXIgc2VsZWN0ZWRTdGF0dXNOYW1lOiBzdHJpbmcgPSB0aGlzLnN0YXR1c05hbWVzQXJyYXlbcGlja2VyLnNlbGVjdGVkSW5kZXhdLnRvU3RyaW5nKCk7XG4gICAgICAgIHZhciBzdGF0dXNJbmRleCA9IE9yZGVyU3RhdHVzW3NlbGVjdGVkU3RhdHVzTmFtZV07IC8vIDEsIDIsICwgMTAgXG4gICAgICAgIHRoaXMuaXRlbS5TdGF0dXMgPSBzdGF0dXNJbmRleDtcblxuICAgIH1cbiAgICBvblVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGUuZW1pdCh7XG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25EZWxldGUoKSB7XG4gICAgICAgIHRoaXMuX25vdGlmaWNhdGlvblNlcnZpY2UuY29uZmlybShcIkRlbGV0aW5nIGFuIGl0ZW1cIikudGhlbihpc0NvbmZpcm1lZCA9PiB7XG4gICAgICAgICAgICBpZiAoaXNDb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZS5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==