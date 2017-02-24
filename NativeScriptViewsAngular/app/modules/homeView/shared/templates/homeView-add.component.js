"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var HomeViewAddComponent = (function () {
    function HomeViewAddComponent() {
        this.add = new core_1.EventEmitter();
    }
    Object.defineProperty(HomeViewAddComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
            this.item.data.Status = shared.OrderStatus.Pending;
        },
        enumerable: true,
        configurable: true
    });
    HomeViewAddComponent.prototype.onAdd = function () {
        this.add.emit({
            item: this.item
        });
    };
    return HomeViewAddComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HomeViewAddComponent.prototype, "provider", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctYWRkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVWaWV3LWFkZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFnRztBQUVoRywyQ0FBNkM7QUFRN0MsSUFBYSxvQkFBb0I7SUFXN0I7UUFKVSxRQUFHLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFJbkIsQ0FBQztJQVRSLHNCQUFJLHlDQUFPO2FBQVgsVUFBWSxLQUFrQjtZQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFTLE1BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQUN2RCxDQUFDOzs7T0FBQTtJQVFELG9DQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDO0FBakJZO0lBQVIsWUFBSyxFQUFFOztzREFBZTtBQUNkO0lBQVIsWUFBSyxFQUFFOzs7bURBR1A7QUFFUztJQUFULGFBQU0sRUFBRTs7aURBQTBCO0FBUDFCLG9CQUFvQjtJQU5oQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtLQUNsRCxDQUFDOztHQUNXLG9CQUFvQixDQWtCaEM7QUFsQlksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tIFwiLi9cIjtcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwibnMtaG9tZVZpZXctYWRkXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaG9tZVZpZXctYWRkLmNvbXBvbmVudC5odG1sXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSG9tZVZpZXdBZGRDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHByb3ZpZGVyOiBhbnk7XG4gICAgQElucHV0KCkgc2V0IGN1cnJlbnQodmFsdWU6IHNoYXJlZC5JdGVtKSB7XG4gICAgICAgIHRoaXMuaXRlbSA9ICg8YW55Pk9iamVjdCkuYXNzaWduKHt9LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuaXRlbS5kYXRhLlN0YXR1cyA9IHNoYXJlZC5PcmRlclN0YXR1cy5QZW5kaW5nO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBhZGQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpdGVtOiBzaGFyZWQuSXRlbTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBvbkFkZCgpIHtcbiAgICAgICAgdGhpcy5hZGQuZW1pdCh7XG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==