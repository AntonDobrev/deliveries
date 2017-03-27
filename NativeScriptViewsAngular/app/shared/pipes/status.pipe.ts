import { Pipe, PipeTransform } from "@angular/core";
import { OrderStatus } from "../../shared";

@Pipe({
  name: "toStringStatus"
})
export class ToStringStatusPipe implements PipeTransform {
  transform(statusNumber: number): string {
    return OrderStatus[statusNumber];
  }
}
