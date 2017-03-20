"use strict";
var core_1 = require("@angular/core");
var dialogsModule = require("ui/dialogs");
var NotificationService = (function () {
    function NotificationService() {
    }
    NotificationService.prototype.error = function (message) {
        if (message === void 0) { message = "Message"; }
        return dialogsModule.alert({
            title: "Error",
            okButtonText: "OK",
            message: message
        });
    };
    NotificationService.prototype.warning = function (message) {
        if (message === void 0) { message = "Message"; }
        return dialogsModule.alert({
            title: "Warning",
            okButtonText: "OK",
            message: message
        });
    };
    NotificationService.prototype.success = function (message) {
        if (message === void 0) { message = "Message"; }
        return dialogsModule.alert({
            title: "Success",
            okButtonText: "OK",
            message: message
        });
    };
    NotificationService.prototype.confirm = function (message) {
        return dialogsModule.confirm({
            title: message,
            message: "Please confirm",
            okButtonText: "OK",
            cancelButtonText: "Cancel"
        });
    };
    return NotificationService;
}());
NotificationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLDBDQUE0QztBQUc1QyxJQUFhLG1CQUFtQjtJQUU5QjtJQUFnQixDQUFDO0lBRWpCLG1DQUFLLEdBQUwsVUFBTSxPQUEyQjtRQUEzQix3QkFBQSxFQUFBLG1CQUEyQjtRQUMvQixNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUN6QixLQUFLLEVBQUUsT0FBTztZQUNkLFlBQVksRUFBRSxJQUFJO1lBQ2xCLE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQ0FBTyxHQUFQLFVBQVEsT0FBMkI7UUFBM0Isd0JBQUEsRUFBQSxtQkFBMkI7UUFDakMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDekIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsWUFBWSxFQUFFLElBQUk7WUFDbEIsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFPLEdBQVAsVUFBUSxPQUEyQjtRQUEzQix3QkFBQSxFQUFBLG1CQUEyQjtRQUNqQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUN6QixLQUFLLEVBQUUsU0FBUztZQUNoQixZQUFZLEVBQUUsSUFBSTtZQUNsQixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUNBQU8sR0FBUCxVQUFRLE9BQWU7UUFDckIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDM0IsS0FBSyxFQUFFLE9BQU87WUFDZCxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGdCQUFnQixFQUFFLFFBQVE7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQztBQXBDWSxtQkFBbUI7SUFEL0IsaUJBQVUsRUFBRTs7R0FDQSxtQkFBbUIsQ0FvQy9CO0FBcENZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgZGlhbG9nc01vZHVsZSBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBlcnJvcihtZXNzYWdlOiBzdHJpbmcgPSBcIk1lc3NhZ2VcIikge1xuICAgIHJldHVybiBkaWFsb2dzTW9kdWxlLmFsZXJ0KHtcbiAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICBva0J1dHRvblRleHQ6IFwiT0tcIixcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIHdhcm5pbmcobWVzc2FnZTogc3RyaW5nID0gXCJNZXNzYWdlXCIpIHtcbiAgICByZXR1cm4gZGlhbG9nc01vZHVsZS5hbGVydCh7XG4gICAgICB0aXRsZTogXCJXYXJuaW5nXCIsXG4gICAgICBva0J1dHRvblRleHQ6IFwiT0tcIixcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nID0gXCJNZXNzYWdlXCIpIHtcbiAgICByZXR1cm4gZGlhbG9nc01vZHVsZS5hbGVydCh7XG4gICAgICB0aXRsZTogXCJTdWNjZXNzXCIsXG4gICAgICBva0J1dHRvblRleHQ6IFwiT0tcIixcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIGNvbmZpcm0obWVzc2FnZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGRpYWxvZ3NNb2R1bGUuY29uZmlybSh7XG4gICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgIG1lc3NhZ2U6IFwiUGxlYXNlIGNvbmZpcm1cIixcbiAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiLFxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxuICAgIH0pO1xuICB9XG59XG4iXX0=