import { NgModule } from "@angular/core";

import { NativeScriptModule } from "nativescript-angular/platform";

import { SharedModule } from "../../shared/shared.module";
import { HomeViewComponent } from "./homeView.component";

import { NativeScriptRouterModule } from "nativescript-angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
/// module additional imports

import {
    HomeViewListComponent,
    HomeViewDetailComponent,
    HomeViewAddComponent,
    HomeViewEditComponent,
    HomeViewStore,
    HomeViewService
} from "./shared";

@NgModule({
    imports: [

        NativeScriptRouterModule,
        NativeScriptFormsModule,
        /// module imports declaration

        NativeScriptModule,
        SharedModule
    ],
    declarations: [

        HomeViewListComponent,
        HomeViewDetailComponent,

        HomeViewAddComponent,

        HomeViewEditComponent,

        /// module declarations

        HomeViewComponent
    ],
    exports: [

        HomeViewListComponent,
        HomeViewDetailComponent,

        HomeViewAddComponent,

        HomeViewEditComponent,

        /// module exports

        HomeViewComponent
    ],
    providers: [

        HomeViewStore,
        /// module providers

        HomeViewService
    ]
})

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
export class HomeViewModule {}
