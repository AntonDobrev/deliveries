"use strict";
var core_1 = require('@angular/core');
var providers_1 = require("../providers");
var DeliveriesService = (function () {
    function DeliveriesService(_backendProvider) {
        this._backendProvider = _backendProvider;
        this._deliveriesContentTypeName = "DeliveryOrder"; // TODO - should this be a constant
        this._data = this._backendProvider.instance.data(this._deliveriesContentTypeName);
    }
    DeliveriesService = __decorate([
        // TODO manage the dependency in AB and NS
        core_1.Injectable(), 
        __metadata('design:paramtypes', [providers_1.backendServicesService])
    ], DeliveriesService);
    return DeliveriesService;
}());
exports.DeliveriesService = DeliveriesService;
//# sourceMappingURL=deliveries.service.js.map