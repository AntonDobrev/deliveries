"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var HomeViewListComponent = (function () {
    function HomeViewListComponent(_page) {
        this._page = _page;
        this.select = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
    }
    HomeViewListComponent.prototype.ngOnInit = function () {
        this._page.actionBar.title = "Delivery Orders";
    };
    HomeViewListComponent.prototype.onSelect = function (item) {
        this.select.emit({
            item: item
        });
    };
    HomeViewListComponent.prototype.onAdd = function () {
        this.navigate.emit();
    };
    return HomeViewListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HomeViewListComponent.prototype, "provider", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HomeViewListComponent.prototype, "items", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HomeViewListComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HomeViewListComponent.prototype, "navigate", void 0);
HomeViewListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: ".main-container",
        templateUrl: "homeView-list.component.html",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [page_1.Page])
], HomeViewListComponent);
exports.HomeViewListComponent = HomeViewListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXdHO0FBQ3hHLGdDQUErQjtBQVcvQixJQUFhLHFCQUFxQjtJQU85QiwrQkFBb0IsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07UUFIckIsV0FBTSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUl4QyxDQUFDO0lBQ0Qsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztJQUNuRCxDQUFDO0lBQ0Qsd0NBQVEsR0FBUixVQUFTLElBQWlCO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2IsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQXJCWTtJQUFSLFlBQUssRUFBRTs7dURBQWU7QUFDZDtJQUFSLFlBQUssRUFBRTs7b0RBQVk7QUFFVjtJQUFULGFBQU0sRUFBRTs7cURBQTZCO0FBQzVCO0lBQVQsYUFBTSxFQUFFOzt1REFBK0I7QUFML0IscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2xELENBQUM7cUNBUTZCLFdBQUk7R0FQdEIscUJBQXFCLENBc0JqQztBQXRCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5cbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tIFwiLi9cIjtcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwiLm1haW4tY29udGFpbmVyXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaG9tZVZpZXctbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVWaWV3TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHJvdmlkZXI6IGFueTtcbiAgICBASW5wdXQoKSBpdGVtczogYW55O1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlKSB7XG5cbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFyLnRpdGxlID0gXCJEZWxpdmVyeSBPcmRlcnNcIjtcbiAgICB9XG4gICAgb25TZWxlY3QoaXRlbTogc2hhcmVkLkl0ZW0pIHtcbiAgICAgICAgdGhpcy5zZWxlY3QuZW1pdCh7XG4gICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uQWRkKCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRlLmVtaXQoKTtcbiAgICB9XG59Il19