"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var platform_1 = require("platform");
var HomeViewListComponent = (function () {
    function HomeViewListComponent(_page) {
        this._page = _page;
        this.select = new core_1.EventEmitter();
    }
    HomeViewListComponent.prototype.ngOnInit = function () {
        this._page.actionBar.title = "Delivery Orders";
    };
    HomeViewListComponent.prototype.onSelect = function (item) {
        this.select.emit({
            item: item
        });
    };
    HomeViewListComponent.prototype.onChange = function (value) {
    };
    HomeViewListComponent.prototype.onClear = function () {
        this.searchPhrase = "";
    };
    HomeViewListComponent.prototype.onSearchBarLoaded = function () {
        if (platform_1.isAndroid) {
            this._searchBar.nativeElement.android.setQuery("", false);
            this._searchBar.nativeElement.android.clearFocus();
            this._searchBar.nativeElement.android.onActionViewCollapsed();
        }
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
    core_1.ViewChild("sb"),
    __metadata("design:type", core_1.ElementRef)
], HomeViewListComponent.prototype, "_searchBar", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQStIO0FBQy9ILGdDQUErQjtBQU0vQixxQ0FBcUM7QUFRckMsSUFBYSxxQkFBcUI7SUFhOUIsK0JBQW9CLEtBQVc7UUFBWCxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBVHJCLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQVd0QyxDQUFDO0lBQ0Qsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztJQUNuRCxDQUFDO0lBQ0Qsd0NBQVEsR0FBUixVQUFTLElBQWlCO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2IsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sd0NBQVEsR0FBZixVQUFnQixLQUFLO0lBQ3JCLENBQUM7SUFFTSx1Q0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLGlEQUFpQixHQUF4QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLG9CQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2xFLENBQUM7SUFDTCxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBdENZO0lBQVIsWUFBSyxFQUFFOzt1REFBZTtBQUNkO0lBQVIsWUFBSyxFQUFFOztvREFBWTtBQUVWO0lBQVQsYUFBTSxFQUFFOztxREFBNkI7QUFFckI7SUFBaEIsZ0JBQVMsQ0FBQyxJQUFJLENBQUM7OEJBQWEsaUJBQVU7eURBQUM7QUFOL0IscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2xELENBQUM7cUNBYzZCLFdBQUk7R0FidEIscUJBQXFCLENBdUNqQztBQXZDWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgRWxlbWVudFJlZiAsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcblxuaW1wb3J0ICogYXMgY29tbW9uIGZyb20gXCIuL1wiO1xuaW1wb3J0ICogYXMgc2hhcmVkIGZyb20gXCIuLi8uLi8uLi8uLi9zaGFyZWRcIjtcblxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcIi5tYWluLWNvbnRhaW5lclwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImhvbWVWaWV3LWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBIb21lVmlld0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHByb3ZpZGVyOiBhbnk7XG4gICAgQElucHV0KCkgaXRlbXM6IGFueTtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKFwic2JcIikgX3NlYXJjaEJhcjogRWxlbWVudFJlZjtcblxuXG5cblxuICAgIHB1YmxpYyBzZWFyY2hQaHJhc2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UpIHtcblxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXIudGl0bGUgPSBcIkRlbGl2ZXJ5IE9yZGVyc1wiO1xuICAgIH1cbiAgICBvblNlbGVjdChpdGVtOiBzaGFyZWQuSXRlbSkge1xuICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2hhbmdlKHZhbHVlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xlYXIoKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUGhyYXNlID0gXCJcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TZWFyY2hCYXJMb2FkZWQoKSB7XG4gICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaEJhci5uYXRpdmVFbGVtZW50LmFuZHJvaWQuc2V0UXVlcnkoXCJcIiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5fc2VhcmNoQmFyLm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hCYXIubmF0aXZlRWxlbWVudC5hbmRyb2lkLm9uQWN0aW9uVmlld0NvbGxhcHNlZCgpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==