"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("platform");
var platform_providers_1 = require("nativescript-angular/platform-providers");
var IfAndroidDirective = (function () {
    function IfAndroidDirective(device, container, templateRef) {
        if (device.os === platform_1.platformNames.android) {
            container.createEmbeddedView(templateRef);
        }
    }
    return IfAndroidDirective;
}());
IfAndroidDirective = __decorate([
    core_1.Directive({ selector: "[nsIfAndroid]" }),
    __param(0, core_1.Inject(platform_providers_1.DEVICE)),
    __metadata("design:paramtypes", [Object, core_1.ViewContainerRef, core_1.TemplateRef])
], IfAndroidDirective);
exports.IfAndroidDirective = IfAndroidDirective;
var IfIosDirective = (function () {
    function IfIosDirective(device, container, templateRef) {
        if (device.os === platform_1.platformNames.ios) {
            container.createEmbeddedView(templateRef);
        }
    }
    return IfIosDirective;
}());
IfIosDirective = __decorate([
    core_1.Directive({ selector: "[nsIfIos]" }),
    __param(0, core_1.Inject(platform_providers_1.DEVICE)),
    __metadata("design:paramtypes", [Object, core_1.ViewContainerRef, core_1.TemplateRef])
], IfIosDirective);
exports.IfIosDirective = IfIosDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxhdGZvcm0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBaUY7QUFDakYscUNBQWlEO0FBQ2pELDhFQUFpRTtBQUdqRSxJQUFhLGtCQUFrQjtJQUM3Qiw0QkFBNEIsTUFBYyxFQUFFLFNBQTJCLEVBQUUsV0FBZ0M7UUFDdkcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyx3QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGtCQUFrQjtJQUQ5QixnQkFBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDO0lBRTFCLFdBQUEsYUFBTSxDQUFDLDJCQUFNLENBQUMsQ0FBQTs2Q0FBNEIsdUJBQWdCLEVBQWUsa0JBQVc7R0FEdEYsa0JBQWtCLENBTTlCO0FBTlksZ0RBQWtCO0FBUy9CLElBQWEsY0FBYztJQUN6Qix3QkFBNEIsTUFBYyxFQUFFLFNBQTJCLEVBQUUsV0FBZ0M7UUFDdkcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyx3QkFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGNBQWM7SUFEMUIsZ0JBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUV0QixXQUFBLGFBQU0sQ0FBQywyQkFBTSxDQUFDLENBQUE7NkNBQTRCLHVCQUFnQixFQUFlLGtCQUFXO0dBRHRGLGNBQWMsQ0FNMUI7QUFOWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgVGVtcGxhdGVSZWYsIEluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEZXZpY2UsIHBsYXRmb3JtTmFtZXMgfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCB7IERFVklDRSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9wbGF0Zm9ybS1wcm92aWRlcnNcIjtcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiBcIltuc0lmQW5kcm9pZF1cIiB9KVxuZXhwb3J0IGNsYXNzIElmQW5kcm9pZERpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoREVWSUNFKSBkZXZpY2U6IERldmljZSwgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8T2JqZWN0Pikge1xuICAgIGlmIChkZXZpY2Uub3MgPT09IHBsYXRmb3JtTmFtZXMuYW5kcm9pZCkge1xuICAgICAgY29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0ZW1wbGF0ZVJlZik7XG4gICAgfVxuICB9XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogXCJbbnNJZklvc11cIiB9KVxuZXhwb3J0IGNsYXNzIElmSW9zRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChERVZJQ0UpIGRldmljZTogRGV2aWNlLCBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxPYmplY3Q+KSB7XG4gICAgaWYgKGRldmljZS5vcyA9PT0gcGxhdGZvcm1OYW1lcy5pb3MpIHtcbiAgICAgIGNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWYpO1xuICAgIH1cbiAgfVxufVxuIl19