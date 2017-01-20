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
	public connectionType: string;

	constructor(private _provider: shared.backendServicesService) {
		this.addConectivityListeners();
		this.addSyncEventListeners();
	}

	addSyncEventListeners() {
		this._provider.instance.on('syncStart', function(){
		//	Dialogs.alert("Sync started");
		});

		this._provider.instance.on('syncEnd', function(syncInfo){
			Dialogs.alert("Sync ended" + JSON.stringify(syncInfo));
		});
	}

	addConectivityListeners() {
		connectivity.startMonitoring((newConnectionType: number) => {
			switch (newConnectionType) {
				case connectivity.connectionType.none:
					this.connectionType = "None"; //0
					this._provider.instance.offline();
				//	Dialogs.alert("Connection changed to " + this.connectionType);


					break;
				case connectivity.connectionType.wifi:
					this.connectionType = "Wi-Fi"; // 1
					

					this._provider.instance.online();
					 this._provider.instance.sync();

					break;
				case connectivity.connectionType.mobile:
					this.connectionType = "Mobile";
						this._provider.instance.online();
					 this._provider.instance.sync();

					

					break;
				default:
					break;
			}
		});
	};
}