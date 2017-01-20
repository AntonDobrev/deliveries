"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var enums_1 = require("../enums");
var NavigationService = (function () {
    function NavigationService(_router) {
        this._router = _router;
        this._modes = enums_1.NavigationModes;
        this._mode = this._modes.NONE;
        this._routes = [
            /// start navigation routes
            { path: "homeView", title: "Deliveries", icon: "\uf015" },
        ];
        this._openDrawer$ = new rxjs_1.BehaviorSubject(false);
    }
    Object.defineProperty(NavigationService.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationService.prototype, "routes", {
        get: function () {
            return this._routes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationService.prototype, "openDrawer$", {
        get: function () {
            return this._openDrawer$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NavigationService.prototype.navigateIndex = function () {
        this._router.navigate(["/"]);
    };
    NavigationService.prototype.navigate = function (path) {
        this._router.navigate(["/" + path]);
    };
    NavigationService.prototype.toggleDrawer = function () {
        this._openDrawer$.next(!this._openDrawer$.getValue());
    };
    NavigationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], NavigationService);
    return NavigationService;
}());
exports.NavigationService = NavigationService;
//# sourceMappingURL=navigation.service.js.map