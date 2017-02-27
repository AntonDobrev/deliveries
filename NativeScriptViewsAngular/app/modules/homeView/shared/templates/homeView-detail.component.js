"use strict";
var core_1 = require("@angular/core");
var delivery_model_1 = require("./../../../../shared/models/delivery.model");
var page_1 = require("ui/page");
var enums_1 = require("../../../../shared/enums");
var HomeViewDetailComponent = (function () {
    function HomeViewDetailComponent(_page) {
        this._page = _page;
        this.navigate = new core_1.EventEmitter();
    }
    Object.defineProperty(HomeViewDetailComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    HomeViewDetailComponent.prototype.ngOnInit = function () {
        this._page.actionBar.title = this.item.DeliveryItem;
        this.itemStatus = enums_1.OrderStatus[this.item.Status];
    };
    HomeViewDetailComponent.prototype.onEdit = function () {
        this.navigate.emit();
    };
    return HomeViewDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HomeViewDetailComponent.prototype, "provider", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", delivery_model_1.Delivery),
    __metadata("design:paramtypes", [delivery_model_1.Delivery])
], HomeViewDetailComponent.prototype, "current", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HomeViewDetailComponent.prototype, "navigate", void 0);
HomeViewDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "ns-homeView-detail",
        templateUrl: "homeView-detail.component.html",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [page_1.Page])
], HomeViewDetailComponent);
exports.HomeViewDetailComponent = HomeViewDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVWaWV3LWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF3RztBQUN4Ryw2RUFBc0U7QUFHdEUsZ0NBQStCO0FBRS9CLGtEQUF1RDtBQVN2RCxJQUFhLHVCQUF1QjtJQWFoQyxpQ0FBb0IsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07UUFOckIsYUFBUSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBTUwsQ0FBQztJQVYzQixzQkFBSSw0Q0FBTzthQUFYLFVBQVksS0FBZTtZQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFTLE1BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBVUQsMENBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNwRCxJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsd0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNMLDhCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXJCWTtJQUFSLFlBQUssRUFBRTs7eURBQWU7QUFDZDtJQUFSLFlBQUssRUFBRTs4QkFBb0IseUJBQVE7cUNBQVIseUJBQVE7c0RBRW5DO0FBRVM7SUFBVCxhQUFNLEVBQUU7O3lEQUErQjtBQVAvQix1QkFBdUI7SUFObkMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07S0FDbEQsQ0FBQztxQ0FjNkIsV0FBSTtHQWJ0Qix1QkFBdUIsQ0F1Qm5DO0FBdkJZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERlbGl2ZXJ5IH0gZnJvbSAnLi8uLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2RlbGl2ZXJ5Lm1vZGVsJztcbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tIFwiLi9cIjtcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5cbmltcG9ydCB7IE9yZGVyU3RhdHVzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NoYXJlZC9lbnVtc1wiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwibnMtaG9tZVZpZXctZGV0YWlsXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaG9tZVZpZXctZGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSG9tZVZpZXdEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgcHJvdmlkZXI6IGFueTtcbiAgICBASW5wdXQoKSBzZXQgY3VycmVudCh2YWx1ZTogRGVsaXZlcnkpIHtcbiAgICAgICAgdGhpcy5pdGVtID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24oe30sIHZhbHVlKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpdGVtOiBEZWxpdmVyeTtcblxuICAgIGl0ZW1TdGF0dXM6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFyLnRpdGxlID0gdGhpcy5pdGVtLkRlbGl2ZXJ5SXRlbTtcbiAgICAgICAgdGhpcy5pdGVtU3RhdHVzID0gT3JkZXJTdGF0dXNbdGhpcy5pdGVtLlN0YXR1c107XG4gICAgfVxuXG4gICAgb25FZGl0KCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRlLmVtaXQoKTtcbiAgICB9XG59Il19