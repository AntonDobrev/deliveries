import {
	NgModule
}
	from "@angular/core";

import {
	NativeScriptModule
}
	from "nativescript-angular/platform";
import {
	NativeScriptRouterModule
}
	from "nativescript-angular/router";

import {
	appRoutes
}
	from "./app.routes";
import {
	AppComponent
}
	from "./app.component";

import {
	HomeViewModule as NavigationModule
}
	from "./modules/homeView/homeView.module";

import * as connectivity from "connectivity";

import { NotificationService } from "./shared/services";

import * as Dialogs from "ui/dialogs";

import * as shared from "./shared/providers";

@
	NgModule({
		imports: [
			NativeScriptModule,
			NativeScriptRouterModule,
			NativeScriptRouterModule.forRoot(appRoutes),
			NavigationModule
		],
		declarations: [
			AppComponent
		],
		bootstrap: [
			AppComponent
		]
	})

export class AppModule {
	
}