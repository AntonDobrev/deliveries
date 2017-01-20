import {
    Injectable
}
from "@angular/core";

import {
    Observable
}
from "rxjs/Observable";
import * as common from "./";
/// service imports

import * as shared from "../../../shared";

@
Injectable()
export class HomeViewService {

    private _data: any;

    constructor(
        private _provider: shared.backendServicesService
    ) {
        this._data = _provider.instance.data("DeliveryOrder");
    }

    get provider() {
        return this._provider.instance;
    }

    getAll(): Observable < any > {
        let promise: Promise < any > = new Promise(
            (resolve, reject) => {
                this._data
                    .get()
                    .then(data => resolve(data.result || []))
                    .catch(error => reject(error));
            }
        );

        return Observable.fromPromise(promise);
    }

    put(item: any): Observable < any > {
        let promise: Promise < any > = new Promise(
            (resolve, reject) => {
                this._data
                    .updateSingle(item)
                    .then(data => resolve(data || {}))
                    .catch(error => reject(error));
            }
        );

        return Observable.fromPromise(promise);
    }

    /// service class

}