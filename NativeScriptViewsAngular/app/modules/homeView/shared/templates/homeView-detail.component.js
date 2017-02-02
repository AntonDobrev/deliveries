"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var HomeViewDetailComponent = (function () {
    function HomeViewDetailComponent() {
        this.navigate = new core_1.EventEmitter();
    }
    Object.defineProperty(HomeViewDetailComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    HomeViewDetailComponent.prototype.onEdit = function () {
        this.navigate.emit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HomeViewDetailComponent.prototype, "provider", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], HomeViewDetailComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HomeViewDetailComponent.prototype, "navigate", void 0);
    HomeViewDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-homeView-detail",
            templateUrl: "homeView-detail.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], HomeViewDetailComponent);
    return HomeViewDetailComponent;
}());
exports.HomeViewDetailComponent = HomeViewDetailComponent;
//# sourceMappingURL=homeView-detail.component.js.map