import {
    Component, ChangeDetectionStrategy, Input, Output, EventEmitter
}
from "@angular/core";

import * as common from "./";
import * as shared from "../../../../shared";

@
Component({
    moduleId: module.id,
    selector: "ns-homeView-edit",
    templateUrl: "homeView-edit.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewEditComponent {@
    Input() set current(value: shared.Item) {
        this.item = ( < any > Object).assign({}, value);
    }

    @
    Output() update = new EventEmitter();@
    Output() delete = new EventEmitter();

    item: shared.Item;

    onUpdate() {
        this.update.emit({
            item: this.item
        });
    }

    onDelete() {
        this.delete.emit({
            item: this.item
        });
    }
}