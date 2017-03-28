import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import {
  ActionBarComponent,
  IfAndroidDirective,
  IfIosDirective,
  HyperlinkDirective,
  FilteredItemsPipe,
  SearchPipe,
  ToStringStatusPipe,
  BackendServicesService,
  NavigationService,
  NotificationService
} from "./";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule
  ],
  declarations: [
    /// additional declarations
    ActionBarComponent,
    IfAndroidDirective,
    IfIosDirective,
    HyperlinkDirective,
    FilteredItemsPipe,
    SearchPipe,
    ToStringStatusPipe
  ],
  exports: [
    /// additional exports
    ActionBarComponent,
    IfAndroidDirective,
    IfIosDirective,
    HyperlinkDirective,
    FilteredItemsPipe,
    SearchPipe,
    ToStringStatusPipe
  ],
  providers: [
    /// start additional data provider services
    BackendServicesService,
    /// end additional data provider services
    NavigationService,
    NotificationService

  ]
})
export class SharedModule { }
