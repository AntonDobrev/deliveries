import {
    Component, OnInit
}
from "@angular/core";

// import { backendServicesService } from "./shared";
import { DeliveriesService } from './shared/services';

@
Component({
    moduleId: module.id,
    selector: "ns-main",
    templateUrl: "app.component.html",
	 providers: [DeliveriesService]
})
export class AppComponent implements OnInit {

	private _deliveries: DeliveriesService; 

	 constructor(private _deliveriesService: DeliveriesService) {
		 this._deliveries = _deliveriesService; 
	 }

	ngOnInit () {
		console.log("onInit");

		 this._deliveries.getItemsCount().then(itemsCount => {
				 console.log("OK items count");
}, this.onCountError);

	};

	onCountError(err) {
		console.log("Cannot retrieve items count");
		// TODO - init logic here
	}
}