import { Delivery } from './../../../shared/models/delivery.model';
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as common from "./";
import * as shared from "../../../shared";
import { constants } from '../../../shared';

@Injectable()
export class HomeViewService {

    private _data: any;

    constructor(
        private _provider: shared.backendServicesService,
    ) {
        this._data = _provider.instance.data(constants.deliveriesContentTypeName);
        
    }

    get provider() {
        return this._provider.instance;
    }

    getAll(): Promise<any> {
        return this._data.get();
    }

    post(item: any): Promise<any> {
        return this._data.create(item);
    }

    put(item: any): Promise<any> {
        return this._data.updateSingle(item);
    }

    delete(item: any): Promise<any> {
        return this._data.destroySingle(item);
    }
}