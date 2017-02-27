"use strict";
var core_1 = require("@angular/core");
var common = require("./shared");
var shared = require("../../shared");
var HomeViewComponent = (function () {
    function HomeViewComponent(_store, _service) {
        this._store = _store;
        this._service = _service;
        this.modes = shared.Modes;
        this.mode = shared.Modes.LIST;
    }
    HomeViewComponent.prototype.ngOnInit = function () {
        this._store.loadAll();
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
    core_1.ViewChild("tabview"),
    __metadata("design:type", core_1.ElementRef)
], HomeViewComponent.prototype, "tabTitle", void 0);
__decorate([
    core_1.ViewChild("tabview1"),
    __metadata("design:type", core_1.ElementRef)
], HomeViewComponent.prototype, "tabTitle1", void 0);
HomeViewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "ns-homeView",
        templateUrl: "homeView.component.html",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        providers: []
    }),
    __metadata("design:paramtypes", [common.HomeViewStore, common.HomeViewService])
], HomeViewComponent);
exports.HomeViewComponent = HomeViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZVZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0c7QUFDbEcsaUNBQW1DO0FBQ25DLHFDQUF1QztBQVd2QyxJQUFhLGlCQUFpQjtJQVMxQiwyQkFDWSxNQUE0QixFQUM1QixRQUFnQztRQURoQyxXQUFNLEdBQU4sTUFBTSxDQUFzQjtRQUM1QixhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQVQ1QyxVQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQVlqQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsb0NBQVEsR0FBUixVQUFTLElBQUk7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxrQ0FBTSxHQUFOLFVBQU8sSUFBSTtRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsb0NBQVEsR0FBUixVQUFTLElBQUk7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCwwQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxJQUFrQjtRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFHTCx3QkFBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUEzQ3lCO0lBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDOzhCQUFXLGlCQUFVO21EQUFDO0FBQ3BCO0lBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDOzhCQUFZLGlCQUFVO29EQUFDO0FBUHBDLGlCQUFpQjtJQVI3QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFdBQVcsRUFBRSx5QkFBeUI7UUFDdEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07UUFDL0MsU0FBUyxFQUFFLEVBQUU7S0FDaEIsQ0FBQztxQ0FZc0IsTUFBTSxDQUFDLGFBQWEsRUFDbEIsTUFBTSxDQUFDLGVBQWU7R0FYbkMsaUJBQWlCLENBaUQ3QjtBQWpEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBjb21tb24gZnJvbSBcIi4vc2hhcmVkXCI7XG5pbXBvcnQgKiBhcyBzaGFyZWQgZnJvbSBcIi4uLy4uL3NoYXJlZFwiO1xuaW1wb3J0IHsgQWN0aW9uQmFyIH0gZnJvbSBcInVpL2FjdGlvbi1iYXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogXCJucy1ob21lVmlld1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcImhvbWVWaWV3LmNvbXBvbmVudC5odG1sXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIG1vZGVzID0gc2hhcmVkLk1vZGVzO1xuICAgIG1vZGU6IHNoYXJlZC5Nb2RlcztcblxuXG4gICAgQFZpZXdDaGlsZChcInRhYnZpZXdcIikgdGFiVGl0bGU6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInRhYnZpZXcxXCIpIHRhYlRpdGxlMTogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9zdG9yZTogY29tbW9uLkhvbWVWaWV3U3RvcmUsXG4gICAgICAgIHByaXZhdGUgX3NlcnZpY2U6IGNvbW1vbi5Ib21lVmlld1NlcnZpY2VcbiAgICApIHtcblxuICAgICAgICB0aGlzLm1vZGUgPSBzaGFyZWQuTW9kZXMuTElTVDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUubG9hZEFsbCgpO1xuICAgIH1cblxuICAgIG9uU2VsZWN0KGFyZ3MpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuc2VsZWN0KGFyZ3MuaXRlbSk7XG4gICAgICAgIHRoaXMub25OYXZpZ2F0ZShzaGFyZWQuTW9kZXMuREVUQUlMKTtcbiAgICB9XG5cbiAgICBvblNhdmUoYXJncykge1xuICAgICAgICB0aGlzLl9zdG9yZS5zYXZlKGFyZ3MuaXRlbSk7XG4gICAgICAgIHRoaXMub25OYXZpZ2F0ZSh0aGlzLm1vZGUgPT09IHNoYXJlZC5Nb2Rlcy5BREQgPyBzaGFyZWQuTW9kZXMuTElTVCA6IHNoYXJlZC5Nb2Rlcy5ERVRBSUwpO1xuICAgIH1cblxuICAgIG9uRGVsZXRlKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuZGVsZXRlKGFyZ3MuaXRlbSk7XG4gICAgICAgIHRoaXMub25OYXZpZ2F0ZShzaGFyZWQuTW9kZXMuTElTVCk7XG4gICAgfVxuXG4gICAgb25OYXZpZ2F0ZUJhY2soKSB7XG4gICAgICAgIHRoaXMub25OYXZpZ2F0ZSh0aGlzLm1vZGUgPT09IHNoYXJlZC5Nb2Rlcy5FRElUID8gc2hhcmVkLk1vZGVzLkRFVEFJTCA6IHNoYXJlZC5Nb2Rlcy5MSVNUKTtcbiAgICB9XG5cbiAgICBvbk5hdmlnYXRlKG1vZGU6IHNoYXJlZC5Nb2Rlcykge1xuICAgICAgICBpZiAobW9kZSA9PT0gc2hhcmVkLk1vZGVzLkFERCkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmUucmVzZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgfVxuICAgIC8vLyBjb21wb25lbnQgYWRkaXRpb25hbCBtZXRob2RzXG5cbn0iXX0=