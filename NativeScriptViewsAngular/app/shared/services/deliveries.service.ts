import { Injectable } from '@angular/core';
import { backendServicesService } from "../providers";
import { Data } from '../../../../node_modules/everlive-sdk/dist/declarations/everlive/types/Data';


@Injectable()
export class DeliveriesService {

	private readonly _deliveriesContentTypeName:String = "DeliveryOrder";
	private _data: Data<any>; 	// TODO - create a DeliveryOrder model interface 

	constructor(private _backendProvider: backendServicesService) {
		this._data = this._backendProvider.instance.data(this._deliveriesContentTypeName);
	}

	getItemsCount(){

		return this._data.count({}).then(r => r.result);
	}

}