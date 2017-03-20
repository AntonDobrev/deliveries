"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var homeView_component_1 = require("./homeView.component");
var nativescript_angular_1 = require("nativescript-angular");
var forms_1 = require("nativescript-angular/forms");
/// module additional imports
var common = require("./shared");
var HomeViewModule = (function () {
    // START_CUSTOM_CODE_homeView
    // Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
    // END_CUSTOM_CODE_homeView
    function HomeViewModule() {
    }
    return HomeViewModule;
}());
HomeViewModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_angular_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            /// module imports declaration
            platform_1.NativeScriptModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            common.HomeViewListComponent,
            common.HomeViewDetailComponent,
            common.HomeViewAddComponent,
            common.HomeViewEditComponent,
            /// module declarations
            homeView_component_1.HomeViewComponent
        ],
        exports: [
            common.HomeViewListComponent,
            common.HomeViewDetailComponent,
            common.HomeViewAddComponent,
            common.HomeViewEditComponent,
            /// module exports
            homeView_component_1.HomeViewComponent
        ],
        providers: [
            common.HomeViewStore,
            /// module providers
            common.HomeViewService
        ]
    })
], HomeViewModule);
exports.HomeViewModule = HomeViewModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZVZpZXcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FHcUI7QUFFckIsMERBR3FDO0FBRXJDLDREQUdrQztBQUNsQywyREFHNEI7QUFFNUIsNkRBRzRCO0FBQzVCLG9EQUdrQztBQUNsQyw2QkFBNkI7QUFFN0IsaUNBQW1DO0FBb0RuQyxJQUFhLGNBQWM7SUFKM0IsNkJBQTZCO0lBQzdCLG1LQUFtSztJQUVuSywyQkFBMkI7SUFDM0I7SUFBNkIsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQUE5QixJQUE4QjtBQUFqQixjQUFjO0lBakQxQixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFFTCwrQ0FBd0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLDhCQUE4QjtZQUU5Qiw2QkFBa0I7WUFDbEIsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUVWLE1BQU0sQ0FBQyxxQkFBcUI7WUFDNUIsTUFBTSxDQUFDLHVCQUF1QjtZQUU5QixNQUFNLENBQUMsb0JBQW9CO1lBRTNCLE1BQU0sQ0FBQyxxQkFBcUI7WUFFNUIsdUJBQXVCO1lBRXZCLHNDQUFpQjtTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUVMLE1BQU0sQ0FBQyxxQkFBcUI7WUFDNUIsTUFBTSxDQUFDLHVCQUF1QjtZQUU5QixNQUFNLENBQUMsb0JBQW9CO1lBRTNCLE1BQU0sQ0FBQyxxQkFBcUI7WUFFNUIsa0JBQWtCO1lBRWxCLHNDQUFpQjtTQUNwQjtRQUNELFNBQVMsRUFBRTtZQUVQLE1BQU0sQ0FBQyxhQUFhO1lBQ3BCLG9CQUFvQjtZQUVwQixNQUFNLENBQUMsZUFBZTtTQUN6QjtLQUNKLENBQUM7R0FNVyxjQUFjLENBQUc7QUFBakIsd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIE5nTW9kdWxlXG59XG5mcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQge1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZVxufVxuZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3BsYXRmb3JtXCI7XG5cbmltcG9ydCB7XG4gICAgU2hhcmVkTW9kdWxlXG59XG5mcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcbmltcG9ydCB7XG4gICAgSG9tZVZpZXdDb21wb25lbnRcbn1cbmZyb20gXCIuL2hvbWVWaWV3LmNvbXBvbmVudFwiO1xuXG5pbXBvcnQge1xuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZVxufVxuZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQge1xuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXG59XG5mcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbi8vLyBtb2R1bGUgYWRkaXRpb25hbCBpbXBvcnRzXG5cbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tIFwiLi9zaGFyZWRcIjtcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIC8vLyBtb2R1bGUgaW1wb3J0cyBkZWNsYXJhdGlvblxuXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcblxuICAgICAgICBjb21tb24uSG9tZVZpZXdMaXN0Q29tcG9uZW50LFxuICAgICAgICBjb21tb24uSG9tZVZpZXdEZXRhaWxDb21wb25lbnQsXG5cbiAgICAgICAgY29tbW9uLkhvbWVWaWV3QWRkQ29tcG9uZW50LFxuXG4gICAgICAgIGNvbW1vbi5Ib21lVmlld0VkaXRDb21wb25lbnQsXG5cbiAgICAgICAgLy8vIG1vZHVsZSBkZWNsYXJhdGlvbnNcblxuICAgICAgICBIb21lVmlld0NvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuXG4gICAgICAgIGNvbW1vbi5Ib21lVmlld0xpc3RDb21wb25lbnQsXG4gICAgICAgIGNvbW1vbi5Ib21lVmlld0RldGFpbENvbXBvbmVudCxcblxuICAgICAgICBjb21tb24uSG9tZVZpZXdBZGRDb21wb25lbnQsXG5cbiAgICAgICAgY29tbW9uLkhvbWVWaWV3RWRpdENvbXBvbmVudCxcblxuICAgICAgICAvLy8gbW9kdWxlIGV4cG9ydHNcblxuICAgICAgICBIb21lVmlld0NvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG5cbiAgICAgICAgY29tbW9uLkhvbWVWaWV3U3RvcmUsXG4gICAgICAgIC8vLyBtb2R1bGUgcHJvdmlkZXJzXG5cbiAgICAgICAgY29tbW9uLkhvbWVWaWV3U2VydmljZVxuICAgIF1cbn0pXG5cbi8vIFNUQVJUX0NVU1RPTV9DT0RFX2hvbWVWaWV3XG4vLyBBZGQgY3VzdG9tIGNvZGUgaGVyZS4gRm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgY3VzdG9tIGNvZGUsIHNlZSBodHRwOi8vZG9jcy50ZWxlcmlrLmNvbS9wbGF0Zm9ybS9zY3JlZW5idWlsZGVyL3Ryb3VibGVzaG9vdGluZy9ob3ctdG8ta2VlcC1jdXN0b20tY29kZS1jaGFuZ2VzXG5cbi8vIEVORF9DVVNUT01fQ09ERV9ob21lVmlld1xuZXhwb3J0IGNsYXNzIEhvbWVWaWV3TW9kdWxlIHt9Il19