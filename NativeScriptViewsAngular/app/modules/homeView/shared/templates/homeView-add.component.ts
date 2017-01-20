import {
    Component, ChangeDetectionStrategy, Input, Output, EventEmitter
}
from "@angular/core";

import * as common from "./";
import * as shared from "../../../../shared";

@
Component({
    moduleId: module.id,
    selector: "ns-homeView-add",
    templateUrl: "homeView-add.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewAddComponent {@
    Input() provider: any;@
    Input() set current(value: shared.Item) {
        this.item = ( < any > Object).assign({}, value);
    }

    @
    Output() add = new EventEmitter();

    item: shared.Item;

    constructor() {}

    onAdd() {
        this.add.emit({
            item: this.item
        });
    }
}