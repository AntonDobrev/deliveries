"use strict";
var core_1 = require("@angular/core");
var SearchPipe = (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (arr, value) {
        return arr.filter(function (item) {
            var itemName = item.DeliveryItem.toLowerCase();
            var itemType = item.DeliveryItemType.toLowerCase();
            var itemDeliveryName = item.DeliveryName.toLowerCase();
            var itemDeliveryCity = item.DeliveryAddressCity.toLowerCase();
            var itemDeliveryAddress = item.DeliveryAddressLine1.toLowerCase();
            var itemPostcode = item.DeliveryAddressPostcode.toLowerCase();
            var found = (itemName.search(value) >= 0) ||
                (itemType.search(value) >= 0) ||
                (itemDeliveryName.search(value) >= 0) ||
                (itemDeliveryCity.search(value) >= 0) ||
                (itemDeliveryAddress.search(value) >= 0) ||
                (itemPostcode.search(value) >= 0);
            return found;
        });
    };
    return SearchPipe;
}());
SearchPipe = __decorate([
    core_1.Pipe({
        name: "searchFor"
    })
], SearchPipe);
exports.SearchPipe = SearchPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWFyY2gucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW9EO0FBTXBELElBQWEsVUFBVTtJQUF2QjtJQXNCQSxDQUFDO0lBckJDLDhCQUFTLEdBQVQsVUFBVSxHQUFVLEVBQUUsS0FBYTtRQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FDZixVQUFVLElBQUk7WUFDWixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQy9DLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUQsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbEUsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTlELElBQUksS0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUU5QyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBdEJZLFVBQVU7SUFIdEIsV0FBSSxDQUFDO1FBQ0osSUFBSSxFQUFFLFdBQVc7S0FDbEIsQ0FBQztHQUNXLFVBQVUsQ0FzQnRCO0FBdEJZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIHNoYXJlZCBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogXCJzZWFyY2hGb3JcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShhcnI6IGFueVtdLCB2YWx1ZTogc3RyaW5nKTogYW55W10ge1xyXG4gICAgcmV0dXJuIGFyci5maWx0ZXIoXHJcbiAgICAgIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1OYW1lID0gaXRlbS5EZWxpdmVyeUl0ZW0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBsZXQgaXRlbVR5cGUgPSBpdGVtLkRlbGl2ZXJ5SXRlbVR5cGUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBsZXQgaXRlbURlbGl2ZXJ5TmFtZSA9IGl0ZW0uRGVsaXZlcnlOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgbGV0IGl0ZW1EZWxpdmVyeUNpdHkgPSBpdGVtLkRlbGl2ZXJ5QWRkcmVzc0NpdHkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBsZXQgaXRlbURlbGl2ZXJ5QWRkcmVzcyA9IGl0ZW0uRGVsaXZlcnlBZGRyZXNzTGluZTEudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBsZXQgaXRlbVBvc3Rjb2RlID0gaXRlbS5EZWxpdmVyeUFkZHJlc3NQb3N0Y29kZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICBsZXQgZm91bmQgPSAoaXRlbU5hbWUuc2VhcmNoKHZhbHVlKSA+PSAwKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChpdGVtVHlwZS5zZWFyY2godmFsdWUpID49IDApIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKGl0ZW1EZWxpdmVyeU5hbWUuc2VhcmNoKHZhbHVlKSA+PSAwKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChpdGVtRGVsaXZlcnlDaXR5LnNlYXJjaCh2YWx1ZSkgPj0gMCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAoaXRlbURlbGl2ZXJ5QWRkcmVzcy5zZWFyY2godmFsdWUpID49IDApIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKGl0ZW1Qb3N0Y29kZS5zZWFyY2godmFsdWUpID49IDApO1xyXG5cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59ICJdfQ==