"use strict";
var core_1 = require("@angular/core");
var utils = require("utils/utils");
var HyperlinkDirective = (function () {
    function HyperlinkDirective() {
    }
    HyperlinkDirective.prototype.tap = function () {
        utils.openUrl(this.url);
    };
    return HyperlinkDirective;
}());
__decorate([
    core_1.Input("nsHyperlink"),
    __metadata("design:type", String)
], HyperlinkDirective.prototype, "url", void 0);
__decorate([
    core_1.HostListener("tap"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HyperlinkDirective.prototype, "tap", null);
HyperlinkDirective = __decorate([
    core_1.Directive({
        selector: "[nsHyperlink]"
    })
], HyperlinkDirective);
exports.HyperlinkDirective = HyperlinkDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh5cGVybGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUErRDtBQUUvRCxtQ0FBcUM7QUFLckMsSUFBYSxrQkFBa0I7SUFBL0I7SUFNQSxDQUFDO0lBSHNCLGdDQUFHLEdBQUg7UUFDbkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFMdUI7SUFBckIsWUFBSyxDQUFDLGFBQWEsQ0FBQzs7K0NBQWE7QUFFYjtJQUFwQixtQkFBWSxDQUFDLEtBQUssQ0FBQzs7Ozs2Q0FFbkI7QUFMVSxrQkFBa0I7SUFIOUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO0tBQzFCLENBQUM7R0FDVyxrQkFBa0IsQ0FNOUI7QUFOWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBcIltuc0h5cGVybGlua11cIlxufSlcbmV4cG9ydCBjbGFzcyBIeXBlcmxpbmtEaXJlY3RpdmUge1xuICBASW5wdXQoXCJuc0h5cGVybGlua1wiKSB1cmw6IHN0cmluZztcblxuICBASG9zdExpc3RlbmVyKFwidGFwXCIpIHRhcCgpIHtcbiAgICB1dGlscy5vcGVuVXJsKHRoaXMudXJsKTtcbiAgfVxufSJdfQ==