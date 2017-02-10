"use strict";
var core_1 = require("@angular/core");
var Rx = require('rxjs/Rx');
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
    EventsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EventsService);
    return EventsService;
}());
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map