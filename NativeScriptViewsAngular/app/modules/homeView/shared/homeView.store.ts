import { Observable } from 'rxjs/Observable';
import { Delivery } from './../../../shared/models/delivery.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as common from "./";
import * as shared from "../../../shared";

@Injectable()
export class HomeViewStore {
    private _items$: BehaviorSubject<Delivery[]>;
    private _currentItem$: BehaviorSubject<Delivery>;

    constructor(
        private _service: common.HomeViewService
    ) {
        this._items$ = new BehaviorSubject([]);
        this._currentItem$ = new BehaviorSubject(new Delivery);
    }

    get provider() {
        return this._service.provider;
    }

    get items$() {
        return this._items$.asObservable();
    }

    get currentItem$() {
        return this._currentItem$.asObservable();
    }

    loadAll() {
        this._service.getAll()
            .subscribe(
            (data) => {
                let arr: Delivery[] = [];

                data.forEach(item => {
                    let newItem: Delivery = item;

                    arr.push(newItem);
                });
                this._items$.next([...arr]);
            }, (error) => {
                console.log(JSON.stringify(error));
            }
            );
    }

    reset() {
        let item: Delivery = new Delivery;

        this._currentItem$.next(item);
    }

    select(item: Delivery) {
        this._currentItem$.next(item);
    }

    add(item: Delivery) {
        this._service.post(item)
            .subscribe(
            (data) => {
                let arr: Delivery[] = this._items$.getValue();

                if (!data.Id) {
                    return;
                }
                item.Id = data.Id;

                arr.push(item);
                this._items$.next([...arr]);
            }, (error) => {
                console.log(JSON.stringify(error));
            }
            );
    }

    update(item: Delivery) {
        this._service.put(item)
            .subscribe(
            (data) => {
                let arr: Delivery[] = this._items$.getValue();

                arr.forEach((itm, idx) => {
                    if (itm.Id === item.Id) {
                        arr[idx] = item;
                    }
                });

                this._items$.next([...arr]);
                this.select(item);
            }, (error) => {
                console.log(JSON.stringify(error));
            }
            );
    }

    delete(item: Delivery) {
        this._service.delete(item)
            .subscribe(
            (data) => {
                let arr: Delivery[] = this._items$.getValue();

                arr.forEach((itm, idx) => {
                    if (itm.Id === item.Id) {
                        arr.splice(idx, 1);
                    }
                });

                this._items$.next([...arr]);
                this.reset();
            }, (error) => {
                console.log(JSON.stringify(error));
            }
            );
    }

    save(item: Delivery) {
        (item.Id) ? this.update(item) : this.add(item);
    }

}