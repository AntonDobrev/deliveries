import { Injectable } from "@angular/core";
import * as common from "./";
import { BackendServicesService } from "../../../shared";
import { constants } from '../../../shared';
import { Delivery } from './../../../shared/models/delivery.model';
import { Data } from '../../../../node_modules/everlive-sdk/dist/declarations/everlive/types/Data';

@Injectable()
export class HomeViewService {

    private _data: Data<Delivery>;

    constructor(
        private _provider: BackendServicesService,
    ) {
        this._data = _provider.instance.data(constants.deliveriesContentTypeName);
    }

    get provider() {
        return this._provider.instance;
    }

    getAll() {
        return this._data.get();
    }

    post(item: Delivery) {
        return this._data.create(item);
    }

    put(item: { Id: string }) {
        return this._data.updateSingle(item);
    }

    delete(item: { Id: string }) {
        return this._data.destroySingle(item);
    }
}
