"use strict";
var delivery_model_1 = require("./../../../shared/models/delivery.model");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var common = require("./");
var HomeViewStore = (function () {
    function HomeViewStore(_service) {
        this._service = _service;
        this._items$ = new rxjs_1.BehaviorSubject([]);
        this._currentItem$ = new rxjs_1.BehaviorSubject(new delivery_model_1.Delivery);
    }
    Object.defineProperty(HomeViewStore.prototype, "provider", {
        get: function () {
            return this._service.provider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeViewStore.prototype, "items$", {
        get: function () {
            return this._items$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeViewStore.prototype, "currentItem$", {
        get: function () {
            return this._currentItem$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    HomeViewStore.prototype.loadAll = function () {
        var _this = this;
        this._service.getAll()
            .then(function (data) {
            _this._items$.next(data.result.slice());
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    HomeViewStore.prototype.reset = function () {
        var item = new delivery_model_1.Delivery;
        this._currentItem$.next(item);
    };
    HomeViewStore.prototype.select = function (item) {
        this._currentItem$.next(item);
    };
    HomeViewStore.prototype.add = function (item) {
        var _this = this;
        this._service.post(item)
            .then(function (data) {
            var arr = _this._items$.getValue();
            if (!data.result.Id) {
                return;
            }
            item.Id = data.result.Id;
            arr.push(item);
            _this._items$.next(arr.slice());
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    HomeViewStore.prototype.update = function (item) {
        var _this = this;
        this._service.put(item)
            .then(function (data) {
            var arr = _this._items$.getValue();
            arr.forEach(function (itm, idx) {
                if (itm.Id === item.Id) {
                    arr[idx] = item;
                }
            });
            _this._items$.next(arr.slice());
            _this.select(item);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    HomeViewStore.prototype.delete = function (item) {
        var _this = this;
        this._service.delete(item)
            .then(function (data) {
            var arr = _this._items$.getValue();
            arr.forEach(function (itm, idx) {
                if (itm.Id === item.Id) {
                    arr.splice(idx, 1);
                }
            });
            _this._items$.next(arr.slice());
            _this.reset();
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    HomeViewStore.prototype.save = function (item) {
        (item.Id) ? this.update(item) : this.add(item);
    };
    return HomeViewStore;
}());
HomeViewStore = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [common.HomeViewService])
], HomeViewStore);
exports.HomeViewStore = HomeViewStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXcuc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMEVBQW1FO0FBQ25FLHNDQUEyQztBQUMzQyw2QkFBdUM7QUFDdkMsMkJBQTZCO0FBSTdCLElBQWEsYUFBYTtJQUl0Qix1QkFDWSxRQUFnQztRQUFoQyxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUV4QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksc0JBQWUsQ0FBQyxJQUFJLHlCQUFRLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsc0JBQUksbUNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFNO2FBQVY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFZO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFFRCwrQkFBTyxHQUFQO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTthQUNqQixJQUFJLENBQ0wsVUFBQSxJQUFJO1lBQ0EsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUssSUFBSSxDQUFDLE1BQU0sU0FBRSxDQUFDO1FBQ3hDLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQ0EsQ0FBQztJQUNWLENBQUM7SUFFRCw2QkFB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LFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELDRCQUFJLEdBQUosVUFBSyxJQUFjO1FBQ2YsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTCxvQkFBQztBQUFELENBQUMsQUE3R0QsSUE2R0M7QUE3R1ksYUFBYTtJQUR6QixpQkFBVSxFQUFFO3FDQU1hLE1BQU0sQ0FBQyxlQUFlO0dBTG5DLGFBQWEsQ0E2R3pCO0FBN0dZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBEZWxpdmVyeSB9IGZyb20gJy4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9kZWxpdmVyeS5tb2RlbCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgKiBhcyBjb21tb24gZnJvbSBcIi4vXCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4uLy4uLy4uL3NoYXJlZFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSG9tZVZpZXdTdG9yZSB7XG4gICAgcHJpdmF0ZSBfaXRlbXMkOiBCZWhhdmlvclN1YmplY3Q8RGVsaXZlcnlbXT47XG4gICAgcHJpdmF0ZSBfY3VycmVudEl0ZW0kOiBCZWhhdmlvclN1YmplY3Q8RGVsaXZlcnk+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3NlcnZpY2U6IGNvbW1vbi5Ib21lVmlld1NlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5faXRlbXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRJdGVtJCA9IG5ldyBCZWhhdmlvclN1YmplY3QobmV3IERlbGl2ZXJ5KTtcbiAgICB9XG5cbiAgICBnZXQgcHJvdmlkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlLnByb3ZpZGVyO1xuICAgIH1cblxuICAgIGdldCBpdGVtcyQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcyQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRJdGVtJCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJdGVtJC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBsb2FkQWxsKCkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmdldEFsbCgpXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zJC5uZXh0KFsuLi5kYXRhLnJlc3VsdF0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgbGV0IGl0ZW06IERlbGl2ZXJ5ID0gbmV3IERlbGl2ZXJ5O1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRJdGVtJC5uZXh0KGl0ZW0pO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBEZWxpdmVyeSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50SXRlbSQubmV4dChpdGVtKTtcbiAgICB9XG5cbiAgICBhZGQoaXRlbTogRGVsaXZlcnkpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS5wb3N0KGl0ZW0pXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFycjogRGVsaXZlcnlbXSA9IHRoaXMuX2l0ZW1zJC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnJlc3VsdC5JZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0uSWQgPSBkYXRhLnJlc3VsdC5JZDtcblxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zJC5uZXh0KFsuLi5hcnJdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoaXRlbTogRGVsaXZlcnkpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS5wdXQoaXRlbSlcbiAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFycjogRGVsaXZlcnlbXSA9IHRoaXMuX2l0ZW1zJC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICAgICAgYXJyLmZvckVhY2goKGl0bSwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdG0uSWQgPT09IGl0ZW0uSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycltpZHhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMkLm5leHQoWy4uLmFycl0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGl0ZW06IERlbGl2ZXJ5KSB7XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZGVsZXRlKGl0ZW0pXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhcnI6IERlbGl2ZXJ5W10gPSB0aGlzLl9pdGVtcyQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAgICAgICAgIGFyci5mb3JFYWNoKChpdG0sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRtLklkID09PSBpdGVtLklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zJC5uZXh0KFsuLi5hcnJdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2F2ZShpdGVtOiBEZWxpdmVyeSkge1xuICAgICAgICAoaXRlbS5JZCkgPyB0aGlzLnVwZGF0ZShpdGVtKSA6IHRoaXMuYWRkKGl0ZW0pO1xuICAgIH1cblxufSJdfQ==