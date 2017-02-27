import { Pipe, PipeTransform } from "@angular/core";
import * as shared from "../../shared";
import { Delivery } from '../models/delivery.model';

@Pipe({
  name: "filterItems"
})
export class FilteredItemsPipe implements PipeTransform {
  transform(arr: Delivery[], values: shared.OrderStatus[]): any[] {
    let orderStatusNumber = [];
    values.forEach(value => {
      var statusNumber = shared.OrderStatus[value];
      orderStatusNumber.push(statusNumber);
    })
    return arr.filter(item => orderStatusNumber.indexOf(item.Status)>=0);
  }
} 