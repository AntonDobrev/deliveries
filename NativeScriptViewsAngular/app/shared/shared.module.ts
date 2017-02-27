import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import * as common from "./";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule
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
export class SharedModule { }
