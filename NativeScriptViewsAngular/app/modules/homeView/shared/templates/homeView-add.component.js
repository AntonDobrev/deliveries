"use strict";
var delivery_model_1 = require("./../../../../shared/models/delivery.model");
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var HomeViewAddComponent = (function () {
    function HomeViewAddComponent() {
        this.add = new core_1.EventEmitter();
    }
    Object.defineProperty(HomeViewAddComponent.prototype, "current", {
        // @Input() provider: any;
        //  @Input() item: Delivery;
        set: function (value) {
            this.item = new delivery_model_1.Delivery;
            this.item.Status = shared.OrderStatus.Pending;
            console.log(JSON.stringify(this.item));
        },
        enumerable: true,
        configurable: true
    });
    HomeViewAddComponent.prototype.onSave = function () {
        this.add.emit({
            item: this.item
        });
    };
    return HomeViewAddComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", delivery_model_1.Delivery),
    __metadata("design:paramtypes", [delivery_model_1.Delivery])
], HomeViewAddComponent.prototype, "current", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HomeViewAddComponent.prototype, "add", void 0);
HomeViewAddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "ns-homeView-add",
        templateUrl: "homeView-add.component.html",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [])
], HomeViewAddComponent);
exports.HomeViewAddComponent = HomeViewAddComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctYWRkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVWaWV3LWFkZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZFQUFzRTtBQUN0RSxzQ0FBZ0c7QUFFaEcsMkNBQTZDO0FBUTdDLElBQWEsb0JBQW9CO0lBZTdCO1FBSlUsUUFBRyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBSW5CLENBQUM7SUFYUixzQkFBSSx5Q0FBTztRQUhwQiwwQkFBMEI7UUFDMUIsNEJBQTRCO2FBRW5CLFVBQVksS0FBZTtZQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUkseUJBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztZQUU5QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFRRCxxQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQWxCWTtJQUFSLFlBQUssRUFBRTs4QkFBb0IseUJBQVE7cUNBQVIseUJBQVE7bURBS25DO0FBRVM7SUFBVCxhQUFNLEVBQUU7O2lEQUEwQjtBQVgxQixvQkFBb0I7SUFOaEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07S0FDbEQsQ0FBQzs7R0FDVyxvQkFBb0IsQ0FzQmhDO0FBdEJZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlbGl2ZXJ5IH0gZnJvbSAnLi8uLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2RlbGl2ZXJ5Lm1vZGVsJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBjb21tb24gZnJvbSBcIi4vXCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4uLy4uLy4uLy4uL3NoYXJlZFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcIm5zLWhvbWVWaWV3LWFkZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImhvbWVWaWV3LWFkZC5jb21wb25lbnQuaHRtbFwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVWaWV3QWRkQ29tcG9uZW50IHtcbiAgICAvLyBASW5wdXQoKSBwcm92aWRlcjogYW55O1xuICAgIC8vICBASW5wdXQoKSBpdGVtOiBEZWxpdmVyeTtcblxuICAgIEBJbnB1dCgpIHNldCBjdXJyZW50KHZhbHVlOiBEZWxpdmVyeSkge1xuICAgICAgICB0aGlzLml0ZW0gPSBuZXcgRGVsaXZlcnk7XG4gICAgICAgIHRoaXMuaXRlbS5TdGF0dXMgPSBzaGFyZWQuT3JkZXJTdGF0dXMuUGVuZGluZztcblxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLml0ZW0pKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgYWRkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgaXRlbTogRGVsaXZlcnk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgb25TYXZlKCkge1xuICAgICAgICB0aGlzLmFkZC5lbWl0KHtcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbVxuICAgICAgICB9KTtcbiAgICB9XG59Il19