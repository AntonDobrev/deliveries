import { Observable } from 'rxjs/Observable';
import { Delivery } from './../../../shared/models/delivery.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HomeViewService } from "./";
import * as shared from "../../../shared";

@Injectable()
export class HomeViewStore {
    private _items$: BehaviorSubject<Delivery[]>;
    private _currentItem$: BehaviorSubject<Delivery>;

    constructor(
        private _homeViewService: HomeViewService
    ) {
        this._items$ = new BehaviorSubject([]);
        this._currentItem$ = new BehaviorSubject(new Delivery);
    }

    get provider() {
        return this._homeViewService.provider;
    }

    get items$() {
        return this._items$.asObservable();
    }

    get currentItem$() {
        return this._currentItem$.asObservable();
    }

    loadAll() {
        this._homeViewService.getAll()
            .then(data => {
                this._items$.next([...data.result]);
            }, error => {
                console.log(JSON.stringify(error));
            });
    }

    reset() {
        let item: Delivery = new Delivery();
        this._currentItem$.next(item);
    }

    select(item: Delivery) {
        this._currentItem$.next(item);
    }

    add(newDelivery: Delivery) {
        this._homeViewService.post(newDelivery)
            .then((data) => {
                let deliveries = this._items$.getValue();

                if (!data.result.Id) {
                    return;
                }

                newDelivery.Id = data.result.Id;
                deliveries.unshift(newDelivery);
                this._items$.next([...deliveries]);
            }, (error) => {
                console.log(JSON.stringify(error));
            });
    }

    update(updatedDelivery: Delivery) {
        this._homeViewService.put(updatedDelivery)
            .then(data => {
                let deliveries = this._items$.getValue();

                deliveries.forEach((delivery, idx) => {
                    if (delivery.Id === updatedDelivery.Id) {
                        deliveries[idx] = updatedDelivery;
                    }
                });

                this._items$.next([...deliveries]);
                this.select(updatedDelivery);
            }, error => {
                console.log(JSON.stringify(error));
            });
    }

    delete(deletedDelivery: Delivery) {
        this._homeViewService.delete(deletedDelivery)
            .then(data => {
                let deliveries = this._items$.getValue();

                deliveries.forEach((delivery, idx) => {
                    if (delivery.Id === deletedDelivery.Id) {
                        deliveries.splice(idx, 1);
                    }
                });

                this._items$.next([...deliveries]);
                this.reset();
            }, error => {
                console.log(JSON.stringify(error));
            });
    }

    save(delivery: Delivery) {
        (delivery.Id) ? this.update(delivery) : this.add(delivery);
    }
}
