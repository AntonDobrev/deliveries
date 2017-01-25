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
    selector: "ns-aboutView",
    templateUrl: "aboutView.component.html"
        /// component definitions
})

// START_CUSTOM_CODE_aboutView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_aboutView
export class AboutViewComponent
/// component inheritance
{
    /// component additional properties
    constructor(
            /// component constructor dependencies
            private _service: common.AboutViewService
        ) {
            /// component constructor method
        }
        /// component additional methods
}