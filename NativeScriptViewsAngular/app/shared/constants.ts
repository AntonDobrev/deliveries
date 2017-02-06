export const appId = 'kbzhrylqv9dp3ijj'; // TODO - set the placeholder here
export const httpScheme = 'https';
export const shouldSyncItemsFromServer = true;
export const deliveriesStoragePathName = "deliveries";
export const deliveriesMappingScheme = {
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

