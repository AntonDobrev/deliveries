import { Injectable } from '@angular/core';
import { BackendServicesService } from "../providers";
import { Data } from '../../../node_modules/everlive-sdk/dist/declarations/everlive/types/Data'; // TODO manage the dependency in AB and NS
import { Delivery } from '../models';

@Injectable()
export class DeliveriesService {

	private readonly _deliveriesContentTypeName: string = "DeliveryOrder"; // TODO - should this be a constant
	private _data: Data<Delivery>; 	// TODO - create a DeliveryOrder model interface 

	constructor(private _backendProvider: BackendServicesService) {
		this._data = this._backendProvider.instance.data(this._deliveriesContentTypeName);
	}
}
