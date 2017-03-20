"use strict";
var core_1 = require("@angular/core");
var shared = require("../../shared");
var ToStringStatusPipe = (function () {
    function ToStringStatusPipe() {
    }
    ToStringStatusPipe.prototype.transform = function (statusNumber) {
        return shared.OrderStatus[statusNumber];
    };
    return ToStringStatusPipe;
}());
ToStringStatusPipe = __decorate([
    core_1.Pipe({
        name: "toStringStatus"
    })
], ToStringStatusPipe);
exports.ToStringStatusPipe = ToStringStatusPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0dXMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW9EO0FBQ3BELHFDQUF1QztBQU12QyxJQUFhLGtCQUFrQjtJQUEvQjtJQUlBLENBQUM7SUFIQyxzQ0FBUyxHQUFULFVBQVUsWUFBb0I7UUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxrQkFBa0I7SUFIOUIsV0FBSSxDQUFDO1FBQ0osSUFBSSxFQUFFLGdCQUFnQjtLQUN2QixDQUFDO0dBQ1csa0JBQWtCLENBSTlCO0FBSlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7XHJcbmltcG9ydCB7IERlbGl2ZXJ5IH0gZnJvbSAnLi4vbW9kZWxzL2RlbGl2ZXJ5Lm1vZGVsJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiBcInRvU3RyaW5nU3RhdHVzXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvU3RyaW5nU3RhdHVzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShzdGF0dXNOdW1iZXI6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gc2hhcmVkLk9yZGVyU3RhdHVzW3N0YXR1c051bWJlcl07XHJcbiAgfVxyXG59ICJdfQ==