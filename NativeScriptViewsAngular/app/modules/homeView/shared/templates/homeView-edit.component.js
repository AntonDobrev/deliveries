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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], HomeViewEditComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HomeViewEditComponent.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HomeViewEditComponent.prototype, "delete", void 0);
    HomeViewEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-homeView-edit",
            templateUrl: "homeView-edit.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [services_1.NotificationService])
    ], HomeViewEditComponent);
    return HomeViewEditComponent;
}());
exports.HomeViewEditComponent = HomeViewEditComponent;
//# sourceMappingURL=homeView-edit.component.js.map