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
        // this._eventsService = eventsService;
        // this._eventsService.on('sync-completed', function (info) {
        //     console.log("Sync completed" + info);
        // })
    }
    HomeViewComponent.prototype.ngOnInit = function () {
        console.log("In homeView.component");
        this._store.loadAll();
        // this._eventsService.on('sync-completed', function (info) {
        //     console.log("Sync completed" + info);
        // })
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
    HomeViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-homeView",
            templateUrl: "homeView.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: []
        }), 
        __metadata('design:paramtypes', [common.HomeViewStore, common.HomeViewService])
    ], HomeViewComponent);
    return HomeViewComponent;
}());
exports.HomeViewComponent = HomeViewComponent;
//# sourceMappingURL=homeView.component.js.map