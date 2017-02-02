"use strict";
var core_1 = require("@angular/core");
var HomeViewListComponent = (function () {
    function HomeViewListComponent() {
        this.select = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
    }
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
            selector: "ns-homeView-list",
            templateUrl: "homeView-list.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], HomeViewListComponent);
    return HomeViewListComponent;
}());
exports.HomeViewListComponent = HomeViewListComponent;
//# sourceMappingURL=homeView-list.component.js.map