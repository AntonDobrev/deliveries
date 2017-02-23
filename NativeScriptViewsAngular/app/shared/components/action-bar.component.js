"use strict";
var core_1 = require("@angular/core");
var enums_1 = require("../enums");
var services_1 = require("../services");
var ActionBarComponent = (function () {
    function ActionBarComponent(_navigationService) {
        this._navigationService = _navigationService;
        this.back = new core_1.EventEmitter();
        this._modes = enums_1.NavigationModes;
        this._mode = _navigationService.mode;
        if (this._mode === this._modes.DRAWER) {
            this.showDrawer = true;
            this.showIndex = false;
        }
        else if (this._mode === this._modes.LISTMENU) {
            this.showDrawer = false;
            this.showIndex = true;
        }
        else {
            this.showDrawer = false;
            this.showIndex = false;
        }
    }
    ActionBarComponent.prototype.onIndex = function () {
        this._navigationService.navigateIndex();
    };
    ActionBarComponent.prototype.onDrawer = function () {
        this._navigationService.toggleDrawer();
    };
    ActionBarComponent.prototype.onBack = function () {
        this.back.emit();
    };
    return ActionBarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ActionBarComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ActionBarComponent.prototype, "showBack", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ActionBarComponent.prototype, "showDrawer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ActionBarComponent.prototype, "showIndex", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ActionBarComponent.prototype, "back", void 0);
ActionBarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "ns-action-bar",
        templateUrl: "action-bar.component.html"
    }),
    __metadata("design:paramtypes", [services_1.NavigationService])
], ActionBarComponent);
exports.ActionBarComponent = ActionBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rpb24tYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXVFO0FBRXZFLGtDQUEyQztBQUMzQyx3Q0FBZ0Q7QUFPaEQsSUFBYSxrQkFBa0I7SUFXM0IsNEJBQ1ksa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFOdkMsU0FBSSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRTVCLFdBQU0sR0FBRyx1QkFBZSxDQUFDO1FBTTdCLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFRCxvQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBdENZO0lBQVIsWUFBSyxFQUFFOztpREFBZTtBQUNkO0lBQVIsWUFBSyxFQUFFOztvREFBbUI7QUFDbEI7SUFBUixZQUFLLEVBQUU7O3NEQUFxQjtBQUNwQjtJQUFSLFlBQUssRUFBRTs7cURBQW9CO0FBRWxCO0lBQVQsYUFBTSxFQUFFOztnREFBMkI7QUFOM0Isa0JBQWtCO0lBTDlCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsUUFBUSxFQUFFLGVBQWU7UUFDekIsV0FBVyxFQUFFLDJCQUEyQjtLQUMzQyxDQUFDO3FDQWFrQyw0QkFBaUI7R0FaeEMsa0JBQWtCLENBdUM5QjtBQXZDWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IE5hdmlnYXRpb25Nb2RlcyB9IGZyb20gXCIuLi9lbnVtc1wiO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogXCJucy1hY3Rpb24tYmFyXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiYWN0aW9uLWJhci5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvbkJhckNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBzaG93QmFjazogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzaG93RHJhd2VyOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNob3dJbmRleDogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKSBiYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBfbW9kZXMgPSBOYXZpZ2F0aW9uTW9kZXM7XG4gICAgcHJpdmF0ZSBfbW9kZTogTmF2aWdhdGlvbk1vZGVzO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX25hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLl9tb2RlID0gX25hdmlnYXRpb25TZXJ2aWNlLm1vZGU7XG5cbiAgICAgICAgaWYgKHRoaXMuX21vZGUgPT09IHRoaXMuX21vZGVzLkRSQVdFUikge1xuICAgICAgICAgICAgdGhpcy5zaG93RHJhd2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0luZGV4ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbW9kZSA9PT0gdGhpcy5fbW9kZXMuTElTVE1FTlUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0RyYXdlciA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zaG93SW5kZXggPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93RHJhd2VyID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNob3dJbmRleCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbmRleCgpIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGVJbmRleCgpO1xuICAgIH1cblxuICAgIG9uRHJhd2VyKCkge1xuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uU2VydmljZS50b2dnbGVEcmF3ZXIoKTtcbiAgICB9XG5cbiAgICBvbkJhY2soKSB7XG4gICAgICAgIHRoaXMuYmFjay5lbWl0KCk7XG4gICAgfVxufVxuIl19