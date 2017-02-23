"use strict";
var core_1 = require("@angular/core");
var common = require("./shared");
var HomeComponent = (function () {
    /// component additional properties
    function HomeComponent(
        /// component constructor dependencies
        _service) {
        /// component constructor method
        this._service = _service;
    }
    HomeComponent.prototype.onConfirm = function () {
    };
    HomeComponent.prototype.onCancel = function () { };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "ns-home",
        templateUrl: "home.component.html"
    }),
    __metadata("design:paramtypes", [common.HomeService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBSXFCO0FBRXJCLGlDQUFtQztBQWVuQyxJQUFhLGFBQWE7SUFJdEIsbUNBQW1DO0lBRW5DO1FBRUksc0NBQXNDO1FBRTlCLFFBQTRCO1FBR3BDLGdDQUFnQztRQUh4QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtJQUt4QyxDQUFDO0lBRUQsaUNBQVMsR0FBVDtJQUVBLENBQUM7SUFDRCxnQ0FBUSxHQUFSLGNBQVksQ0FBQztJQUdqQixvQkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2QlksYUFBYTtJQVgxQixnQkFBUyxDQUFDO1FBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSxxQkFBcUI7S0FFckMsQ0FBQztxQ0FnQndCLE1BQU0sQ0FBQyxXQUFXO0dBVi9CLGFBQWEsQ0F1QnpCO0FBdkJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnRcbiAgICAvLy8gY29tcG9uZW50IGNvcmUgbW9kdWxlc1xufVxuZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0ICogYXMgY29tbW9uIGZyb20gXCIuL3NoYXJlZFwiO1xuaW1wb3J0ICogYXMgc2hhcmVkIGZyb20gXCIuLi8uLi9zaGFyZWRcIjtcblxuQFxuQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcIm5zLWhvbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJob21lLmNvbXBvbmVudC5odG1sXCJcbiAgICAgICAgLy8vIGNvbXBvbmVudCBkZWZpbml0aW9uc1xufSlcblxuLy8gU1RBUlRfQ1VTVE9NX0NPREVfaG9tZVxuLy8gQWRkIGN1c3RvbSBjb2RlIGhlcmUuIEZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGN1c3RvbSBjb2RlLCBzZWUgaHR0cDovL2RvY3MudGVsZXJpay5jb20vcGxhdGZvcm0vc2NyZWVuYnVpbGRlci90cm91Ymxlc2hvb3RpbmcvaG93LXRvLWtlZXAtY3VzdG9tLWNvZGUtY2hhbmdlc1xuXG4vLyBFTkRfQ1VTVE9NX0NPREVfaG9tZVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnRcbi8vLyBjb21wb25lbnQgaW5oZXJpdGFuY2VcbntcblxuICAgIC8vLyBjb21wb25lbnQgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXG5cbiAgICBjb25zdHJ1Y3RvcihcblxuICAgICAgICAvLy8gY29tcG9uZW50IGNvbnN0cnVjdG9yIGRlcGVuZGVuY2llc1xuXG4gICAgICAgIHByaXZhdGUgX3NlcnZpY2U6IGNvbW1vbi5Ib21lU2VydmljZVxuICAgICkge1xuXG4gICAgICAgIC8vLyBjb21wb25lbnQgY29uc3RydWN0b3IgbWV0aG9kXG5cbiAgICB9XG5cbiAgICBvbkNvbmZpcm0oKSB7XG5cbiAgICB9XG4gICAgb25DYW5jZWwoKSB7fVxuICAgICAgICAvLy8gY29tcG9uZW50IGFkZGl0aW9uYWwgbWV0aG9kc1xuXG59Il19