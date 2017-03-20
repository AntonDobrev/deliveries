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
            arr.unshift(item);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXcuc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMEVBQW1FO0FBQ25FLHNDQUEyQztBQUMzQyw2QkFBdUM7QUFDdkMsMkJBQTZCO0FBSTdCLElBQWEsYUFBYTtJQUl0Qix1QkFDWSxRQUFnQztRQUFoQyxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUV4QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksc0JBQWUsQ0FBQyxJQUFJLHlCQUFRLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsc0JBQUksbUNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFNO2FBQVY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFZO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFFRCwrQkFBTyxHQUFQO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTthQUNqQixJQUFJLENBQ0wsVUFBQSxJQUFJO1lBQ0EsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUssSUFBSSxDQUFDLE1BQU0sU0FBRSxDQUFDO1FBQ3hDLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQ0EsQ0FBQztJQUNWLENBQUM7SUFFRCw2QkFB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QyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssSUFBYztRQUNmLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUwsb0JBQUM7QUFBRCxDQUFDLEFBN0dELElBNkdDO0FBN0dZLGFBQWE7SUFEekIsaUJBQVUsRUFBRTtxQ0FNYSxNQUFNLENBQUMsZUFBZTtHQUxuQyxhQUFhLENBNkd6QjtBQTdHWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRGVsaXZlcnkgfSBmcm9tICcuLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZGVsaXZlcnkubW9kZWwnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0ICogYXMgY29tbW9uIGZyb20gXCIuL1wiO1xuaW1wb3J0ICogYXMgc2hhcmVkIGZyb20gXCIuLi8uLi8uLi9zaGFyZWRcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhvbWVWaWV3U3RvcmUge1xuICAgIHByaXZhdGUgX2l0ZW1zJDogQmVoYXZpb3JTdWJqZWN0PERlbGl2ZXJ5W10+O1xuICAgIHByaXZhdGUgX2N1cnJlbnRJdGVtJDogQmVoYXZpb3JTdWJqZWN0PERlbGl2ZXJ5PjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9zZXJ2aWNlOiBjb21tb24uSG9tZVZpZXdTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgICAgICB0aGlzLl9jdXJyZW50SXRlbSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG5ldyBEZWxpdmVyeSk7XG4gICAgfVxuXG4gICAgZ2V0IHByb3ZpZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZS5wcm92aWRlcjtcbiAgICB9XG5cbiAgICBnZXQgaXRlbXMkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50SXRlbSQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50SXRlbSQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgbG9hZEFsbCgpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS5nZXRBbGwoKVxuICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcyQubmV4dChbLi4uZGF0YS5yZXN1bHRdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGxldCBpdGVtOiBEZWxpdmVyeSA9IG5ldyBEZWxpdmVyeTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50SXRlbSQubmV4dChpdGVtKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogRGVsaXZlcnkpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudEl0ZW0kLm5leHQoaXRlbSk7XG4gICAgfVxuXG4gICAgYWRkKGl0ZW06IERlbGl2ZXJ5KSB7XG4gICAgICAgIHRoaXMuX3NlcnZpY2UucG9zdChpdGVtKVxuICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhcnI6IERlbGl2ZXJ5W10gPSB0aGlzLl9pdGVtcyQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5yZXN1bHQuSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpdGVtLklkID0gZGF0YS5yZXN1bHQuSWQ7XG5cbiAgICAgICAgICAgICAgICBhcnIudW5zaGlmdChpdGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcyQubmV4dChbLi4uYXJyXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGl0ZW06IERlbGl2ZXJ5KSB7XG4gICAgICAgIHRoaXMuX3NlcnZpY2UucHV0KGl0ZW0pXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhcnI6IERlbGl2ZXJ5W10gPSB0aGlzLl9pdGVtcyQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAgICAgICAgIGFyci5mb3JFYWNoKChpdG0sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRtLklkID09PSBpdGVtLklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJbaWR4XSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zJC5uZXh0KFsuLi5hcnJdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdChpdGVtKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZShpdGVtOiBEZWxpdmVyeSkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmRlbGV0ZShpdGVtKVxuICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyOiBEZWxpdmVyeVtdID0gdGhpcy5faXRlbXMkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgICAgICAgICBhcnIuZm9yRWFjaCgoaXRtLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0bS5JZCA9PT0gaXRlbS5JZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcyQubmV4dChbLi4uYXJyXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNhdmUoaXRlbTogRGVsaXZlcnkpIHtcbiAgICAgICAgKGl0ZW0uSWQpID8gdGhpcy51cGRhdGUoaXRlbSkgOiB0aGlzLmFkZChpdGVtKTtcbiAgICB9XG5cbn0iXX0=