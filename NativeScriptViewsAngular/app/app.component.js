"use strict";
var core_1 = require("@angular/core");
// import { backendServicesService } from "./shared";
var services_1 = require('./shared/services');
var AppComponent = (function () {
    function AppComponent(_deliveriesService) {
        this._deliveriesService = _deliveriesService;
        this._deliveries = _deliveriesService;
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("onInit");
        this._deliveries.getItemsCount().then(function (itemsCount) {
            console.log("OK items count");
        }, this.onCountError);
    };
    ;
    AppComponent.prototype.onCountError = function (err) {
        console.log("Cannot retrieve items count");
        // TODO - init logic here
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-main",
            templateUrl: "app.component.html",
            providers: [services_1.DeliveriesService]
        }), 
        __metadata('design:paramtypes', [services_1.DeliveriesService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map