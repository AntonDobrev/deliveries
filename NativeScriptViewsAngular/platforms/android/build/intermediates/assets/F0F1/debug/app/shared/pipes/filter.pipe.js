"use strict";
var core_1 = require("@angular/core");
var shared = require("../../shared");
var FilteredItemsPipe = (function () {
    function FilteredItemsPipe() {
    }
    FilteredItemsPipe.prototype.transform = function (arr, values) {
        var orderStatusNumber = [];
        values.forEach(function (value) {
            var statusNumber = shared.OrderStatus[value];
            orderStatusNumber.push(statusNumber);
        });
        return arr.filter(function (item) { return orderStatusNumber.indexOf(item.Status) >= 0; });
    };
    return FilteredItemsPipe;
}());
FilteredItemsPipe = __decorate([
    core_1.Pipe({
        name: "filterItems"
    })
], FilteredItemsPipe);
exports.FilteredItemsPipe = FilteredItemsPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW9EO0FBQ3BELHFDQUF1QztBQU12QyxJQUFhLGlCQUFpQjtJQUE5QjtJQVNBLENBQUM7SUFSQyxxQ0FBUyxHQUFULFVBQVUsR0FBZSxFQUFFLE1BQTRCO1FBQ3JELElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ2xCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFFLENBQUMsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksaUJBQWlCO0lBSDdCLFdBQUksQ0FBQztRQUNKLElBQUksRUFBRSxhQUFhO0tBQ3BCLENBQUM7R0FDVyxpQkFBaUIsQ0FTN0I7QUFUWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgc2hhcmVkIGZyb20gXCIuLi8uLi9zaGFyZWRcIjtcclxuaW1wb3J0IHsgRGVsaXZlcnkgfSBmcm9tICcuLi9tb2RlbHMvZGVsaXZlcnkubW9kZWwnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6IFwiZmlsdGVySXRlbXNcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyZWRJdGVtc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0oYXJyOiBEZWxpdmVyeVtdLCB2YWx1ZXM6IHNoYXJlZC5PcmRlclN0YXR1c1tdKTogYW55W10ge1xyXG4gICAgbGV0IG9yZGVyU3RhdHVzTnVtYmVyID0gW107XHJcbiAgICB2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgIHZhciBzdGF0dXNOdW1iZXIgPSBzaGFyZWQuT3JkZXJTdGF0dXNbdmFsdWVdO1xyXG4gICAgICBvcmRlclN0YXR1c051bWJlci5wdXNoKHN0YXR1c051bWJlcik7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGFyci5maWx0ZXIoaXRlbSA9PiBvcmRlclN0YXR1c051bWJlci5pbmRleE9mKGl0ZW0uU3RhdHVzKT49MCk7XHJcbiAgfVxyXG59ICJdfQ==