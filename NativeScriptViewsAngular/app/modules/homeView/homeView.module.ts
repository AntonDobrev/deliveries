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
    HomeViewComponent
}
from "./homeView.component";

import {
    NativeScriptRouterModule
}
from "nativescript-angular";
import {
    NativeScriptFormsModule
}
from "nativescript-angular/forms";
/// module additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@
NgModule({
    imports: [

        NativeScriptRouterModule,
        NativeScriptFormsModule,
        /// module imports declaration

        NativeScriptModule,
        SharedModule
    ],
    declarations: [

        common.HomeViewListComponent,
        common.HomeViewDetailComponent,

        common.HomeViewEditComponent,

        /// module declarations

        HomeViewComponent
    ],
    exports: [

        common.HomeViewListComponent,
        common.HomeViewDetailComponent,

        common.HomeViewEditComponent,

        /// module exports

        HomeViewComponent
    ],
    providers: [

        common.HomeViewStore,
        /// module providers

        common.HomeViewService
    ]
})

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
export class HomeViewModule {}