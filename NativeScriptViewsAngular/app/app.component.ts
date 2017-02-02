import { Component, OnInit } from "@angular/core";
import { DeliveriesService } from './shared/services';
import * as connectivity from "connectivity";
import { NotificationService } from "./shared/services";
import * as Dialogs from "ui/dialogs";
import * as shared from "./shared/providers";

@Component({
	moduleId: module.id,
	selector: "ns-main",
	templateUrl: "app.component.html",
	providers: [DeliveriesService]
})

export class AppComponent implements OnInit {
	public connectionType: string = "Connection Status";

	private _deliveries: DeliveriesService;

	constructor(private _deliveriesService: DeliveriesService, private _provider: shared.backendServicesService) {
		this._deliveries = _deliveriesService;
	}

	ngOnInit() {
		console.log("onInit"); // TODO
		this.addConectivityListeners();
		this.addSyncEventListeners();
		this._deliveries.getItemsCount().then(itemsCount => {
			console.log("OK items count");
		}, this.onCountError);

	};

	addSyncEventListeners() {
		this._provider.instance.on('syncStart', function () {
			//	Dialogs.alert("Sync started");
		});

		this._provider.instance.on('syncEnd', function (syncInfo) {
			Dialogs.alert("Sync ended" + JSON.stringify(syncInfo));
		});
	}

	addConectivityListeners() {
		connectivity.startMonitoring((newConnectionType: number) => {
			switch (newConnectionType) {
				case connectivity.connectionType.none:
					this.connectionType = "None"; //0
					this._provider.instance.offline();
					Dialogs.alert("Connection changed to " + this.connectionType);
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

	onCountError(err) {
		console.log("Cannot retrieve items count");
		// TODO - remove
	}
}