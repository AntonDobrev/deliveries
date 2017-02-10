"use strict";
exports.appId = 'kbzhrylqv9dp3ijj'; // TODO - set the placeholder here
exports.httpScheme = 'https';
exports.deliveriesContentTypeName = "DeliveryOrder";
exports.shouldSyncItemsFromServer = true;
exports.deliveriesStoragePathName = "deliveries";
exports.deliveriesMappingScheme = {
    "DeliveryOrder": {
        "Scheme": [
            {
                "Name": "Status",
                "Type": "INT"
            },
            {
                "Name": "Comments",
                "Type": "TEXT"
            },
            {
                "Name": "DeliveryItem",
                "Type": "TEXT"
            },
            {
                "Name": "DeliveryItemType",
                "Type": "TEXT"
            },
            {
                "Name": "DeliveryName",
                "Type": "TEXT"
            },
            {
                "Name": "DeliveryAddressCity",
                "Type": "TEXT"
            },
            {
                "Name": "DeliveryAddressLine1",
                "Type": "TEXT"
            },
            {
                "Name": "DeliveryAddressPostcode",
                "Type": "TEXT"
            },
            {
                "Name": "DeliveryAddressLine2",
                "Type": "TEXT"
            }
        ]
    }
};
//# sourceMappingURL=constants.js.map