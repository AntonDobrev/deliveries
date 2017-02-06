import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";
import { HomeViewModule as NavigationModule } from "./modules/homeView/homeView.module";
import { NotificationService } from "./shared/services";

@NgModule({
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