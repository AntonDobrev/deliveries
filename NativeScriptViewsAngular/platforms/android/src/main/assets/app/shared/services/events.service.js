"use strict";
var core_1 = require("@angular/core");
var Rx = require("rxjs/Rx");
// http://stackoverflow.com/questions/34700438/global-events-in-angular-2
var EventsService = (function () {
    function EventsService() {
        var _this = this;
        this.listeners = {};
        this.eventsSubject = new Rx.Subject();
        this.events = Rx.Observable.from(this.eventsSubject);
        this.events.subscribe(function (_a) {
            var name = _a.name, args = _a.args;
            if (_this.listeners[name]) {
                for (var _i = 0, _b = _this.listeners[name]; _i < _b.length; _i++) {
                    var listener = _b[_i];
                    listener.apply(void 0, args);
                }
            }
        });
    }
    EventsService.prototype.on = function (name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(listener);
    };
    EventsService.prototype.broadcast = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.eventsSubject.next({
            name: name,
            args: args
        });
    };
    return EventsService;
}());
EventsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLDRCQUE4QjtBQUM5Qix5RUFBeUU7QUFFekUsSUFBYSxhQUFhO0lBTXRCO1FBQUEsaUJBY0M7UUFiRyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXRDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXJELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUNqQixVQUFDLEVBQVk7Z0JBQVgsY0FBSSxFQUFFLGNBQUk7WUFDUixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsR0FBRyxDQUFDLENBQWlCLFVBQW9CLEVBQXBCLEtBQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBcEIsY0FBb0IsRUFBcEIsSUFBb0I7b0JBQXBDLElBQUksUUFBUSxTQUFBO29CQUNiLFFBQVEsZUFBSSxJQUFJLEVBQUU7aUJBQ3JCO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELDBCQUFFLEdBQUYsVUFBRyxJQUFJLEVBQUUsUUFBUTtRQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxpQ0FBUyxHQUFULFVBQVUsSUFBSTtRQUFFLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3BCLElBQUksTUFBQTtZQUNKLElBQUksTUFBQTtTQUNQLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7QUFwQ1ksYUFBYTtJQUR6QixpQkFBVSxFQUFFOztHQUNBLGFBQWEsQ0FvQ3pCO0FBcENZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIFJ4IGZyb20gJ3J4anMvUngnO1xyXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NzAwNDM4L2dsb2JhbC1ldmVudHMtaW4tYW5ndWxhci0yXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV2ZW50c1NlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBsaXN0ZW5lcnM6YW55OyBcclxuICAgIHB1YmxpYyBldmVudHNTdWJqZWN0OmFueTtcclxuICAgIHB1YmxpYyBldmVudHM6YW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5ldmVudHNTdWJqZWN0ID0gbmV3IFJ4LlN1YmplY3QoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBSeC5PYnNlcnZhYmxlLmZyb20odGhpcy5ldmVudHNTdWJqZWN0KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoe25hbWUsIGFyZ3N9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciguLi5hcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uKG5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tuYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0ucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgYnJvYWRjYXN0KG5hbWUsIC4uLmFyZ3MpIHtcclxuICAgICAgICB0aGlzLmV2ZW50c1N1YmplY3QubmV4dCh7XHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGFyZ3NcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==