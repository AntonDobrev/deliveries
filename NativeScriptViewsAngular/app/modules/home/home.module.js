"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var home_component_1 = require("./home.component");
var forms_1 = require("nativescript-angular/forms");
var router_1 = require("nativescript-angular/router");
/// module additional imports
var common = require("./shared");
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.NativeScriptRouterModule,
                forms_1.NativeScriptFormsModule,
                /// module imports declaration
                platform_1.NativeScriptModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                /// module declarations
                home_component_1.HomeComponent
            ],
            exports: [
                /// module exports
                home_component_1.HomeComponent
            ],
            providers: [
                /// module providers
                common.HomeService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map