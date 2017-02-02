"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var forms_1 = require("nativescript-angular/forms");
var common = require("./");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                /// additional declarations
                common.ActionBarComponent,
                common.IfAndroidDirective,
                common.IfIosDirective,
                common.HyperlinkDirective
            ],
            exports: [
                /// additional exports
                common.ActionBarComponent,
                common.IfAndroidDirective,
                common.IfIosDirective,
                common.HyperlinkDirective
            ],
            providers: [
                /// start additional data provider services
                common.backendServicesService,
                /// end additional data provider services
                common.NavigationService,
                common.NotificationService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map