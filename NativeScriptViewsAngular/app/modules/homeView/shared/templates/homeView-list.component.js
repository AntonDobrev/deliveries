"use strict";
var core_1 = require("@angular/core");
var page_1 = require('ui/page');
var HomeViewListComponent = (function () {
    function HomeViewListComponent(_page) {
        this._page = _page;
        this.itemsFailed = [];
        this.itemsPending = [];
        this.itemsDelivered = [];
        this.select = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
    }
    HomeViewListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.actionBar.title = "Delivery Orders";
        this.items.forEach(function (item) {
            switch (item.data.Status) {
                case 1:
                    _this.itemsFailed.push(item);
                    break;
                case 2:
                    _this.itemsPending.push(item);
                    break;
                case 3:
                    _this.itemsDelivered.push(item);
                    break;
                default:
                    break;
            }
        });
        console.log(this.itemsFailed);
    };
    HomeViewListComponent.prototype.onSelect = function (item) {
        this.select.emit({
            item: item
        });
    };
    HomeViewListComponent.prototype.onAdd = function () {
        this.navigate.emit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HomeViewListComponent.prototype, "provider", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HomeViewListComponent.prototype, "items", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HomeViewListComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HomeViewListComponent.prototype, "navigate", void 0);
    HomeViewListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ".main-container",
            templateUrl: "homeView-list.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [page_1.Page])
    ], HomeViewListComponent);
    return HomeViewListComponent;
}());
exports.HomeViewListComponent = HomeViewListComponent;
//# sourceMappingURL=homeView-list.component.js.map