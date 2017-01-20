import {
    Component
    /// component core modules
}
from "@angular/core";

import * as common from "./shared";
import * as shared from "../../shared";

@
Component({
    moduleId: module.id,
    selector: "ns-home",
    templateUrl: "home.component.html"
        /// component definitions
})

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
export class HomeComponent
/// component inheritance
{
    /// component additional properties
    constructor(
            /// component constructor dependencies
            private _service: common.HomeService
        ) {
            /// component constructor method
        }
        /// component additional methods
}