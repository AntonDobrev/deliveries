import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "filterItems"
})
export class FilteredItemsPipe implements PipeTransform {
  transform(arr: any[], value): any[] {
    return arr.filter(item => item.data.Status === value);
  }
} 