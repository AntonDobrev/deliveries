"use strict";
var core_1 = require("@angular/core");
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
        return this._data.get();
    };
    HomeViewService.prototype.post = function (item) {
        return this._data.create(item);
    };
    HomeViewService.prototype.put = function (item) {
        return this._data.updateSingle(item);
    };
    HomeViewService.prototype.delete = function (item) {
        return this._data.destroySingle(item);
    };
    return HomeViewService;
}());
HomeViewService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [shared.backendServicesService])
], HomeViewService);
exports.HomeViewService = HomeViewService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVWaWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHNDQUFtRDtBQUduRCx3Q0FBMEM7QUFDMUMsMENBQTRDO0FBRzVDLElBQWEsZUFBZTtJQUl4Qix5QkFDWSxTQUF3QztRQUF4QyxjQUFTLEdBQVQsU0FBUyxDQUErQjtRQUVoRCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUU5RSxDQUFDO0lBRUQsc0JBQUkscUNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUVELGdDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsOEJBQUksR0FBSixVQUFLLElBQVM7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDZCQUFHLEdBQUgsVUFBSSxJQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxnQ0FBTSxHQUFOLFVBQU8sSUFBUztRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBOUJELElBOEJDO0FBOUJZLGVBQWU7SUFEM0IsaUJBQVUsRUFBRTtxQ0FNYyxNQUFNLENBQUMsc0JBQXNCO0dBTDNDLGVBQWUsQ0E4QjNCO0FBOUJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVsaXZlcnkgfSBmcm9tICcuLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZGVsaXZlcnkubW9kZWwnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgKiBhcyBjb21tb24gZnJvbSBcIi4vXCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4uLy4uLy4uL3NoYXJlZFwiO1xuaW1wb3J0IHsgY29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhvbWVWaWV3U2VydmljZSB7XG5cbiAgICBwcml2YXRlIF9kYXRhOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcHJvdmlkZXI6IHNoYXJlZC5iYWNrZW5kU2VydmljZXNTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLl9kYXRhID0gX3Byb3ZpZGVyLmluc3RhbmNlLmRhdGEoY29uc3RhbnRzLmRlbGl2ZXJpZXNDb250ZW50VHlwZU5hbWUpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBnZXQgcHJvdmlkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm92aWRlci5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBnZXRBbGwoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEuZ2V0KCk7XG4gICAgfVxuXG4gICAgcG9zdChpdGVtOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5jcmVhdGUoaXRlbSk7XG4gICAgfVxuXG4gICAgcHV0KGl0ZW06IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhLnVwZGF0ZVNpbmdsZShpdGVtKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaXRlbTogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEuZGVzdHJveVNpbmdsZShpdGVtKTtcbiAgICB9XG59Il19