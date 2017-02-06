import { Component, OnInit, NgZone } from "@angular/core";
import { DeliveriesService } from './shared/services';
import * as connectivity from "connectivity";
import { NotificationService } from "./shared/services";
import * as Dialogs from "ui/dialogs";
import * as shared from "./shared/providers";

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

	private _deliveries: DeliveriesService;

	constructor(private _deliveriesService: DeliveriesService, private _provider: shared.backendServicesService, private zone: NgZone) {
		this._deliveries = _deliveriesService;
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
			self.zone.run(() => {
				self.synchronizationCompleted = true;
				self.synchronizationStatus = "Sync completed." + "Synced to server: " + syncEndInfo.syncedToServer;
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