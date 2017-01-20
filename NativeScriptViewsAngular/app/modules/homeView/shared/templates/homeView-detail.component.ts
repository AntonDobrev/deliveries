import {
    Component, ChangeDetectionStrategy, Input, Output, EventEmitter
}
from "@angular/core";

import * as common from "./";
import * as shared from "../../../../shared";

@
Component({
    moduleId: module.id,
    selector: "ns-homeView-detail",
    templateUrl: "homeView-detail.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewDetailComponent {@
    Input() provider: any;@
    Input() set current(value: shared.Item) {
        this.item = ( < any > Object).assign({}, value);
    }

    @
    Output() navigate = new EventEmitter();

    item: shared.Item;

    constructor() {}

    onEdit() {
        this.navigate.emit();
    }
}