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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBYSxRQUFBLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLGtDQUFrQztBQUM5RCxRQUFBLFVBQVUsR0FBRyxPQUFPLENBQUM7QUFDckIsUUFBQSx5QkFBeUIsR0FBRyxlQUFlLENBQUM7QUFDNUMsUUFBQSx5QkFBeUIsR0FBRyxJQUFJLENBQUM7QUFDakMsUUFBQSx5QkFBeUIsR0FBRyxZQUFZLENBQUM7QUFDekMsUUFBQSx1QkFBdUIsR0FBRztJQUN0QyxlQUFlLEVBQUU7UUFDaEIsUUFBUSxFQUFFO1lBQ1Q7Z0JBQ0MsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLE1BQU0sRUFBRSxLQUFLO2FBQ2I7WUFDRDtnQkFDQyxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsTUFBTSxFQUFFLE1BQU07YUFDZDtZQUNEO2dCQUNDLE1BQU0sRUFBRSxjQUFjO2dCQUN0QixNQUFNLEVBQUUsTUFBTTthQUNkO1lBQ0Q7Z0JBQ0MsTUFBTSxFQUFFLGtCQUFrQjtnQkFDMUIsTUFBTSxFQUFFLE1BQU07YUFDZDtZQUNEO2dCQUNDLE1BQU0sRUFBRSxjQUFjO2dCQUN0QixNQUFNLEVBQUUsTUFBTTthQUNkO1lBQ0Q7Z0JBQ0MsTUFBTSxFQUFFLHFCQUFxQjtnQkFDN0IsTUFBTSxFQUFFLE1BQU07YUFDZDtZQUNEO2dCQUNDLE1BQU0sRUFBRSxzQkFBc0I7Z0JBQzlCLE1BQU0sRUFBRSxNQUFNO2FBQ2Q7WUFDRDtnQkFDQyxNQUFNLEVBQUUseUJBQXlCO2dCQUNqQyxNQUFNLEVBQUUsTUFBTTthQUNkO1lBQ0Q7Z0JBQ0MsTUFBTSxFQUFFLHNCQUFzQjtnQkFDOUIsTUFBTSxFQUFFLE1BQU07YUFDZDtTQUNEO0tBQ0Q7Q0FDRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGFwcElkID0gJ2tiemhyeWxxdjlkcDNpamonOyAvLyBUT0RPIC0gc2V0IHRoZSBwbGFjZWhvbGRlciBoZXJlXG5leHBvcnQgY29uc3QgaHR0cFNjaGVtZSA9ICdodHRwcyc7XG5leHBvcnQgY29uc3QgZGVsaXZlcmllc0NvbnRlbnRUeXBlTmFtZSA9IFwiRGVsaXZlcnlPcmRlclwiO1xuZXhwb3J0IGNvbnN0IHNob3VsZFN5bmNJdGVtc0Zyb21TZXJ2ZXIgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IGRlbGl2ZXJpZXNTdG9yYWdlUGF0aE5hbWUgPSBcImRlbGl2ZXJpZXNcIjtcbmV4cG9ydCBjb25zdCBkZWxpdmVyaWVzTWFwcGluZ1NjaGVtZSA9IHtcblx0XCJEZWxpdmVyeU9yZGVyXCI6IHtcblx0XHRcIlNjaGVtZVwiOiBbXG5cdFx0XHR7XG5cdFx0XHRcdFwiTmFtZVwiOiBcIlN0YXR1c1wiLFxuXHRcdFx0XHRcIlR5cGVcIjogXCJJTlRcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0XCJOYW1lXCI6IFwiQ29tbWVudHNcIixcblx0XHRcdFx0XCJUeXBlXCI6IFwiVEVYVFwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRcIk5hbWVcIjogXCJEZWxpdmVyeUl0ZW1cIixcblx0XHRcdFx0XCJUeXBlXCI6IFwiVEVYVFwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRcIk5hbWVcIjogXCJEZWxpdmVyeUl0ZW1UeXBlXCIsXG5cdFx0XHRcdFwiVHlwZVwiOiBcIlRFWFRcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0XCJOYW1lXCI6IFwiRGVsaXZlcnlOYW1lXCIsXG5cdFx0XHRcdFwiVHlwZVwiOiBcIlRFWFRcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0XCJOYW1lXCI6IFwiRGVsaXZlcnlBZGRyZXNzQ2l0eVwiLFxuXHRcdFx0XHRcIlR5cGVcIjogXCJURVhUXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdFwiTmFtZVwiOiBcIkRlbGl2ZXJ5QWRkcmVzc0xpbmUxXCIsXG5cdFx0XHRcdFwiVHlwZVwiOiBcIlRFWFRcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0XCJOYW1lXCI6IFwiRGVsaXZlcnlBZGRyZXNzUG9zdGNvZGVcIixcblx0XHRcdFx0XCJUeXBlXCI6IFwiVEVYVFwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRcIk5hbWVcIjogXCJEZWxpdmVyeUFkZHJlc3NMaW5lMlwiLFxuXHRcdFx0XHRcIlR5cGVcIjogXCJURVhUXCJcblx0XHRcdH1cblx0XHRdXG5cdH1cbn07XG5cbiJdfQ==