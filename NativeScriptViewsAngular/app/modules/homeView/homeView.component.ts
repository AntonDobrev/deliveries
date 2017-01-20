import {
    Component

    , OnInit, ChangeDetectionStrategy
    /// component core modules

}
from "@angular/core";

import * as common from "./shared";
import * as shared from "../../shared";

@
Component({
    moduleId: module.id,
    selector: "ns-homeView",
    templateUrl: "homeView.component.html"

    ,
    changeDetection: ChangeDetectionStrategy.OnPush
        /// component definitions

})

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
export class HomeViewComponent

implements OnInit
/// component inheritance

{

    modes = shared.Modes;
    mode: shared.Modes;
    /// component additional properties

    constructor(

        private _store: common.HomeViewStore,
        /// component constructor dependencies

        private _service: common.HomeViewService
    ) {

        this.mode = shared.Modes.LIST;
        /// component constructor method

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