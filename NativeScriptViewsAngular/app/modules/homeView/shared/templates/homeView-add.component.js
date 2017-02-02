"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var HomeViewAddComponent = (function () {
    function HomeViewAddComponent() {
        this.add = new core_1.EventEmitter();
    }
    Object.defineProperty(HomeViewAddComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    HomeViewAddComponent.prototype.onAdd = function () {
        this.add.emit({
            item: this.item
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HomeViewAddComponent.prototype, "provider", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], HomeViewAddComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HomeViewAddComponent.prototype, "add", void 0);
    HomeViewAddComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-homeView-add",
            templateUrl: "homeView-add.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], HomeViewAddComponent);
    return HomeViewAddComponent;
}());
exports.HomeViewAddComponent = HomeViewAddComponent;
//# sourceMappingURL=homeView-add.component.js.map