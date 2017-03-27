import { Pipe, PipeTransform } from "@angular/core";
import * as shared from "../../shared";

@Pipe({
  name: "searchFor"
})
export class SearchPipe implements PipeTransform {
  transform(arr: any[], value: string): any[] {
    return arr.filter((item) => {
      let itemName = item.DeliveryItem.toLowerCase();
      let itemType = item.DeliveryItemType.toLowerCase();
      let itemDeliveryName = item.DeliveryName.toLowerCase();
      let itemDeliveryCity = item.DeliveryAddressCity.toLowerCase();
      let itemDeliveryAddress = item.DeliveryAddressLine1.toLowerCase();
      let itemPostcode = item.DeliveryAddressPostcode.toLowerCase();

      let found = (itemName.search(value) >= 0) ||
        (itemType.search(value) >= 0) ||
        (itemDeliveryName.search(value) >= 0) ||
        (itemDeliveryCity.search(value) >= 0) ||
        (itemDeliveryAddress.search(value) >= 0) ||
        (itemPostcode.search(value) >= 0);

      return found;
    });
  }
}
