"use strict";
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var common = require("./");
var HomeViewStore = (function () {
    function HomeViewStore(_service) {
        this._service = _service;
        this._items$ = new rxjs_1.BehaviorSubject([]);
        this._currentItem$ = new rxjs_1.BehaviorSubject({
            id: "",
            data: {}
        });
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
            .subscribe(function (data) {
            var arr = [];
            data.forEach(function (item) {
                var newItem = {
                    "id": item.Id,
                    "data": item
                };
                arr.push(newItem);
            });
            _this._items$.next(arr.slice());
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    HomeViewStore.prototype.reset = function () {
        var item = {
            id: "",
            data: {}
        };
        this._currentItem$.next(item);
    };
    HomeViewStore.prototype.select = function (item) {
        this._currentItem$.next(item);
    };
    HomeViewStore.prototype.update = function (item) {
        var _this = this;
        this._service.put(item.data)
            .subscribe(function (data) {
            var arr = _this._items$.getValue();
            arr.forEach(function (itm, idx) {
                if (itm.id === item.id) {
                    arr[idx] = item;
                }
            });
            _this._items$.next(arr.slice());
            _this.select(item);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    HomeViewStore.prototype.save = function (item) {
        this.update(item);
    };
    HomeViewStore = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [common.HomeViewService])
    ], HomeViewStore);
    return HomeViewStore;
}());
exports.HomeViewStore = HomeViewStore;
//# sourceMappingURL=homeView.store.js.map