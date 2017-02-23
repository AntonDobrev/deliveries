"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var router_1 = require("nativescript-angular/router");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
var homeView_module_1 = require("./modules/homeView/homeView.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forRoot(app_routes_1.appRoutes),
            homeView_module_1.HomeViewModule
        ],
        declarations: [
            app_component_1.AppComponent
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF5QztBQUN6QywwREFBbUU7QUFDbkUsc0RBQXVFO0FBQ3ZFLDJDQUF5QztBQUN6QyxpREFBK0M7QUFDL0Msc0VBQXdGO0FBZ0J4RixJQUFhLFNBQVM7SUFBdEI7SUFDQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBREQsSUFDQztBQURZLFNBQVM7SUFkckIsZUFBUSxDQUFDO1FBQ1QsT0FBTyxFQUFFO1lBQ1IsNkJBQWtCO1lBQ2xCLGlDQUF3QjtZQUN4QixpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsc0JBQVMsQ0FBQztZQUMzQyxnQ0FBZ0I7U0FDaEI7UUFDRCxZQUFZLEVBQUU7WUFDYiw0QkFBWTtTQUNaO1FBQ0QsU0FBUyxFQUFFO1lBQ1YsNEJBQVk7U0FDWjtLQUNELENBQUM7R0FDVyxTQUFTLENBQ3JCO0FBRFksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IGFwcFJvdXRlcyB9IGZyb20gXCIuL2FwcC5yb3V0ZXNcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEhvbWVWaWV3TW9kdWxlIGFzIE5hdmlnYXRpb25Nb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL2hvbWVWaWV3L2hvbWVWaWV3Lm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBbXG5cdFx0TmF0aXZlU2NyaXB0TW9kdWxlLFxuXHRcdE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcblx0XHROYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChhcHBSb3V0ZXMpLFxuXHRcdE5hdmlnYXRpb25Nb2R1bGVcblx0XSxcblx0ZGVjbGFyYXRpb25zOiBbXG5cdFx0QXBwQ29tcG9uZW50XG5cdF0sXG5cdGJvb3RzdHJhcDogW1xuXHRcdEFwcENvbXBvbmVudFxuXHRdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7XG59Il19