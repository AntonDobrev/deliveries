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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctYWRkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVWaWV3LWFkZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUdxQjtBQUdyQiwyQ0FBNkM7QUFTN0MsSUFBYSxvQkFBb0I7SUFXN0I7UUFKUyxRQUFHLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFJbkIsQ0FBQztJQVRSLHNCQUFJLHlDQUFPO2FBQVgsVUFBWSxLQUFrQjtZQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFhLE1BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUM7OztPQUFBO0lBU0Qsb0NBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFqQlc7SUFBUixZQUFLLEVBQUU7O3NEQUFlO0FBQ2Q7SUFBUixZQUFLLEVBQUU7OzttREFFTjtBQUdRO0lBQVQsYUFBTSxFQUFFOztpREFBMEI7QUFQekIsb0JBQW9CO0lBTmpDLGdCQUFTLENBQUM7UUFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2xELENBQUM7O0dBQ1csb0JBQW9CLENBa0JoQztBQWxCWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlclxufVxuZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0ICogYXMgY29tbW9uIGZyb20gXCIuL1wiO1xuaW1wb3J0ICogYXMgc2hhcmVkIGZyb20gXCIuLi8uLi8uLi8uLi9zaGFyZWRcIjtcblxuQFxuQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcIm5zLWhvbWVWaWV3LWFkZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImhvbWVWaWV3LWFkZC5jb21wb25lbnQuaHRtbFwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVWaWV3QWRkQ29tcG9uZW50IHtAXG4gICAgSW5wdXQoKSBwcm92aWRlcjogYW55O0BcbiAgICBJbnB1dCgpIHNldCBjdXJyZW50KHZhbHVlOiBzaGFyZWQuSXRlbSkge1xuICAgICAgICB0aGlzLml0ZW0gPSAoIDwgYW55ID4gT2JqZWN0KS5hc3NpZ24oe30sIHZhbHVlKTtcbiAgICB9XG5cbiAgICBAXG4gICAgT3V0cHV0KCkgYWRkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgaXRlbTogc2hhcmVkLkl0ZW07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBvbkFkZCgpIHtcbiAgICAgICAgdGhpcy5hZGQuZW1pdCh7XG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==