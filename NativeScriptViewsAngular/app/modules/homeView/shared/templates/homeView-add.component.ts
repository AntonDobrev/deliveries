import { Delivery } from './../../../../shared/models/delivery.model';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, AfterViewChecked } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TextField } from "ui/text-field";
import { OrderStatus } from "../../../../shared";

@Component({
    moduleId: module.id,
    selector: "ns-homeView-add",
    templateUrl: "homeView-add.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewAddComponent implements AfterViewChecked {
    // @Input() provider: any;
    //  @Input() item: Delivery;
    isValid: Boolean = false;

    @Input() set current(value: Delivery) {
        this.item = new Delivery;
        this.item.Status = OrderStatus.Pending;
    }

  ngAfterViewChecked() {
      // TODO - check form validity here and set the isValid flag // perhaps with the min lenght property
      var item = this.item;
      if(item.DeliveryName && item.DeliveryItem && item.DeliveryItemType && item.DeliveryAddressCity && item.DeliveryAddressLine1 && item.DeliveryAddressPostcode) {
        this.isValid = true;
      } else {
          // TODO - handle the case to hide the button when a valid form is deactivated
          this.isValid = false;
      }

}

// iterrate over properties and check them 
// isDeliveryItemValid(item:Delivery) {
//     return item.DeliveryName && item.DeliveryItem && item.DeliveryItemType && item.DeliveryAddressCity && item.DeliveryAddressLine1 && item.DeliveryAddressPostcode; 
// }
    @ViewChild('deliveryItemElement') itemElement: TextField;

    @Output() add = new EventEmitter();

    item: Delivery;

    constructor() { }

    onSave() {


        this.add.emit({
            item: this.item
        });
    }


}