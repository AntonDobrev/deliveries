import { Delivery } from './../../../../shared/models/delivery.model';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TextField } from "ui/text-field";
import { OrderStatus } from "../../../../shared";

import { NotificationService } from "../../../../shared/services"

@Component({
    moduleId: module.id,
    selector: "ns-homeView-add",
    templateUrl: "homeView-add.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewAddComponent {

    @Input() set current(value: Delivery) {
        this.item = new Delivery;
        this.item.Status = OrderStatus.Pending;
    }

    @Output() add = new EventEmitter();

    @Input() item: Delivery;

    constructor(private _notificationService: NotificationService) { }

    onSave() {
        var item = this.item;

        if (this.validateDeliveryItem(item)) {
            this.add.emit({
                item: this.item
            })
        } else {
            this._notificationService.warning("Please fill all required fields");
            return;
        }
    }

    validateDeliveryItem(item: Delivery) {
        var isDeliveryItemValid = (item.DeliveryName && item.DeliveryItem && item.DeliveryItemType && item.DeliveryAddressCity && item.DeliveryAddressLine1 && item.DeliveryAddressPostcode);
        return isDeliveryItemValid;
    }
}