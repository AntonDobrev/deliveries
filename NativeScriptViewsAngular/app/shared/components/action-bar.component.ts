import { Component, Input, Output, EventEmitter } from "@angular/core";

import { NavigationModes } from "../enums";
import { NavigationService } from "../services";

@Component({
    moduleId: module.id,
    selector: "ns-action-bar",
    templateUrl: "action-bar.component.html",
    styleUrls: [ 'action-bar.component.css' ]
})
export class ActionBarComponent {
    @Input() title: string;
    @Input() showBack: boolean;
    @Input() showAdd: boolean;
    @Input() showDrawer: boolean;
    @Input() showIndex: boolean;

    @Output() back = new EventEmitter();
    @Output() navigate = new EventEmitter();

    private _modes = NavigationModes;
    private _mode: NavigationModes;

    constructor(
        private _navigationService: NavigationService
    ) {
        this._mode = _navigationService.mode;
        this.showDrawer = this._mode === this._modes.DRAWER;
        this.showIndex = this._mode === this._modes.LISTMENU;
    }

    onIndex() {
        this._navigationService.navigateIndex();
    }

    onDrawer() {
        this._navigationService.toggleDrawer();
    }

    onBack() {
        this.back.emit();
    }
    onAdd() {
        this.navigate.emit();
    }
}
