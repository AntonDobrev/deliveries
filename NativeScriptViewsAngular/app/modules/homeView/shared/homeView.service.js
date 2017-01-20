"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
/// service imports
var shared = require("../../../shared");
var HomeViewService = (function () {
    function HomeViewService(_provider) {
        this._provider = _provider;
        this._data = _provider.instance.data("DeliveryOrder");
    }
    Object.defineProperty(HomeViewService.prototype, "provider", {
        get: function () {
            return this._provider.instance;
        },
        enumerable: true,
        configurable: true
    });
    HomeViewService.prototype.getAll = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._data
                .get()
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    HomeViewService.prototype.put = function (item) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._data
                .updateSingle(item)
                .then(function (data) { return resolve(data || {}); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    HomeViewService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [shared.backendServicesService])
    ], HomeViewService);
    return HomeViewService;
}());
exports.HomeViewService = HomeViewService;
//# sourceMappingURL=homeView.service.js.map