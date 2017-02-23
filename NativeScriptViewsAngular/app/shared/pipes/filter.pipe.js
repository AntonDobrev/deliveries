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
        return arr.filter(function (item) { return orderStatusNumber.indexOf(item.data.Status) >= 0; });
    };
    return FilteredItemsPipe;
}());
FilteredItemsPipe = __decorate([
    core_1.Pipe({
        name: "filterItems"
    })
], FilteredItemsPipe);
exports.FilteredItemsPipe = FilteredItemsPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW9EO0FBQ3BELHFDQUF1QztBQUt2QyxJQUFhLGlCQUFpQjtJQUE5QjtJQVNBLENBQUM7SUFSQyxxQ0FBUyxHQUFULFVBQVUsR0FBVSxFQUFFLE1BQTRCO1FBQ2hELElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ2xCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBRSxDQUFDLEVBQTlDLENBQThDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQVRZLGlCQUFpQjtJQUg3QixXQUFJLENBQUM7UUFDSixJQUFJLEVBQUUsYUFBYTtLQUNwQixDQUFDO0dBQ1csaUJBQWlCLENBUzdCO0FBVFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogXCJmaWx0ZXJJdGVtc1wiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJlZEl0ZW1zUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShhcnI6IGFueVtdLCB2YWx1ZXM6IHNoYXJlZC5PcmRlclN0YXR1c1tdKTogYW55W10ge1xyXG4gICAgbGV0IG9yZGVyU3RhdHVzTnVtYmVyID0gW107XHJcbiAgICB2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgIHZhciBzdGF0dXNOdW1iZXIgPSBzaGFyZWQuT3JkZXJTdGF0dXNbdmFsdWVdO1xyXG4gICAgICBvcmRlclN0YXR1c051bWJlci5wdXNoKHN0YXR1c051bWJlcik7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGFyci5maWx0ZXIoaXRlbSA9PiBvcmRlclN0YXR1c051bWJlci5pbmRleE9mKGl0ZW0uZGF0YS5TdGF0dXMpPj0wKTtcclxuICB9XHJcbn0gIl19