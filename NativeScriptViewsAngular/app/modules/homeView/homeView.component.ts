import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild } from "@angular/core";
import * as common from "./shared";
import * as shared from "../../shared";
import { ActionBar } from "ui/action-bar";

@Component({
    moduleId: module.id,
    selector: "ns-homeView",
    templateUrl: "homeView.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: []
})

export class HomeViewComponent implements OnInit {

    modes = shared.Modes;
    mode: shared.Modes;


    constructor(
        private _store: common.HomeViewStore,
        private _service: common.HomeViewService
    ) {

        this.mode = shared.Modes.LIST;
    }

    ngOnInit() {
        this._store.loadAll();
    }

    onSelect(args) {
        this._store.select(args.item);
        this.onNavigate(shared.Modes.DETAIL);
    }

    onSave(args) {
        this._store.save(args.item);
        this.onNavigate(this.mode === shared.Modes.ADD ? shared.Modes.LIST : shared.Modes.DETAIL);
    }

    onDelete(args) {
        this._store.delete(args.item);
        this.onNavigate(shared.Modes.LIST);
    }

    onNavigateBack() {
        this.onNavigate(this.mode === shared.Modes.EDIT ? shared.Modes.DETAIL : shared.Modes.LIST);
    }

    onNavigate(mode: shared.Modes) {
        if (mode === shared.Modes.ADD) {
            this._store.reset();
        }

        this.mode = mode;
    }
    /// component additional methods

}