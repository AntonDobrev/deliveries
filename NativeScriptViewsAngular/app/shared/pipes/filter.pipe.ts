import { Pipe, PipeTransform } from "@angular/core";
import { OrderStatus } from "../../shared";
import { Delivery } from '../models/delivery.model';

@Pipe({
  name: "filterItems"
})
export class FilteredItemsPipe implements PipeTransform {
  transform(arr: Delivery[], values: string[]): Delivery[] {
    let orderStatusNumber = values.map(value => Number(OrderStatus[value]));
    return arr.filter(item => orderStatusNumber.indexOf(item.Status) >= 0);
  }
}
