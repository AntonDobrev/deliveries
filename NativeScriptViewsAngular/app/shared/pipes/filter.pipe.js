"use strict";
var core_1 = require("@angular/core");
var FilteredItemsPipe = (function () {
    function FilteredItemsPipe() {
    }
    FilteredItemsPipe.prototype.transform = function (arr, value) {
        return arr.filter(function (item) { return item.data.Status === value; });
    };
    return FilteredItemsPipe;
}());
FilteredItemsPipe = __decorate([
    core_1.Pipe({
        name: "filterItems"
    })
], FilteredItemsPipe);
exports.FilteredItemsPipe = FilteredItemsPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW9EO0FBSXBELElBQWEsaUJBQWlCO0lBQTlCO0lBSUEsQ0FBQztJQUhDLHFDQUFTLEdBQVQsVUFBVSxHQUFVLEVBQUUsS0FBSztRQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksaUJBQWlCO0lBSDdCLFdBQUksQ0FBQztRQUNKLElBQUksRUFBRSxhQUFhO0tBQ3BCLENBQUM7R0FDVyxpQkFBaUIsQ0FJN0I7QUFKWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuQFBpcGUoe1xyXG4gIG5hbWU6IFwiZmlsdGVySXRlbXNcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyZWRJdGVtc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0oYXJyOiBhbnlbXSwgdmFsdWUpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IGl0ZW0uZGF0YS5TdGF0dXMgPT09IHZhbHVlKTtcclxuICB9XHJcbn0gIl19