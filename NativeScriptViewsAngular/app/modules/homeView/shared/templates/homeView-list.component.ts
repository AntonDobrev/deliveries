import {
    Component, ChangeDetectionStrategy, Input, Output, EventEmitter
}
from "@angular/core";

import * as common from "./";
import * as shared from "../../../../shared";

@
Component({
    moduleId: module.id,
    selector: "ns-homeView-list",
    templateUrl: "homeView-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewListComponent {@
    Input() provider: any;@
    Input() items: any;

    @
    Output() select = new EventEmitter();@
    Output() navigate = new EventEmitter();

    onSelect(item: shared.Item) {
        this.select.emit({
            item: item
        });
    }

    onAdd() {
        this.navigate.emit();
    }
}