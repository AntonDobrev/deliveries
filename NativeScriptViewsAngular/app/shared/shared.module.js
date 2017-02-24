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
            common.SearchPipe
        ],
        exports: [
            /// additional exports
            common.ActionBarComponent,
            common.IfAndroidDirective,
            common.IfIosDirective,
            common.HyperlinkDirective,
            common.FilteredItemsPipe,
            common.SearchPipe
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF5QztBQUd6QywwREFBbUU7QUFDbkUsb0RBQXFFO0FBRXJFLDJCQUE2QjtBQWtDN0IsSUFBYSxZQUFZO0lBQXpCO0lBQTRCLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFBN0IsSUFBNkI7QUFBaEIsWUFBWTtJQWhDeEIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsNkJBQWtCO1lBQ2xCLCtCQUF1QjtTQUN4QjtRQUNELFlBQVksRUFBRTtZQUNaLDJCQUEyQjtZQUMzQixNQUFNLENBQUMsa0JBQWtCO1lBQ3pCLE1BQU0sQ0FBQyxrQkFBa0I7WUFDekIsTUFBTSxDQUFDLGNBQWM7WUFDckIsTUFBTSxDQUFDLGtCQUFrQjtZQUN6QixNQUFNLENBQUMsaUJBQWlCO1lBQ3hCLE1BQU0sQ0FBQyxVQUFVO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asc0JBQXNCO1lBQ3RCLE1BQU0sQ0FBQyxrQkFBa0I7WUFDekIsTUFBTSxDQUFDLGtCQUFrQjtZQUN6QixNQUFNLENBQUMsY0FBYztZQUNyQixNQUFNLENBQUMsa0JBQWtCO1lBQ3pCLE1BQU0sQ0FBQyxpQkFBaUI7WUFDeEIsTUFBTSxDQUFDLFVBQVU7U0FDbEI7UUFDRCxTQUFTLEVBQUU7WUFDVCwyQ0FBMkM7WUFDM0MsTUFBTSxDQUFDLHNCQUFzQjtZQUM3Qix5Q0FBeUM7WUFDekMsTUFBTSxDQUFDLGlCQUFpQjtZQUN4QixNQUFNLENBQUMsbUJBQW1CO1NBRTNCO0tBQ0YsQ0FBQztHQUNXLFlBQVksQ0FBSTtBQUFoQixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9wbGF0Zm9ybVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0ICogYXMgY29tbW9uIGZyb20gXCIuL1wiO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC8vLyBhZGRpdGlvbmFsIGRlY2xhcmF0aW9uc1xuICAgIGNvbW1vbi5BY3Rpb25CYXJDb21wb25lbnQsXG4gICAgY29tbW9uLklmQW5kcm9pZERpcmVjdGl2ZSxcbiAgICBjb21tb24uSWZJb3NEaXJlY3RpdmUsXG4gICAgY29tbW9uLkh5cGVybGlua0RpcmVjdGl2ZSxcbiAgICBjb21tb24uRmlsdGVyZWRJdGVtc1BpcGUsXG4gICAgY29tbW9uLlNlYXJjaFBpcGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC8vLyBhZGRpdGlvbmFsIGV4cG9ydHNcbiAgICBjb21tb24uQWN0aW9uQmFyQ29tcG9uZW50LFxuICAgIGNvbW1vbi5JZkFuZHJvaWREaXJlY3RpdmUsXG4gICAgY29tbW9uLklmSW9zRGlyZWN0aXZlLFxuICAgIGNvbW1vbi5IeXBlcmxpbmtEaXJlY3RpdmUsXG4gICAgY29tbW9uLkZpbHRlcmVkSXRlbXNQaXBlLFxuICAgIGNvbW1vbi5TZWFyY2hQaXBlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIC8vLyBzdGFydCBhZGRpdGlvbmFsIGRhdGEgcHJvdmlkZXIgc2VydmljZXNcbiAgICBjb21tb24uYmFja2VuZFNlcnZpY2VzU2VydmljZSxcbiAgICAvLy8gZW5kIGFkZGl0aW9uYWwgZGF0YSBwcm92aWRlciBzZXJ2aWNlc1xuICAgIGNvbW1vbi5OYXZpZ2F0aW9uU2VydmljZSxcbiAgICBjb21tb24uTm90aWZpY2F0aW9uU2VydmljZVxuXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHsgfVxuIl19