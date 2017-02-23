"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var shared = require("../../../shared");
var shared_1 = require("../../../shared");
var HomeViewService = (function () {
    function HomeViewService(_provider) {
        this._provider = _provider;
        this._data = _provider.instance.data(shared_1.constants.deliveriesContentTypeName);
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
    HomeViewService.prototype.post = function (item) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._data
                .create(item)
                .then(function (data) { return resolve(data.result || {}); })
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
    HomeViewService.prototype.delete = function (item) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._data
                .destroySingle(item)
                .then(function (data) { return resolve(data || {}); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    return HomeViewService;
}());
HomeViewService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [shared.backendServicesService])
], HomeViewService);
exports.HomeViewService = HomeViewService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVWaWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFtRDtBQUNuRCw4Q0FBNkM7QUFFN0Msd0NBQTBDO0FBQzFDLDBDQUE0QztBQUc1QyxJQUFhLGVBQWU7SUFJeEIseUJBQ1ksU0FBd0M7UUFBeEMsY0FBUyxHQUFULFNBQVMsQ0FBK0I7UUFFaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFFOUUsQ0FBQztJQUVELHNCQUFJLHFDQUFRO2FBQVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7SUFFRCxnQ0FBTSxHQUFOO1FBQUEsaUJBV0M7UUFWRyxJQUFJLE9BQU8sR0FBaUIsSUFBSSxPQUFPLENBQ25DLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDWixLQUFJLENBQUMsS0FBSztpQkFDTCxHQUFHLEVBQUU7aUJBQ0wsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQTFCLENBQTBCLENBQUM7aUJBQ3hDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBYixDQUFhLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQ0osQ0FBQztRQUVGLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsOEJBQUksR0FBSixVQUFLLElBQVM7UUFBZCxpQkFXQztRQVZHLElBQUksT0FBTyxHQUFpQixJQUFJLE9BQU8sQ0FDbkMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNaLEtBQUksQ0FBQyxLQUFLO2lCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUM7aUJBQ1osSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQTFCLENBQTBCLENBQUM7aUJBQ3hDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBYixDQUFhLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQ0osQ0FBQztRQUVGLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsNkJBQUcsR0FBSCxVQUFJLElBQVM7UUFBYixpQkFXQztRQVZHLElBQUksT0FBTyxHQUFpQixJQUFJLE9BQU8sQ0FDbkMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNaLEtBQUksQ0FBQyxLQUFLO2lCQUNMLFlBQVksQ0FBQyxJQUFJLENBQUM7aUJBQ2xCLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEVBQW5CLENBQW1CLENBQUM7aUJBQ2pDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBYixDQUFhLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQ0osQ0FBQztRQUVGLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZ0NBQU0sR0FBTixVQUFPLElBQVM7UUFBaEIsaUJBV0M7UUFWRyxJQUFJLE9BQU8sR0FBaUIsSUFBSSxPQUFPLENBQ25DLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDWixLQUFJLENBQUMsS0FBSztpQkFDTCxhQUFhLENBQUMsSUFBSSxDQUFDO2lCQUNuQixJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFuQixDQUFtQixDQUFDO2lCQUNqQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUNKLENBQUM7UUFFRixNQUFNLENBQUMsdUJBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQWxFRCxJQWtFQztBQWxFWSxlQUFlO0lBRDNCLGlCQUFVLEVBQUU7cUNBTWMsTUFBTSxDQUFDLHNCQUFzQjtHQUwzQyxlQUFlLENBa0UzQjtBQWxFWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0ICogYXMgY29tbW9uIGZyb20gXCIuL1wiO1xuaW1wb3J0ICogYXMgc2hhcmVkIGZyb20gXCIuLi8uLi8uLi9zaGFyZWRcIjtcbmltcG9ydCB7IGNvbnN0YW50cyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIb21lVmlld1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfZGF0YTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3Byb3ZpZGVyOiBzaGFyZWQuYmFja2VuZFNlcnZpY2VzU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IF9wcm92aWRlci5pbnN0YW5jZS5kYXRhKGNvbnN0YW50cy5kZWxpdmVyaWVzQ29udGVudFR5cGVOYW1lKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZ2V0IHByb3ZpZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvdmlkZXIuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgZ2V0QWxsKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGxldCBwcm9taXNlOiBQcm9taXNlPGFueT4gPSBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHJlc29sdmUoZGF0YS5yZXN1bHQgfHwgW10pKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZnJvbVByb21pc2UocHJvbWlzZSk7XG4gICAgfVxuXG4gICAgcG9zdChpdGVtOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBsZXQgcHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gbmV3IFByb21pc2UoXG4gICAgICAgICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVxuICAgICAgICAgICAgICAgICAgICAuY3JlYXRlKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4gcmVzb2x2ZShkYXRhLnJlc3VsdCB8fCB7fSkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZShwcm9taXNlKTtcbiAgICB9XG5cbiAgICBwdXQoaXRlbTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgbGV0IHByb21pc2U6IFByb21pc2U8YW55PiA9IG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFcbiAgICAgICAgICAgICAgICAgICAgLnVwZGF0ZVNpbmdsZShpdGVtKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHJlc29sdmUoZGF0YSB8fCB7fSkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZShwcm9taXNlKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaXRlbTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgbGV0IHByb21pc2U6IFByb21pc2U8YW55PiA9IG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFcbiAgICAgICAgICAgICAgICAgICAgLmRlc3Ryb3lTaW5nbGUoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiByZXNvbHZlKGRhdGEgfHwge30pKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZnJvbVByb21pc2UocHJvbWlzZSk7XG4gICAgfVxufSJdfQ==