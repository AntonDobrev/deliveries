"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var page_1 = require("ui/page");
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
        this._page.actionBar.title = this.item.data.DeliveryItem;
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
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVWaWV3LWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF3RztBQUV4RywyQ0FBNkM7QUFDN0MsZ0NBQStCO0FBWS9CLElBQWEsdUJBQXVCO0lBV2hDLGlDQUFvQixLQUFXO1FBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUpyQixhQUFRLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFJTCxDQUFDO0lBUjNCLHNCQUFJLDRDQUFPO2FBQVgsVUFBWSxLQUFrQjtZQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFTLE1BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBUUQsMENBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0QsQ0FBQztJQUVELHdDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDTCw4QkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFsQlk7SUFBUixZQUFLLEVBQUU7O3lEQUFlO0FBQ2Q7SUFBUixZQUFLLEVBQUU7OztzREFFUDtBQUVTO0lBQVQsYUFBTSxFQUFFOzt5REFBK0I7QUFQL0IsdUJBQXVCO0lBTm5DLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2xELENBQUM7cUNBWTZCLFdBQUk7R0FYdEIsdUJBQXVCLENBb0JuQztBQXBCWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBjb21tb24gZnJvbSBcIi4vXCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4uLy4uLy4uLy4uL3NoYXJlZFwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuXG5cblxuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwibnMtaG9tZVZpZXctZGV0YWlsXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaG9tZVZpZXctZGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSG9tZVZpZXdEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgcHJvdmlkZXI6IGFueTtcbiAgICBASW5wdXQoKSBzZXQgY3VycmVudCh2YWx1ZTogc2hhcmVkLkl0ZW0pIHtcbiAgICAgICAgdGhpcy5pdGVtID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24oe30sIHZhbHVlKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpdGVtOiBzaGFyZWQuSXRlbTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFyLnRpdGxlID0gdGhpcy5pdGVtLmRhdGEuRGVsaXZlcnlJdGVtO1xuICAgIH1cblxuICAgIG9uRWRpdCgpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZS5lbWl0KCk7XG4gICAgfVxufSJdfQ==