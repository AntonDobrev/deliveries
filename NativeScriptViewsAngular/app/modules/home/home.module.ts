import {
    NgModule
}
from "@angular/core";

import {
    NativeScriptModule
}
from "nativescript-angular/platform";

import {
    SharedModule
}
from "../../shared/shared.module";
import {
    HomeComponent
}
from "./home.component";
/// module additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@
NgModule({
    imports: [
        /// module imports declaration
        NativeScriptModule,
        SharedModule
    ],
    declarations: [
        /// module declarations
        HomeComponent
    ],
    exports: [
        /// module exports
        HomeComponent
    ],
    providers: [
        /// module providers
        common.HomeService
    ]
})

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
export class HomeModule {}