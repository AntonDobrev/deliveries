"use strict";
var core_1 = require("@angular/core");
var services_1 = require("../../../../shared/services");
var shared = require("../../../../shared");
// TODO - place in a separate file
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Pending"] = 1] = "Pending";
    OrderStatus[OrderStatus["Current"] = 2] = "Current";
    OrderStatus[OrderStatus["Delivered"] = 3] = "Delivered";
    OrderStatus[OrderStatus["Refused"] = 4] = "Refused";
    OrderStatus[OrderStatus["Problem"] = 10] = "Problem";
})(OrderStatus || (OrderStatus = {}));
// TODO - set as a constant in the dedicated file
var orderStatusNames = {
    "Pending": OrderStatus.Pending,
    "Current": OrderStatus.Current,
    "Delivered": OrderStatus.Delivered,
    "Refused": OrderStatus.Refused,
    "Problem": OrderStatus.Problem
};
var HomeViewEditComponent = (function () {
    function HomeViewEditComponent(_notificationService) {
        this._notificationService = _notificationService;
        this.statusArray = [OrderStatus.Pending, OrderStatus.Current, OrderStatus.Delivered, OrderStatus.Refused, OrderStatus.Problem];
        this.directions = ["Pending", "Current", "Delivered", "Refused", "Problem"];
        this.update = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
    }
    Object.defineProperty(HomeViewEditComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
            // TODO - this works, refactor
            console.log("Status[this.item.data.Status]" + OrderStatus[this.item.data.Status]); // Current, etc.
            console.log("orderStatusNames[this.item.data.Status]" + orderStatusNames[OrderStatus[this.item.data.Status]]); // 1, 2, 10 etc.
            this.currentItemStatus = this.directions.indexOf(OrderStatus[this.item.data.Status]);
            console.log("this.currentItemStatus: " + this.currentItemStatus);
            1;
        },
        enumerable: true,
        configurable: true
    });
    HomeViewEditComponent.prototype.selectedIndexChanged = function (picker) {
        console.log('picker selection: ' + picker.selectedIndex);
        var selectedItem = this.directions[picker.selectedIndex].toString();
        console.log(selectedItem);
        var enumIndex = OrderStatus[selectedItem];
        console.log("Enum index: " + enumIndex); // TODO - works correctly
        this.item.data.Status = enumIndex;
    };
    HomeViewEditComponent.prototype.onUpdate = function () {
        console.log(JSON.stringify(this.item));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy1lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWdHO0FBQ2hHLHdEQUFpRTtBQUdqRSwyQ0FBNkM7QUFFN0Msa0NBQWtDO0FBQ2xDLElBQUssV0FNSjtBQU5ELFdBQUssV0FBVztJQUNaLG1EQUFXLENBQUE7SUFDWCxtREFBVyxDQUFBO0lBQ1gsdURBQWEsQ0FBQTtJQUNiLG1EQUFXLENBQUE7SUFDWCxvREFBWSxDQUFBO0FBQ2hCLENBQUMsRUFOSSxXQUFXLEtBQVgsV0FBVyxRQU1mO0FBRUQsaURBQWlEO0FBQ2pELElBQU0sZ0JBQWdCLEdBQUc7SUFDckIsU0FBUyxFQUFFLFdBQVcsQ0FBQyxPQUFPO0lBQzlCLFNBQVMsRUFBRSxXQUFXLENBQUMsT0FBTztJQUM5QixXQUFXLEVBQUUsV0FBVyxDQUFDLFNBQVM7SUFDbEMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxPQUFPO0lBQzlCLFNBQVMsRUFBRSxXQUFXLENBQUMsT0FBTztDQUNqQyxDQUFDO0FBUUYsSUFBYSxxQkFBcUI7SUFxQjlCLCtCQUFvQixvQkFBeUM7UUFBekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQW5CckQsZ0JBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFILGVBQVUsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQVlyRSxXQUFNLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDNUIsV0FBTSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBTXRDLENBQUM7SUFqQlEsc0JBQUksMENBQU87YUFBWCxVQUFZLEtBQWtCO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQVMsTUFBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsOEJBQThCO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7WUFFbkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCO1lBQy9ILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxDQUFBO1FBQ3ZFLENBQUM7OztPQUFBO0lBYUQsb0RBQW9CLEdBQXBCLFVBQXFCLE1BQU07UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekQsSUFBSSxZQUFZLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxQixJQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7UUFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUV0QyxDQUFDO0lBQ0Qsd0NBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFdBQVc7WUFDbEUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDYixJQUFJLEVBQUUsS0FBSSxDQUFDLElBQUk7aUJBQ2xCLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUF0REQsSUFzREM7QUFoRFk7SUFBUixZQUFLLEVBQUU7OztvREFRUDtBQUVTO0lBQVQsYUFBTSxFQUFFOztxREFBNkI7QUFDNUI7SUFBVCxhQUFNLEVBQUU7O3FEQUE2QjtBQWpCN0IscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2xELENBQUM7cUNBc0I0Qyw4QkFBbUI7R0FyQnBELHFCQUFxQixDQXNEakM7QUF0RFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzXCJcblxuaW1wb3J0ICogYXMgY29tbW9uIGZyb20gXCIuL1wiO1xuaW1wb3J0ICogYXMgc2hhcmVkIGZyb20gXCIuLi8uLi8uLi8uLi9zaGFyZWRcIjtcblxuLy8gVE9ETyAtIHBsYWNlIGluIGEgc2VwYXJhdGUgZmlsZVxuZW51bSBPcmRlclN0YXR1cyB7XG4gICAgUGVuZGluZyA9IDEsXG4gICAgQ3VycmVudCA9IDIsXG4gICAgRGVsaXZlcmVkID0gMyxcbiAgICBSZWZ1c2VkID0gNCxcbiAgICBQcm9ibGVtID0gMTBcbn1cblxuLy8gVE9ETyAtIHNldCBhcyBhIGNvbnN0YW50IGluIHRoZSBkZWRpY2F0ZWQgZmlsZVxuY29uc3Qgb3JkZXJTdGF0dXNOYW1lcyA9IHtcbiAgICBcIlBlbmRpbmdcIjogT3JkZXJTdGF0dXMuUGVuZGluZyxcbiAgICBcIkN1cnJlbnRcIjogT3JkZXJTdGF0dXMuQ3VycmVudCxcbiAgICBcIkRlbGl2ZXJlZFwiOiBPcmRlclN0YXR1cy5EZWxpdmVyZWQsXG4gICAgXCJSZWZ1c2VkXCI6IE9yZGVyU3RhdHVzLlJlZnVzZWQsXG4gICAgXCJQcm9ibGVtXCI6IE9yZGVyU3RhdHVzLlByb2JsZW1cbn07XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwibnMtaG9tZVZpZXctZWRpdFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImhvbWVWaWV3LWVkaXQuY29tcG9uZW50Lmh0bWxcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBIb21lVmlld0VkaXRDb21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBzdGF0dXNBcnJheSA9IFtPcmRlclN0YXR1cy5QZW5kaW5nLCBPcmRlclN0YXR1cy5DdXJyZW50LCBPcmRlclN0YXR1cy5EZWxpdmVyZWQsIE9yZGVyU3RhdHVzLlJlZnVzZWQsIE9yZGVyU3RhdHVzLlByb2JsZW1dO1xuXG4gICAgcHJpdmF0ZSBkaXJlY3Rpb25zID0gW1wiUGVuZGluZ1wiLCBcIkN1cnJlbnRcIiwgXCJEZWxpdmVyZWRcIiwgXCJSZWZ1c2VkXCIsIFwiUHJvYmxlbVwiXTtcblxuICAgIEBJbnB1dCgpIHNldCBjdXJyZW50KHZhbHVlOiBzaGFyZWQuSXRlbSkge1xuICAgICAgICB0aGlzLml0ZW0gPSAoPGFueT5PYmplY3QpLmFzc2lnbih7fSwgdmFsdWUpO1xuICAgICAgICAvLyBUT0RPIC0gdGhpcyB3b3JrcywgcmVmYWN0b3JcbiAgICAgICAgY29uc29sZS5sb2coXCJTdGF0dXNbdGhpcy5pdGVtLmRhdGEuU3RhdHVzXVwiICsgT3JkZXJTdGF0dXNbdGhpcy5pdGVtLmRhdGEuU3RhdHVzXSk7IC8vIEN1cnJlbnQsIGV0Yy5cblxuICAgICAgICBjb25zb2xlLmxvZyhcIm9yZGVyU3RhdHVzTmFtZXNbdGhpcy5pdGVtLmRhdGEuU3RhdHVzXVwiICsgb3JkZXJTdGF0dXNOYW1lc1tPcmRlclN0YXR1c1t0aGlzLml0ZW0uZGF0YS5TdGF0dXNdXSk7IC8vIDEsIDIsIDEwIGV0Yy5cbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbVN0YXR1cyA9IHRoaXMuZGlyZWN0aW9ucy5pbmRleE9mKE9yZGVyU3RhdHVzW3RoaXMuaXRlbS5kYXRhLlN0YXR1c10pO1xuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuY3VycmVudEl0ZW1TdGF0dXM6IFwiICsgdGhpcy5jdXJyZW50SXRlbVN0YXR1cyk7IDFcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgdXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBkZWxldGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpdGVtOiBzaGFyZWQuSXRlbTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIGN1cnJlbnRJdGVtU3RhdHVzOiBudW1iZXI7IC8vID0gdGhpcy5pdGVtLmRhdGEuU3RhdHVzOyAvL3RoaXMuZGlyZWN0aW9ucy5pbmRleE9mKHRoaXMuZGlyZWN0aW9uc1t0aGlzLml0ZW0uZGF0YS5TdGF0dXNdLnRvU3RyaW5nKCkpOyAvLyBUT0RPIC0gdXNlIHRoaXMgaW4gdGhlIGRldGFpbHMgdmlldyB0b29cblxuICAgIHNlbGVjdGVkSW5kZXhDaGFuZ2VkKHBpY2tlcikge1xuICAgICAgICBjb25zb2xlLmxvZygncGlja2VyIHNlbGVjdGlvbjogJyArIHBpY2tlci5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgdmFyIHNlbGVjdGVkSXRlbTogc3RyaW5nID0gdGhpcy5kaXJlY3Rpb25zW3BpY2tlci5zZWxlY3RlZEluZGV4XS50b1N0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZEl0ZW0pO1xuXG4gICAgICAgIHZhciBlbnVtSW5kZXggPSBPcmRlclN0YXR1c1tzZWxlY3RlZEl0ZW1dO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRW51bSBpbmRleDogXCIgKyBlbnVtSW5kZXgpOyAvLyBUT0RPIC0gd29ya3MgY29ycmVjdGx5XG4gICAgICAgIHRoaXMuaXRlbS5kYXRhLlN0YXR1cyA9IGVudW1JbmRleDtcblxuICAgIH1cbiAgICBvblVwZGF0ZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5pdGVtKSk7XG4gICAgICAgIHRoaXMudXBkYXRlLmVtaXQoe1xuICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRGVsZXRlKCkge1xuICAgICAgICB0aGlzLl9ub3RpZmljYXRpb25TZXJ2aWNlLmNvbmZpcm0oXCJEZWxldGluZyBhbiBpdGVtXCIpLnRoZW4oaXNDb25maXJtZWQgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ29uZmlybWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGUuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59Il19