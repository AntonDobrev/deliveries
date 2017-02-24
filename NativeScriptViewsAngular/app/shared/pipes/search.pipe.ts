import { Pipe, PipeTransform } from "@angular/core";
import * as shared from "../../shared";

@Pipe({
  name: "searchFor"
})
export class SearchPipe implements PipeTransform {
  transform(arr: any[], value: string): any[] {
    return arr.filter(
      function (item) {
        let itemName = item.data.DeliveryItem.toLowerCase();
        let itemType = item.data.DeliveryItemType.toLowerCase();
        let itemDeliveryName = item.data.DeliveryName.toLowerCase();
        let itemDeliveryCity = item.data.DeliveryAddressCity.toLowerCase();
        let itemDeliveryAddress = item.data.DeliveryAddressLine1.toLowerCase();
        let itemPostcode = item.data.DeliveryAddressPostcode.toLowerCase();

        let found = (itemName.search(value) >= 0) ||
                    (itemType.search(value) >= 0) ||
                    (itemDeliveryName.search(value) >= 0) ||
                    (itemDeliveryCity.search(value) >= 0) ||
                    (itemDeliveryAddress.search(value) >= 0) ||
                    (itemPostcode.search(value) >= 0);

        return found;
      }
    );
  }
} 