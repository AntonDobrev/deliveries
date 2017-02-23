"use strict";
var core_1 = require("@angular/core");
var FilteredItemsPipe = (function () {
    function FilteredItemsPipe() {
    }
    FilteredItemsPipe.prototype.transform = function (arr, value) {
        return arr.filter(function (item) { return item.data.Status === value; });
    };
    FilteredItemsPipe = __decorate([
        core_1.Pipe({
            name: "filterItems"
        }), 
        __metadata('design:paramtypes', [])
    ], FilteredItemsPipe);
    return FilteredItemsPipe;
}());
exports.FilteredItemsPipe = FilteredItemsPipe;
//# sourceMappingURL=filter.pipe.js.map