import { Delivery } from './../../../../shared/models/delivery.model';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { NotificationService } from "../../../../shared/services"

import { OrderStatus } from "../../../../shared/enums";

@Component({
    moduleId: module.id,
    selector: "ns-homeView-edit",
    templateUrl: "homeView-edit.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewEditComponent {
    
    item: Delivery;
    currentItemStatusIndex: number;
    statusNamesArray: string[] = ["Pending", "In Progress", "Delivered", "Refused", "Lost"];

    @Input() set current(value: Delivery) {
        this.item = (<any>Object).assign({}, value);
        this.currentItemStatusIndex = this.statusNamesArray.indexOf(OrderStatus[this.item.Status]); // indexOf("Pending")
    }

    @Output() update = new EventEmitter();
    @Output() delete = new EventEmitter();

    constructor(private _notificationService: NotificationService) {}

    selectedIndexChanged(picker) {
        let selectedStatusName: string = this.statusNamesArray[picker.selectedIndex].toString();
        let statusIndex = OrderStatus[selectedStatusName]; // 1, 2, , 10 
        this.item.Status = statusIndex;
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
