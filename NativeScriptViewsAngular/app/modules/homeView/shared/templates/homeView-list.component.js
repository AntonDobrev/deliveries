"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXctbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXdHO0FBQ3hHLGdDQUErQjtBQVcvQixJQUFhLHFCQUFxQjtJQU05QiwrQkFBb0IsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07UUFGckIsV0FBTSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBSXRDLENBQUM7SUFDRCx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO0lBQ25ELENBQUM7SUFDRCx3Q0FBUSxHQUFSLFVBQVMsSUFBaUI7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFoQlk7SUFBUixZQUFLLEVBQUU7O3VEQUFlO0FBQ2Q7SUFBUixZQUFLLEVBQUU7O29EQUFZO0FBRVY7SUFBVCxhQUFNLEVBQUU7O3FEQUE2QjtBQUo3QixxQkFBcUI7SUFOakMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07S0FDbEQsQ0FBQztxQ0FPNkIsV0FBSTtHQU50QixxQkFBcUIsQ0FpQmpDO0FBakJZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcblxuaW1wb3J0ICogYXMgY29tbW9uIGZyb20gXCIuL1wiO1xuaW1wb3J0ICogYXMgc2hhcmVkIGZyb20gXCIuLi8uLi8uLi8uLi9zaGFyZWRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogXCIubWFpbi1jb250YWluZXJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJob21lVmlldy1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSG9tZVZpZXdMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwcm92aWRlcjogYW55O1xuICAgIEBJbnB1dCgpIGl0ZW1zOiBhbnk7XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSkge1xuXG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9wYWdlLmFjdGlvbkJhci50aXRsZSA9IFwiRGVsaXZlcnkgT3JkZXJzXCI7XG4gICAgfVxuICAgIG9uU2VsZWN0KGl0ZW06IHNoYXJlZC5JdGVtKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xuICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICB9KTtcbiAgICB9XG59Il19