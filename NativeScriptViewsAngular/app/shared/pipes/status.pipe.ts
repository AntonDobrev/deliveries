import { Pipe, PipeTransform } from "@angular/core";
import * as shared from "../../shared";
import { Delivery } from '../models/delivery.model';

@Pipe({
  name: "toStringStatus"
})
export class ToStringStatusPipe implements PipeTransform {
  transform(statusNumber: number): string {
    return shared.OrderStatus[statusNumber];
  }
} 