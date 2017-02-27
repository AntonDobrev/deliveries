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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esc0NBQStIO0FBQy9ILGdDQUErQjtBQU0vQixxQ0FBcUM7QUFRckMsSUFBYSxxQkFBcUI7SUFXOUIsK0JBQW9CLEtBQVc7UUFBWCxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBUHJCLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQVN0QyxDQUFDO0lBQ0Qsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztJQUNuRCxDQUFDO0lBQ0Qsd0NBQVEsR0FBUixVQUFTLElBQWM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx3Q0FBUSxHQUFmLFVBQWdCLEtBQUs7SUFDckIsQ0FBQztJQUVNLHVDQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0saURBQWlCLEdBQXhCO1FBQ0ksRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDbEUsQ0FBQztJQUNMLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFyQ0QsSUFxQ0M7QUFwQ1k7SUFBUixZQUFLLEVBQUU7O3VEQUFlO0FBQ2Q7SUFBUixZQUFLLEVBQUU7O29EQUFZO0FBRVY7SUFBVCxhQUFNLEVBQUU7O3FEQUE2QjtBQUVyQjtJQUFoQixnQkFBUyxDQUFDLElBQUksQ0FBQzs4QkFBYSxpQkFBVTt5REFBQztBQU4vQixxQkFBcUI7SUFOakMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07S0FDbEQsQ0FBQztxQ0FZNkIsV0FBSTtHQVh0QixxQkFBcUIsQ0FxQ2pDO0FBckNZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlbGl2ZXJ5IH0gZnJvbSAnLi8uLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2RlbGl2ZXJ5Lm1vZGVsJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBFbGVtZW50UmVmICwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuXG5pbXBvcnQgKiBhcyBjb21tb24gZnJvbSBcIi4vXCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4uLy4uLy4uLy4uL3NoYXJlZFwiO1xuXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwiLm1haW4tY29udGFpbmVyXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaG9tZVZpZXctbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVWaWV3TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHJvdmlkZXI6IGFueTtcbiAgICBASW5wdXQoKSBpdGVtczogYW55O1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoXCJzYlwiKSBfc2VhcmNoQmFyOiBFbGVtZW50UmVmO1xuXG5cbiAgICBwdWJsaWMgc2VhcmNoUGhyYXNlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlKSB7XG5cbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFyLnRpdGxlID0gXCJEZWxpdmVyeSBPcmRlcnNcIjtcbiAgICB9XG4gICAgb25TZWxlY3QoaXRlbTogRGVsaXZlcnkpIHtcbiAgICAgICAgdGhpcy5zZWxlY3QuZW1pdCh7XG4gICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNoYW5nZSh2YWx1ZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsZWFyKCkge1xuICAgICAgICB0aGlzLnNlYXJjaFBocmFzZSA9IFwiXCI7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2VhcmNoQmFyTG9hZGVkKCkge1xuICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hCYXIubmF0aXZlRWxlbWVudC5hbmRyb2lkLnNldFF1ZXJ5KFwiXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaEJhci5uYXRpdmVFbGVtZW50LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5fc2VhcmNoQmFyLm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5vbkFjdGlvblZpZXdDb2xsYXBzZWQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=