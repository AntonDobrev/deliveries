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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctYWRkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVWaWV3LWFkZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUdxQjtBQUdyQiwyQ0FBNkM7QUFTN0MsSUFBYSxvQkFBb0I7SUFZN0I7UUFKUyxRQUFHLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFJbkIsQ0FBQztJQVZSLHNCQUFJLHlDQUFPO2FBQVgsVUFBWSxLQUFrQjtZQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFhLE1BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQUN2RCxDQUFDOzs7T0FBQTtJQVNELG9DQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbEJXO0lBQVIsWUFBSyxFQUFFOztzREFBZTtBQUNkO0lBQVIsWUFBSyxFQUFFOzs7bURBR047QUFHUTtJQUFULGFBQU0sRUFBRTs7aURBQTBCO0FBUnpCLG9CQUFvQjtJQU5qQyxnQkFBUyxDQUFDO1FBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtLQUNsRCxDQUFDOztHQUNXLG9CQUFvQixDQW1CaEM7QUFuQlksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJcbn1cbmZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tIFwiLi9cIjtcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkXCI7XG5cbkBcbkNvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogXCJucy1ob21lVmlldy1hZGRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJob21lVmlldy1hZGQuY29tcG9uZW50Lmh0bWxcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBIb21lVmlld0FkZENvbXBvbmVudCB7QFxuICAgIElucHV0KCkgcHJvdmlkZXI6IGFueTtAXG4gICAgSW5wdXQoKSBzZXQgY3VycmVudCh2YWx1ZTogc2hhcmVkLkl0ZW0pIHtcbiAgICAgICAgdGhpcy5pdGVtID0gKCA8IGFueSA+IE9iamVjdCkuYXNzaWduKHt9LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuaXRlbS5kYXRhLlN0YXR1cyA9IHNoYXJlZC5PcmRlclN0YXR1cy5QZW5kaW5nO1xuICAgIH1cblxuICAgIEBcbiAgICBPdXRwdXQoKSBhZGQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpdGVtOiBzaGFyZWQuSXRlbTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIG9uQWRkKCkge1xuICAgICAgICB0aGlzLmFkZC5lbWl0KHtcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbVxuICAgICAgICB9KTtcbiAgICB9XG59Il19