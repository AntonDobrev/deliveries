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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctYWRkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVWaWV3LWFkZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZFQUFzRTtBQUN0RSxzQ0FBZ0c7QUFFaEcsMkNBQTZDO0FBUTdDLElBQWEsb0JBQW9CO0lBYTdCO1FBSlUsUUFBRyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBSW5CLENBQUM7SUFUUixzQkFBSSx5Q0FBTztRQUhwQiwwQkFBMEI7UUFDMUIsNEJBQTRCO2FBRW5CLFVBQVksS0FBZTtZQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUkseUJBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQUNsRCxDQUFDOzs7T0FBQTtJQVFELHFDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBaEJZO0lBQVIsWUFBSyxFQUFFOzhCQUFvQix5QkFBUTtxQ0FBUix5QkFBUTttREFHbkM7QUFFUztJQUFULGFBQU0sRUFBRTs7aURBQTBCO0FBVDFCLG9CQUFvQjtJQU5oQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtLQUNsRCxDQUFDOztHQUNXLG9CQUFvQixDQW9CaEM7QUFwQlksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVsaXZlcnkgfSBmcm9tICcuLy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZGVsaXZlcnkubW9kZWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tIFwiLi9cIjtcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwibnMtaG9tZVZpZXctYWRkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaG9tZVZpZXctYWRkLmNvbXBvbmVudC5odG1sXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSG9tZVZpZXdBZGRDb21wb25lbnQge1xuICAgIC8vIEBJbnB1dCgpIHByb3ZpZGVyOiBhbnk7XG4gICAgLy8gIEBJbnB1dCgpIGl0ZW06IERlbGl2ZXJ5O1xuXG4gICAgQElucHV0KCkgc2V0IGN1cnJlbnQodmFsdWU6IERlbGl2ZXJ5KSB7XG4gICAgICAgIHRoaXMuaXRlbSA9IG5ldyBEZWxpdmVyeTtcbiAgICAgICAgdGhpcy5pdGVtLlN0YXR1cyA9IHNoYXJlZC5PcmRlclN0YXR1cy5QZW5kaW5nO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBhZGQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpdGVtOiBEZWxpdmVyeTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBvblNhdmUoKSB7XG4gICAgICAgIHRoaXMuYWRkLmVtaXQoe1xuICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtXG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=