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
    HomeViewStore.prototype.add = function (item) {
        var _this = this;
        this._service.post(item.data)
            .subscribe(function (data) {
            var arr = _this._items$.getValue();
            if (!data.Id) {
                return;
            }
            item.id = data.Id;
            arr.push(item);
            _this._items$.next(arr.slice());
        }, function (error) {
            console.log(JSON.stringify(error));
        });
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
    HomeViewStore.prototype.delete = function (item) {
        var _this = this;
        this._service.delete(item.data)
            .subscribe(function (data) {
            var arr = _this._items$.getValue();
            arr.forEach(function (itm, idx) {
                if (itm.id === item.id) {
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
        (item.id) ? this.update(item) : this.add(item);
    };
    return HomeViewStore;
}());
HomeViewStore = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [common.HomeViewService])
], HomeViewStore);
exports.HomeViewStore = HomeViewStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXcuc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lVmlldy5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsc0NBQTJDO0FBQzNDLDZCQUF1QztBQUN2QywyQkFBNkI7QUFJN0IsSUFBYSxhQUFhO0lBSXRCLHVCQUNZLFFBQWdDO1FBQWhDLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBRXhDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxzQkFBZSxDQUFDO1lBQ3JDLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsc0JBQUksbUNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFNO2FBQVY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFZO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFFRCwrQkFBTyxHQUFQO1FBQUEsaUJBb0JDO1FBbkJHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO2FBQ2pCLFNBQVMsQ0FDVixVQUFDLElBQUk7WUFDRCxJQUFJLEdBQUcsR0FBa0IsRUFBRSxDQUFDO1lBRTVCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNiLElBQUksT0FBTyxHQUFnQjtvQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO29CQUNiLE1BQU0sRUFBRSxJQUFJO2lCQUNmLENBQUM7Z0JBRUYsR0FBRyxDQUFD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QUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBSyxHQUFHLFNBQUUsQ0FBQztZQUM1QixLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FDQSxDQUFDO0lBQ1YsQ0FBQztJQUVELDRCQUFJLEdBQUosVUFBSyxJQUFpQjtRQUNsQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQTVIRCxJQTRIQztBQTVIWSxhQUFhO0lBRHpCLGlCQUFVLEVBQUU7cUNBTWEsTUFBTSxDQUFDLGVBQWU7R0FMbkMsYUFBYSxDQTRIekI7QUE1SFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEl0ZW0gfSBmcm9tICcuLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvaXRlbS5tb2RlbCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgKiBhcyBjb21tb24gZnJvbSBcIi4vXCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4uLy4uLy4uL3NoYXJlZFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSG9tZVZpZXdTdG9yZSB7XG4gICAgcHJpdmF0ZSBfaXRlbXMkOiBCZWhhdmlvclN1YmplY3Q8c2hhcmVkLkl0ZW1bXT47XG4gICAgcHJpdmF0ZSBfY3VycmVudEl0ZW0kOiBCZWhhdmlvclN1YmplY3Q8c2hhcmVkLkl0ZW0+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3NlcnZpY2U6IGNvbW1vbi5Ib21lVmlld1NlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5faXRlbXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRJdGVtJCA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe1xuICAgICAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgICAgICBkYXRhOiB7fVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgcHJvdmlkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlLnByb3ZpZGVyO1xuICAgIH1cblxuICAgIGdldCBpdGVtcyQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcyQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRJdGVtJCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJdGVtJC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBsb2FkQWxsKCkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmdldEFsbCgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyOiBzaGFyZWQuSXRlbVtdID0gW107XG5cbiAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdJdGVtOiBzaGFyZWQuSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogaXRlbS5JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2gobmV3SXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcyQubmV4dChbLi4uYXJyXSk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgbGV0IGl0ZW06IHNoYXJlZC5JdGVtID0ge1xuICAgICAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgICAgICBkYXRhOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRJdGVtJC5uZXh0KGl0ZW0pO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBzaGFyZWQuSXRlbSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50SXRlbSQubmV4dChpdGVtKTtcbiAgICB9XG5cbiAgICBhZGQoaXRlbTogc2hhcmVkLkl0ZW0pIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS5wb3N0KGl0ZW0uZGF0YSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhcnI6IHNoYXJlZC5JdGVtW10gPSB0aGlzLl9pdGVtcyQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5JZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0uaWQgPSBkYXRhLklkO1xuXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMkLm5leHQoWy4uLmFycl0pO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGl0ZW06IHNoYXJlZC5JdGVtKSB7XG4gICAgICAgIHRoaXMuX3NlcnZpY2UucHV0KGl0ZW0uZGF0YSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhcnI6IHNoYXJlZC5JdGVtW10gPSB0aGlzLl9pdGVtcyQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAgICAgICAgIGFyci5mb3JFYWNoKChpdG0sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRtLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJbaWR4XSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zJC5uZXh0KFsuLi5hcnJdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdChpdGVtKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGRlbGV0ZShpdGVtOiBzaGFyZWQuSXRlbSkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmRlbGV0ZShpdGVtLmRhdGEpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyOiBzaGFyZWQuSXRlbVtdID0gdGhpcy5faXRlbXMkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgICAgICAgICBhcnIuZm9yRWFjaCgoaXRtLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0bS5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcyQubmV4dChbLi4uYXJyXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgc2F2ZShpdGVtOiBzaGFyZWQuSXRlbSkge1xuICAgICAgICAoaXRlbS5pZCkgPyB0aGlzLnVwZGF0ZShpdGVtKSA6IHRoaXMuYWRkKGl0ZW0pO1xuICAgIH1cblxufSJdfQ==