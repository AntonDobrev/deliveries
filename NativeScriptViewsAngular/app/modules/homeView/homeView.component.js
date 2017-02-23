"use strict";
var core_1 = require("@angular/core");
var common = require("./shared");
var shared = require("../../shared");
var HomeViewComponent = (function () {
    function HomeViewComponent(_store, _service, zone) {
        this._store = _store;
        this._service = _service;
        this.zone = zone;
        this.modes = shared.Modes;
        this.mode = shared.Modes.LIST;
    }
    HomeViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._store.loadAll();
        this.zone.run(function () {
            _this._store.items$.count().subscribe(function (number) {
                var title = this.pageTitle.nativeElement;
                title.title = "new value";
            });
        });
    };
    HomeViewComponent.prototype.onSelect = function (args) {
        this._store.select(args.item);
        this.onNavigate(shared.Modes.DETAIL);
    };
    HomeViewComponent.prototype.onSave = function (args) {
        this._store.save(args.item);
        this.onNavigate(this.mode === shared.Modes.ADD ? shared.Modes.LIST : shared.Modes.DETAIL);
    };
    HomeViewComponent.prototype.onDelete = function (args) {
        this._store.delete(args.item);
        this.onNavigate(shared.Modes.LIST);
    };
    HomeViewComponent.prototype.onNavigateBack = function () {
        this.onNavigate(this.mode === shared.Modes.EDIT ? shared.Modes.DETAIL : shared.Modes.LIST);
    };
    HomeViewComponent.prototype.onNavigate = function (mode) {
        if (mode === shared.Modes.ADD) {
            this._store.reset();
        }
        this.mode = mode;
    };
    return HomeViewComponent;
}());
__decorate([
    core_1.ViewChild("pageTitle"),
    __metadata("design:type", core_1.ElementRef)
], HomeViewComponent.prototype, "pageTitle", void 0);
HomeViewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "ns-homeView",
        templateUrl: "homeView.component.html",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        providers: []
    }),
    __metadata("design:paramtypes", [common.HomeViewStore, common.HomeViewService, core_1.NgZone])
], HomeViewComponent);
exports.HomeViewComponent = HomeViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZVZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMEc7QUFDMUcsaUNBQW1DO0FBQ25DLHFDQUF1QztBQVd2QyxJQUFhLGlCQUFpQjtJQU8xQiwyQkFBb0IsTUFBNEIsRUFBVSxRQUFnQyxFQUFVLElBQVk7UUFBNUYsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFMaEgsVUFBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFPakIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNWLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FDaEMsVUFBVSxNQUFNO2dCQUNaLElBQUksS0FBSyxHQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO2dCQUNyRCxLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztZQUM5QixDQUFDLENBQ0osQ0FBQTtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdELG9DQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsa0NBQU0sR0FBTixVQUFPLElBQUk7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELG9DQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMENBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRCxzQ0FBVSxHQUFWLFVBQVcsSUFBa0I7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBR0wsd0JBQUM7QUFBRCxDQUFDLEFBckRELElBcURDO0FBaEQyQjtJQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQzs4QkFBWSxpQkFBVTtvREFBQztBQUxyQyxpQkFBaUI7SUFSN0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLFNBQVMsRUFBRSxFQUFFO0tBQ2hCLENBQUM7cUNBUzhCLE1BQU0sQ0FBQyxhQUFhLEVBQW9CLE1BQU0sQ0FBQyxlQUFlLEVBQWdCLGFBQU07R0FQdkcsaUJBQWlCLENBcUQ3QjtBQXJEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tIFwiLi9zaGFyZWRcIjtcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBBY3Rpb25CYXIgfSBmcm9tIFwidWkvYWN0aW9uLWJhclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcIm5zLWhvbWVWaWV3XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaG9tZVZpZXcuY29tcG9uZW50Lmh0bWxcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuXG5leHBvcnQgY2xhc3MgSG9tZVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgbW9kZXMgPSBzaGFyZWQuTW9kZXM7XG4gICAgbW9kZTogc2hhcmVkLk1vZGVzO1xuXG4gICAgQFZpZXdDaGlsZChcInBhZ2VUaXRsZVwiKSBwYWdlVGl0bGU6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdG9yZTogY29tbW9uLkhvbWVWaWV3U3RvcmUsIHByaXZhdGUgX3NlcnZpY2U6IGNvbW1vbi5Ib21lVmlld1NlcnZpY2UsIHByaXZhdGUgem9uZTogTmdab25lLCApIHtcblxuICAgICAgICB0aGlzLm1vZGUgPSBzaGFyZWQuTW9kZXMuTElTVDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUubG9hZEFsbCgpO1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHsgLy8gVE9ETz8/Pz9cbiAgICAgICAgICAgIHRoaXMuX3N0b3JlLml0ZW1zJC5jb3VudCgpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aXRsZSA9IDxBY3Rpb25CYXI+IHRoaXMucGFnZVRpdGxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLnRpdGxlID0gXCJuZXcgdmFsdWVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgb25TZWxlY3QoYXJncykge1xuICAgICAgICB0aGlzLl9zdG9yZS5zZWxlY3QoYXJncy5pdGVtKTtcbiAgICAgICAgdGhpcy5vbk5hdmlnYXRlKHNoYXJlZC5Nb2Rlcy5ERVRBSUwpO1xuICAgIH1cblxuICAgIG9uU2F2ZShhcmdzKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLnNhdmUoYXJncy5pdGVtKTtcbiAgICAgICAgdGhpcy5vbk5hdmlnYXRlKHRoaXMubW9kZSA9PT0gc2hhcmVkLk1vZGVzLkFERCA/IHNoYXJlZC5Nb2Rlcy5MSVNUIDogc2hhcmVkLk1vZGVzLkRFVEFJTCk7XG4gICAgfVxuXG4gICAgb25EZWxldGUoYXJncykge1xuICAgICAgICB0aGlzLl9zdG9yZS5kZWxldGUoYXJncy5pdGVtKTtcbiAgICAgICAgdGhpcy5vbk5hdmlnYXRlKHNoYXJlZC5Nb2Rlcy5MSVNUKTtcbiAgICB9XG5cbiAgICBvbk5hdmlnYXRlQmFjaygpIHtcbiAgICAgICAgdGhpcy5vbk5hdmlnYXRlKHRoaXMubW9kZSA9PT0gc2hhcmVkLk1vZGVzLkVESVQgPyBzaGFyZWQuTW9kZXMuREVUQUlMIDogc2hhcmVkLk1vZGVzLkxJU1QpO1xuICAgIH1cblxuICAgIG9uTmF2aWdhdGUobW9kZTogc2hhcmVkLk1vZGVzKSB7XG4gICAgICAgIGlmIChtb2RlID09PSBzaGFyZWQuTW9kZXMuQUREKSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yZS5yZXNldCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB9XG4gICAgLy8vIGNvbXBvbmVudCBhZGRpdGlvbmFsIG1ldGhvZHNcblxufSJdfQ==