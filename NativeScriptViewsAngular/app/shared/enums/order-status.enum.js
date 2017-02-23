"use strict";
(function (OrderStatus) {
    OrderStatus[OrderStatus["Pending"] = 1] = "Pending";
    OrderStatus[OrderStatus["Current"] = 2] = "Current";
    OrderStatus[OrderStatus["Delivered"] = 3] = "Delivered";
    OrderStatus[OrderStatus["Refused"] = 4] = "Refused";
    OrderStatus[OrderStatus["Problem"] = 10] = "Problem";
})(exports.OrderStatus || (exports.OrderStatus = {}));
var OrderStatus = exports.OrderStatus;
//# sourceMappingURL=order-status.enum.js.map