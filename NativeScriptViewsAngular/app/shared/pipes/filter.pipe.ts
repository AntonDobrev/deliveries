import { Pipe, PipeTransform } from "@angular/core";
import * as shared from "../../shared";

@Pipe({
  name: "filterItems"
})
export class FilteredItemsPipe implements PipeTransform {
  transform(arr: any[], values: shared.OrderStatus[]): any[] {
    let orderStatusNumber = [];
    values.forEach(value => {
      var statusNumber = shared.OrderStatus[value];
      orderStatusNumber.push(statusNumber);
    })
    return arr.filter(item => orderStatusNumber.indexOf(item.data.Status)>=0);
  }
} 