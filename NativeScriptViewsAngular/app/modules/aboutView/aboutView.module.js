"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var aboutView_component_1 = require("./aboutView.component");
/// module additional imports
var common = require("./shared");
var AboutViewModule = (function () {
    // START_CUSTOM_CODE_aboutView
    // Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
    // END_CUSTOM_CODE_aboutView
    function AboutViewModule() {
    }
    return AboutViewModule;
}());
AboutViewModule = __decorate([
    core_1.NgModule({
        imports: [
            /// module imports declaration
            platform_1.NativeScriptModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            /// module declarations
            aboutView_component_1.AboutViewComponent
        ],
        exports: [
            /// module exports
            aboutView_component_1.AboutViewComponent
        ],
        providers: [
            /// module providers
            common.AboutViewService
        ]
    })
], AboutViewModule);
exports.AboutViewModule = AboutViewModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXRWaWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFib3V0Vmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUdxQjtBQUVyQiwwREFHcUM7QUFFckMsNERBR2tDO0FBQ2xDLDZEQUc2QjtBQUM3Qiw2QkFBNkI7QUFFN0IsaUNBQW1DO0FBNEJuQyxJQUFhLGVBQWU7SUFKNUIsOEJBQThCO0lBQzlCLG1LQUFtSztJQUVuSyw0QkFBNEI7SUFDNUI7SUFBOEIsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUEvQixJQUErQjtBQUFsQixlQUFlO0lBeEI1QixlQUFRLENBQUM7UUFDTCxPQUFPLEVBQUU7WUFDTCw4QkFBOEI7WUFDOUIsNkJBQWtCO1lBQ2xCLDRCQUFZO1NBQ2Y7UUFDRCxZQUFZLEVBQUU7WUFDVix1QkFBdUI7WUFDdkIsd0NBQWtCO1NBQ3JCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsa0JBQWtCO1lBQ2xCLHdDQUFrQjtTQUNyQjtRQUNELFNBQVMsRUFBRTtZQUNQLG9CQUFvQjtZQUNwQixNQUFNLENBQUMsZ0JBQWdCO1NBQzFCO0tBQ0osQ0FBQztHQU1XLGVBQWUsQ0FBRztBQUFsQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgTmdNb2R1bGVcbn1cbmZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7XG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlXG59XG5mcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcblxuaW1wb3J0IHtcbiAgICBTaGFyZWRNb2R1bGVcbn1cbmZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuaW1wb3J0IHtcbiAgICBBYm91dFZpZXdDb21wb25lbnRcbn1cbmZyb20gXCIuL2Fib3V0Vmlldy5jb21wb25lbnRcIjtcbi8vLyBtb2R1bGUgYWRkaXRpb25hbCBpbXBvcnRzXG5cbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tIFwiLi9zaGFyZWRcIjtcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7XG5cbkBcbk5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIC8vLyBtb2R1bGUgaW1wb3J0cyBkZWNsYXJhdGlvblxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIC8vLyBtb2R1bGUgZGVjbGFyYXRpb25zXG4gICAgICAgIEFib3V0Vmlld0NvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICAvLy8gbW9kdWxlIGV4cG9ydHNcbiAgICAgICAgQWJvdXRWaWV3Q29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLy8vIG1vZHVsZSBwcm92aWRlcnNcbiAgICAgICAgY29tbW9uLkFib3V0Vmlld1NlcnZpY2VcbiAgICBdXG59KVxuXG4vLyBTVEFSVF9DVVNUT01fQ09ERV9hYm91dFZpZXdcbi8vIEFkZCBjdXN0b20gY29kZSBoZXJlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBjdXN0b20gY29kZSwgc2VlIGh0dHA6Ly9kb2NzLnRlbGVyaWsuY29tL3BsYXRmb3JtL3NjcmVlbmJ1aWxkZXIvdHJvdWJsZXNob290aW5nL2hvdy10by1rZWVwLWN1c3RvbS1jb2RlLWNoYW5nZXNcblxuLy8gRU5EX0NVU1RPTV9DT0RFX2Fib3V0Vmlld1xuZXhwb3J0IGNsYXNzIEFib3V0Vmlld01vZHVsZSB7fSJdfQ==