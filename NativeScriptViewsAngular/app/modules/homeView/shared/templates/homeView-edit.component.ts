import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { NotificationService } from "../../../../shared/services"

import * as common from "./";
import * as shared from "../../../../shared";
import { OrderStatus } from "../../../../shared/enums";

const orderStatusNames = {
    "Pending": OrderStatus.Pending,
    "Current": OrderStatus.Current,
    "Delivered": OrderStatus.Delivered,
    "Refused": OrderStatus.Refused,
    "Problem": OrderStatus.Problem
};


@Component({
    moduleId: module.id,
    selector: "ns-homeView-edit",
    templateUrl: "homeView-edit.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewEditComponent {
    
    statusNamesArray:string[] = ["Pending", "Current", "Delivered", "Refused", "Problem"];

    @Input() set current(value: shared.Item) {
        this.item = (<any>Object).assign({}, value);
        this.currentItemStatusIndex = this.statusNamesArray.indexOf(OrderStatus[this.item.data.Status]); // indexOf("Pending")
    }

    @Output() update = new EventEmitter();
    @Output() delete = new EventEmitter();

    item: shared.Item;

    constructor(private _notificationService: NotificationService) {

    }

    currentItemStatusIndex: number;

    selectedIndexChanged(picker) {
        var selectedStatusName: string = this.statusNamesArray[picker.selectedIndex].toString();
        var statusIndex = OrderStatus[selectedStatusName]; // 1, 2, , 10 
        this.item.data.Status = statusIndex;

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