import { Component, OnInit, NgZone, EventEmitter } from "@angular/core";
import { DeliveriesService } from './shared/services';
import * as connectivity from "connectivity";
import { BackendServicesService } from "./shared";
import { NotificationService } from "./shared/services";
import { constants } from './shared';
import { Page } from 'ui/page';

import { HomeViewStore } from "./modules/homeView/shared";

const onlineConnectionMessage = "Online.";
const offlineConnectionMessage = "Offline.";

@Component({
	moduleId: module.id,
	selector: "ns-main",
	templateUrl: "app.component.html",
	providers: [DeliveriesService]
})

export class AppComponent implements OnInit {

	public connectionStatus: string = "";
	public synchronizationStatus: string = "";
	public synchronizationCompleted: boolean = false;

	constructor(
		private _provider: BackendServicesService,
		private _page: Page,
		private zone: NgZone,
		private _notificationService: NotificationService,
		private _store: HomeViewStore
	) {}

	ngOnInit() {
		this.addConectivityListeners();
		this.addSyncEventListeners();

		let message = this._page.getViewById("message");
		// console.log(message);

		message.animate({
			opacity: 0,
			duration: 3000
		})
		.then(() => {
			message.visibility = 'collapsed';
		});
	};

	addSyncEventListeners() {
		this._provider.instance.on('syncStart', (syncStartInfo) => {
			this.zone.run(() => {
				this.synchronizationStatus = "Synchronization started.";
				if (syncStartInfo.canceled) {
					this.synchronizationStatus = "Synchronization canceled by user";
				}
			});
		});

		this._provider.instance.on('syncEnd', (syncEndInfo) => {
			this._store.loadAll(); // TODO - use a better service for this // rebinds the UI

			this.zone.run(() => {
				this.synchronizationCompleted = true;
				this.synchronizationStatus = "Synchronization completed."; // TODO - is this needed?

				if (syncEndInfo.failedItems[constants.deliveriesContentTypeName]) {
					this._notificationService.error(syncEndInfo.error.message);
				} else if (syncEndInfo.error) {
					this._notificationService.error(syncEndInfo.error.message);
				} else {
					let synchronizationStatusMessage = "Sync completed. To server: " + syncEndInfo.syncedToServer + ". From server: " + syncEndInfo.syncedToClient;
					this._notificationService.success(synchronizationStatusMessage);
				}
			});
		});
	}

	addConectivityListeners() {
		connectivity.startMonitoring((newConnectionType: number) => {
			this.zone.run(() => {
				switch (newConnectionType) {
					case connectivity.connectionType.none:
						this.connectionStatus = offlineConnectionMessage;
						this._provider.instance.offline();
						break;
					case connectivity.connectionType.wifi:
					case connectivity.connectionType.mobile:
						this.connectionStatus = onlineConnectionMessage;
						this._provider.instance.online();
						this._provider.instance.sync();
						break;
					default:
						break;
				}
			});
		});
	};
}