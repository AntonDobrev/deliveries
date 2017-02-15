import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { NotificationService } from "../../../../shared/services"

import * as common from "./";
import * as shared from "../../../../shared";

// TODO - place in a separate file
enum OrderStatus {
    Pending = 1,
    Current = 2,
    Delivered = 3,
    Refused = 4,
    Problem = 10
}

// TODO - set as a constant in the dedicated file
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

    private statusArray = [OrderStatus.Pending, OrderStatus.Current, OrderStatus.Delivered, OrderStatus.Refused, OrderStatus.Problem];

    private directions = ["Pending", "Current", "Delivered", "Refused", "Problem"];

    @Input() set current(value: shared.Item) {
        this.item = (<any>Object).assign({}, value);
        // TODO - this works, refactor
        console.log("Status[this.item.data.Status]" + OrderStatus[this.item.data.Status]); // Current, etc.

        console.log("orderStatusNames[this.item.data.Status]" + orderStatusNames[OrderStatus[this.item.data.Status]]); // 1, 2, 10 etc.
        this.currentItemStatus = this.directions.indexOf(OrderStatus[this.item.data.Status]);
        console.log("this.currentItemStatus: " + this.currentItemStatus); 1
    }

    @Output() update = new EventEmitter();
    @Output() delete = new EventEmitter();

    item: shared.Item;

    constructor(private _notificationService: NotificationService) {

    }

    currentItemStatus: number; // = this.item.data.Status; //this.directions.indexOf(this.directions[this.item.data.Status].toString()); // TODO - use this in the details view too

    selectedIndexChanged(picker) {
        console.log('picker selection: ' + picker.selectedIndex);
        var selectedItem: string = this.directions[picker.selectedIndex].toString();
        console.log(selectedItem);

        var enumIndex = OrderStatus[selectedItem];

        console.log("Enum index: " + enumIndex); // TODO - works correctly
        this.item.data.Status = enumIndex;

    }
    onUpdate() {
        console.log(JSON.stringify(this.item));
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