import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { NotificationService } from "../../../../shared/services"

import * as common from "./";
import * as shared from "../../../../shared";

@Component({
    moduleId: module.id,
    selector: "ns-homeView-edit",
    templateUrl: "homeView-edit.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewEditComponent {
    @Input() set current(value: shared.Item) {
        this.item = (<any>Object).assign({}, value);
    }

    @Output() update = new EventEmitter();
    @Output() delete = new EventEmitter();

    item: shared.Item;

    constructor(private _notificationService: NotificationService) {

    }
    onUpdate() {
        this.update.emit({
            item: this.item
        });
    }

    onDelete() {
        this._notificationService.confirm("Deleting an item").then(isConfirmed => {
            if (isConfirmed) {
                this.delete.emit({
                    item: this.item
                });
            }
        });
    }
}