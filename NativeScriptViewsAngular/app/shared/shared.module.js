"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var forms_1 = require("nativescript-angular/forms");
var common = require("./");
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule
        ],
        declarations: [
            /// additional declarations
            common.ActionBarComponent,
            common.IfAndroidDirective,
            common.IfIosDirective,
            common.HyperlinkDirective,
            common.FilteredItemsPipe,
            common.SearchPipe,
            common.ToStringStatusPipe
        ],
        exports: [
            /// additional exports
            common.ActionBarComponent,
            common.IfAndroidDirective,
            common.IfIosDirective,
            common.HyperlinkDirective,
            common.FilteredItemsPipe,
            common.SearchPipe,
            common.ToStringStatusPipe
        ],
        providers: [
            /// start additional data provider services
            common.backendServicesService,
            /// end additional data provider services
            common.NavigationService,
            common.NotificationService
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF5QztBQUd6QywwREFBbUU7QUFDbkUsb0RBQXFFO0FBRXJFLDJCQUE2QjtBQW9DN0IsSUFBYSxZQUFZO0lBQXpCO0lBQTRCLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFBN0IsSUFBNkI7QUFBaEIsWUFBWTtJQWxDeEIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsNkJBQWtCO1lBQ2xCLCtCQUF1QjtTQUN4QjtRQUNELFlBQVksRUFBRTtZQUNaLDJCQUEyQjtZQUMzQixNQUFNLENBQUMsa0JBQWtCO1lBQ3pCLE1BQU0sQ0FBQyxrQkFBa0I7WUFDekIsTUFBTSxDQUFDLGNBQWM7WUFDckIsTUFBTSxDQUFDLGtCQUFrQjtZQUN6QixNQUFNLENBQUMsaUJBQWlCO1lBQ3hCLE1BQU0sQ0FBQyxVQUFVO1lBQ2pCLE1BQU0sQ0FBQyxrQkFBa0I7U0FDMUI7UUFDRCxPQUFPLEVBQUU7WUFDUCxzQkFBc0I7WUFDdEIsTUFBTSxDQUFDLGtCQUFrQjtZQUN6QixNQUFNLENBQUMsa0JBQWtCO1lBQ3pCLE1BQU0sQ0FBQyxjQUFjO1lBQ3JCLE1BQU0sQ0FBQyxrQkFBa0I7WUFDekIsTUFBTSxDQUFDLGlCQUFpQjtZQUN4QixNQUFNLENBQUMsVUFBVTtZQUNqQixNQUFNLENBQUMsa0JBQWtCO1NBQzFCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsMkNBQTJDO1lBQzNDLE1BQU0sQ0FBQyxzQkFBc0I7WUFDN0IseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxpQkFBaUI7WUFDeEIsTUFBTSxDQUFDLG1CQUFtQjtTQUUzQjtLQUNGLENBQUM7R0FDVyxZQUFZLENBQUk7QUFBaEIsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5cbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tIFwiLi9cIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAvLy8gYWRkaXRpb25hbCBkZWNsYXJhdGlvbnNcbiAgICBjb21tb24uQWN0aW9uQmFyQ29tcG9uZW50LFxuICAgIGNvbW1vbi5JZkFuZHJvaWREaXJlY3RpdmUsXG4gICAgY29tbW9uLklmSW9zRGlyZWN0aXZlLFxuICAgIGNvbW1vbi5IeXBlcmxpbmtEaXJlY3RpdmUsXG4gICAgY29tbW9uLkZpbHRlcmVkSXRlbXNQaXBlLFxuICAgIGNvbW1vbi5TZWFyY2hQaXBlLFxuICAgIGNvbW1vbi5Ub1N0cmluZ1N0YXR1c1BpcGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC8vLyBhZGRpdGlvbmFsIGV4cG9ydHNcbiAgICBjb21tb24uQWN0aW9uQmFyQ29tcG9uZW50LFxuICAgIGNvbW1vbi5JZkFuZHJvaWREaXJlY3RpdmUsXG4gICAgY29tbW9uLklmSW9zRGlyZWN0aXZlLFxuICAgIGNvbW1vbi5IeXBlcmxpbmtEaXJlY3RpdmUsXG4gICAgY29tbW9uLkZpbHRlcmVkSXRlbXNQaXBlLFxuICAgIGNvbW1vbi5TZWFyY2hQaXBlLFxuICAgIGNvbW1vbi5Ub1N0cmluZ1N0YXR1c1BpcGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgLy8vIHN0YXJ0IGFkZGl0aW9uYWwgZGF0YSBwcm92aWRlciBzZXJ2aWNlc1xuICAgIGNvbW1vbi5iYWNrZW5kU2VydmljZXNTZXJ2aWNlLFxuICAgIC8vLyBlbmQgYWRkaXRpb25hbCBkYXRhIHByb3ZpZGVyIHNlcnZpY2VzXG4gICAgY29tbW9uLk5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIGNvbW1vbi5Ob3RpZmljYXRpb25TZXJ2aWNlXG5cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUgeyB9XG4iXX0=