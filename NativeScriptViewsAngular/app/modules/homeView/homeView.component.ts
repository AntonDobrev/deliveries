import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HomeViewStore, HomeViewService } from "./shared";
import { Modes } from "../../shared";
import { ActionBar } from "ui/action-bar";

@Component({
    moduleId: module.id,
    selector: "ns-homeView",
    templateUrl: "homeView.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: []
})

export class HomeViewComponent implements OnInit {

    modes = Modes;
    mode: Modes;

    constructor(
        private _store: HomeViewStore,
        private _service: HomeViewService
    ) {
        this.mode = Modes.LIST;
    }

    ngOnInit() {
        this._store.loadAll();
    }

    onSelect(args) {
        this._store.select(args.item);
        this.onNavigate(Modes.DETAIL);
    }

    onSave(args) {
        this._store.save(args.item);
        this.onNavigate(this.mode === Modes.ADD ? Modes.LIST : Modes.DETAIL);
    }

    onDelete(args) {
        this._store.delete(args.item);
        this.onNavigate(Modes.LIST);
    }

    onNavigateBack() {
        this.onNavigate(this.mode === Modes.EDIT ? Modes.DETAIL : Modes.LIST);
    }

    onNavigate(mode: Modes) {
        if (mode === Modes.ADD) {
            this._store.reset();
        }

        this.mode = mode;
    }
    /// component additional methods
}
