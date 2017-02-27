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
    // @Input() provider: any;
    //  @Input() item: Delivery;

    @Input() set current(value: Delivery) {
        this.item = new Delivery;
        this.item.Status = shared.OrderStatus.Pending;

        console.log(JSON.stringify(this.item));
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