"use strict";
var delivery_model_1 = require("./../../../../shared/models/delivery.model");
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var HomeViewAddComponent = (function () {
    function HomeViewAddComponent() {
        this.add = new core_1.EventEmitter();
    }
    Object.defineProperty(HomeViewAddComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
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
    __metadata("design:type", Object)
], HomeViewAddComponent.prototype, "provider", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctYWRkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVWaWV3LWFkZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZFQUFzRTtBQUN0RSxzQ0FBZ0c7QUFFaEcsMkNBQTZDO0FBUTdDLElBQWEsb0JBQW9CO0lBVzdCO1FBSlUsUUFBRyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBSW5CLENBQUM7SUFUUixzQkFBSSx5Q0FBTzthQUFYLFVBQVksS0FBZTtZQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFTLE1BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBUUQscUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFqQlk7SUFBUixZQUFLLEVBQUU7O3NEQUFlO0FBQ2Q7SUFBUixZQUFLLEVBQUU7OEJBQW9CLHlCQUFRO3FDQUFSLHlCQUFRO21EQUduQztBQUVTO0lBQVQsYUFBTSxFQUFFOztpREFBMEI7QUFQMUIsb0JBQW9CO0lBTmhDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2xELENBQUM7O0dBQ1csb0JBQW9CLENBa0JoQztBQWxCWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWxpdmVyeSB9IGZyb20gJy4vLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9kZWxpdmVyeS5tb2RlbCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgY29tbW9uIGZyb20gXCIuL1wiO1xuaW1wb3J0ICogYXMgc2hhcmVkIGZyb20gXCIuLi8uLi8uLi8uLi9zaGFyZWRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogXCJucy1ob21lVmlldy1hZGRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJob21lVmlldy1hZGQuY29tcG9uZW50Lmh0bWxcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBIb21lVmlld0FkZENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgcHJvdmlkZXI6IGFueTtcbiAgICBASW5wdXQoKSBzZXQgY3VycmVudCh2YWx1ZTogRGVsaXZlcnkpIHtcbiAgICAgICAgdGhpcy5pdGVtID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24oe30sIHZhbHVlKTtcbiAgICAgICAgdGhpcy5pdGVtLlN0YXR1cyA9IHNoYXJlZC5PcmRlclN0YXR1cy5QZW5kaW5nO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBhZGQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpdGVtOiBEZWxpdmVyeTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBvblNhdmUoKSB7XG4gICAgICAgIHRoaXMuYWRkLmVtaXQoe1xuICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtXG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=