import { Component, OnInit, NgZone, EventEmitter } from "@angular/core";
import { DeliveriesService } from './shared/services';
import * as connectivity from "connectivity";
import * as shared from "./shared";
import { NotificationService } from "./shared/services";
import { constants } from './shared';

import { HomeViewStore } from "./modules/homeView/shared";

const onlineConnectionMessage = "You are working online";
const offlineConnectionMessage = "You are working offline";

@Component({
	moduleId: module.id,
	selector: "ns-main",
	templateUrl: "app.component.html",
	providers: [DeliveriesService]
})

export class AppComponent implements OnInit {

	public connectionType: string = "Connection Status";
	public connectionMessage: string = "";
	public synchronizationStatus: string = "Synchronization Status";
	public synchronizationCompleted: boolean = false;

	constructor(private _provider: shared.backendServicesService, private zone: NgZone, private _notificationService: NotificationService, private _store: HomeViewStore) {
	}

	ngOnInit() {
		this.addConectivityListeners();
		this.addSyncEventListeners();
	};

	addSyncEventListeners() {
		var self = this;

		this._provider.instance.on('syncStart', function (syncStartInfo) {
			self.zone.run(() => {
				self.synchronizationStatus = "Synchronization started successfully";
				if (syncStartInfo.canceled) {
					self.synchronizationStatus = "Synchronization canceled by user";
				}
			});
		});

		this._provider.instance.on('syncEnd', function (syncEndInfo) {

			// self._eventsService.on('sync-completed', function (info) {
			// 	console.log("Sync completed from app component" + info);
			// })

			self._store.loadAll(); // TODO - use a better service for this // rebinds the UI

		//	self._eventsService.broadcast('sync-completed', true);

			self.zone.run(() => {
				self.synchronizationCompleted = true;
				var synchronizationStatusMessage = "Sync completed." + "To server: " + syncEndInfo.syncedToServer + " From server: " + syncEndInfo.syncedToClient;

				if (syncEndInfo.failedItems[constants.deliveriesContentTypeName]) {
					// TODO // see the error property too 
				}

				self._notificationService.success(synchronizationStatusMessage);

			});
		});
	}

	addConectivityListeners() {
		connectivity.startMonitoring((newConnectionType: number) => {

			this.zone.run(() => {
				switch (newConnectionType) {
					case connectivity.connectionType.none:
						this.connectionMessage = offlineConnectionMessage;
						this._provider.instance.offline();
						break;
					case connectivity.connectionType.wifi:
						this.connectionMessage = onlineConnectionMessage;
						this._provider.instance.online();
						this._provider.instance.sync();
						break;
					case connectivity.connectionType.mobile:
						this.connectionMessage = onlineConnectionMessage;
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