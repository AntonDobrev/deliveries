"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var HomeViewEditComponent = (function () {
    function HomeViewEditComponent() {
        this.update = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
    }
    Object.defineProperty(HomeViewEditComponent.prototype, "current", {
        set: function (value) {
            this.item = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    HomeViewEditComponent.prototype.onUpdate = function () {
        this.update.emit({
            item: this.item
        });
    };
    HomeViewEditComponent.prototype.onDelete = function () {
        this.delete.emit({
            item: this.item
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], HomeViewEditComponent.prototype, "current", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HomeViewEditComponent.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HomeViewEditComponent.prototype, "delete", void 0);
    HomeViewEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-homeView-edit",
            templateUrl: "homeView-edit.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], HomeViewEditComponent);
    return HomeViewEditComponent;
}());
exports.HomeViewEditComponent = HomeViewEditComponent;
//# sourceMappingURL=homeView-edit.component.js.map