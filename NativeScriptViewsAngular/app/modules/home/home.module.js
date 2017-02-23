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
    // START_CUSTOM_CODE_home
    // Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
    // END_CUSTOM_CODE_home
    function HomeModule() {
    }
    return HomeModule;
}());
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
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBR3FCO0FBRXJCLDBEQUdxQztBQUVyQyw0REFHa0M7QUFDbEMsbURBR3dCO0FBRXhCLG9EQUdrQztBQUNsQyxzREFHbUM7QUFDbkMsNkJBQTZCO0FBRTdCLGlDQUFtQztBQWdDbkMsSUFBYSxVQUFVO0lBSnZCLHlCQUF5QjtJQUN6QixtS0FBbUs7SUFFbkssdUJBQXVCO0lBQ3ZCO0lBQXlCLENBQUM7SUFBRCxpQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixVQUFVO0lBNUJ2QixlQUFRLENBQUM7UUFDTCxPQUFPLEVBQUU7WUFFTCxpQ0FBd0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLDhCQUE4QjtZQUU5Qiw2QkFBa0I7WUFDbEIsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLHVCQUF1QjtZQUN2Qiw4QkFBYTtTQUNoQjtRQUNELE9BQU8sRUFBRTtZQUNMLGtCQUFrQjtZQUNsQiw4QkFBYTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNQLG9CQUFvQjtZQUNwQixNQUFNLENBQUMsV0FBVztTQUNyQjtLQUNKLENBQUM7R0FNVyxVQUFVLENBQUc7QUFBYixnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgTmdNb2R1bGVcbn1cbmZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7XG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlXG59XG5mcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcblxuaW1wb3J0IHtcbiAgICBTaGFyZWRNb2R1bGVcbn1cbmZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuaW1wb3J0IHtcbiAgICBIb21lQ29tcG9uZW50XG59XG5mcm9tIFwiLi9ob21lLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQge1xuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXG59XG5mcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7XG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXG59XG5mcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG4vLy8gbW9kdWxlIGFkZGl0aW9uYWwgaW1wb3J0c1xuXG5pbXBvcnQgKiBhcyBjb21tb24gZnJvbSBcIi4vc2hhcmVkXCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4uLy4uL3NoYXJlZFwiO1xuXG5AXG5OZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIC8vLyBtb2R1bGUgaW1wb3J0cyBkZWNsYXJhdGlvblxuXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgLy8vIG1vZHVsZSBkZWNsYXJhdGlvbnNcbiAgICAgICAgSG9tZUNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICAvLy8gbW9kdWxlIGV4cG9ydHNcbiAgICAgICAgSG9tZUNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC8vLyBtb2R1bGUgcHJvdmlkZXJzXG4gICAgICAgIGNvbW1vbi5Ib21lU2VydmljZVxuICAgIF1cbn0pXG5cbi8vIFNUQVJUX0NVU1RPTV9DT0RFX2hvbWVcbi8vIEFkZCBjdXN0b20gY29kZSBoZXJlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBjdXN0b20gY29kZSwgc2VlIGh0dHA6Ly9kb2NzLnRlbGVyaWsuY29tL3BsYXRmb3JtL3NjcmVlbmJ1aWxkZXIvdHJvdWJsZXNob290aW5nL2hvdy10by1rZWVwLWN1c3RvbS1jb2RlLWNoYW5nZXNcblxuLy8gRU5EX0NVU1RPTV9DT0RFX2hvbWVcbmV4cG9ydCBjbGFzcyBIb21lTW9kdWxlIHt9Il19