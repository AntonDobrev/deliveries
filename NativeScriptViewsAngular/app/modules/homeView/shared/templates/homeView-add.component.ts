import { Delivery } from './../../../../shared/models/delivery.model';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import * as common from "./";
import * as shared from "../../../../shared";

@Component({
    moduleId: module.id,
    selector: "ns-homeView-add",
    templateUrl: "homeView-add.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewAddComponent {
    @Input() provider: any;
    @Input() set current(value: Delivery) {
        this.item = (<any>Object).assign({}, value);
        this.item.Status = shared.OrderStatus.Pending;
    }

    @Output() add = new EventEmitter();

    item: Delivery;

    constructor() { }

    onSave() {
        this.add.emit({
            item: this.item
        });
    }
}