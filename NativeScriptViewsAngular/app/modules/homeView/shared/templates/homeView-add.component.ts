import { Delivery } from './../../../../shared/models/delivery.model';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { OrderStatus } from "../../../../shared";

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
        this.item.Status = OrderStatus.Pending;
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