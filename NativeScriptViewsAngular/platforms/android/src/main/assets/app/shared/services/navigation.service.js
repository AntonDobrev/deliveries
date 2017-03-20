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
            { path: "homeView", title: "Delivery Orders", icon: "\uf015" },
            { path: "home", title: "Deliveries Home", icon: "\uf015" },
            { path: "aboutView", title: "About this app", icon: "\uf015" },
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
    return NavigationService;
}());
NavigationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], NavigationService);
exports.NavigationService = NavigationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FHcUI7QUFDckIsMENBR3VCO0FBRXZCLDZCQUdZO0FBRVosa0NBR2dCO0FBUWhCLElBQWEsaUJBQWlCO0lBTzFCLDJCQUNZLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBUG5CLFdBQU0sR0FBRyx1QkFBZSxDQUFDO1FBUzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLDJCQUEyQjtZQUN6QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDekUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQzFELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtTQUV4RCxDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHNCQUFlLENBQWMsS0FBSyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELHNCQUFJLG1DQUFJO2FBQVI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHFDQUFNO2FBQVY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBDQUFXO2FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQUVELHlDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELG9DQUFRLEdBQVIsVUFBUyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHdDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBN0NELElBNkNDO0FBN0NZLGlCQUFpQjtJQUQ5QixpQkFBVSxFQUFFO3FDQVNhLGVBQU07R0FSbEIsaUJBQWlCLENBNkM3QjtBQTdDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEluamVjdGFibGVcbn1cbmZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIFJvdXRlclxufVxuZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQge1xuICAgIEJlaGF2aW9yU3ViamVjdFxufVxuZnJvbSBcInJ4anNcIjtcblxuaW1wb3J0IHtcbiAgICBOYXZpZ2F0aW9uTW9kZXNcbn1cbmZyb20gXCIuLi9lbnVtc1wiO1xuaW1wb3J0IHtcbiAgICBOYXZpZ2F0aW9uSXRlbVxufVxuZnJvbSBcIi4uL21vZGVsc1wiO1xuXG5AXG5JbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU2VydmljZSB7XG4gICAgcHJpdmF0ZSBfbW9kZXMgPSBOYXZpZ2F0aW9uTW9kZXM7XG4gICAgcHJpdmF0ZSBfbW9kZTogTmF2aWdhdGlvbk1vZGVzO1xuICAgIHByaXZhdGUgX3JvdXRlczogTmF2aWdhdGlvbkl0ZW1bXTtcblxuICAgIHByaXZhdGUgX29wZW5EcmF3ZXIkOiBCZWhhdmlvclN1YmplY3QgPCBib29sZWFuID4gO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX21vZGUgPSB0aGlzLl9tb2Rlcy5OT05FO1xuICAgICAgICB0aGlzLl9yb3V0ZXMgPSBbXG4gICAgICAgICAgICAvLy8gc3RhcnQgbmF2aWdhdGlvbiByb3V0ZXNcbiAgICAgICAgICAgXHRcdFx0eyBwYXRoOiBcImhvbWVWaWV3XCIsIHRpdGxlOiBcIkRlbGl2ZXJ5IE9yZGVyc1wiLCBpY29uOiBcIlxcdWYwMTVcIiB9LFxuXHRcdFx0eyBwYXRoOiBcImhvbWVcIiwgdGl0bGU6IFwiRGVsaXZlcmllcyBIb21lXCIsIGljb246IFwiXFx1ZjAxNVwiIH0sXG5cdFx0XHR7IHBhdGg6IFwiYWJvdXRWaWV3XCIsIHRpdGxlOiBcIkFib3V0IHRoaXMgYXBwXCIsIGljb246IFwiXFx1ZjAxNVwiIH0sXG4gLy8vIGVuZCBuYXZpZ2F0aW9uIHJvdXRlc1xuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX29wZW5EcmF3ZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdCA8IGJvb2xlYW4gPiAoZmFsc2UpO1xuICAgIH1cblxuICAgIGdldCBtb2RlKCk6IE5hdmlnYXRpb25Nb2RlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICAgIH1cblxuICAgIGdldCByb3V0ZXMoKTogTmF2aWdhdGlvbkl0ZW1bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXM7XG4gICAgfVxuXG4gICAgZ2V0IG9wZW5EcmF3ZXIkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbkRyYXdlciQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgbmF2aWdhdGVJbmRleCgpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcIi9cIl0pO1xuICAgIH1cblxuICAgIG5hdmlnYXRlKHBhdGg6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL1wiICsgcGF0aF0pO1xuICAgIH1cblxuICAgIHRvZ2dsZURyYXdlcigpIHtcbiAgICAgICAgdGhpcy5fb3BlbkRyYXdlciQubmV4dCghdGhpcy5fb3BlbkRyYXdlciQuZ2V0VmFsdWUoKSk7XG4gICAgfVxufSJdfQ==