import { Observable } from 'rxjs/Observable';
import { Item } from './../../../shared/models/item.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as common from "./";
import * as shared from "../../../shared";

@Injectable()
export class HomeViewStore {
    private _items$: BehaviorSubject<shared.Item[]>;
    private _currentItem$: BehaviorSubject<shared.Item>;

    constructor(
        private _service: common.HomeViewService
    ) {
        this._items$ = new BehaviorSubject([]);
        this._currentItem$ = new BehaviorSubject({
            id: "",
            data: {}
        });
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
                let arr: shared.Item[] = [];

                data.forEach(item => {
                    let newItem: shared.Item = {
                        "id": item.Id,
                        "data": item
                    };

                    arr.push(newItem);
                });

                this._items$.next([...arr]);
            }, (error) => {
                console.log(JSON.stringify(error));
            }
            );
    }

    reset() {
        let item: shared.Item = {
            id: "",
            data: {}
        };

        this._currentItem$.next(item);
    }

    select(item: shared.Item) {
        this._currentItem$.next(item);
    }

    add(item: shared.Item) {
        this._service.post(item.data)
            .subscribe(
            (data) => {
                let arr: shared.Item[] = this._items$.getValue();

                if (!data.Id) {
                    return;
                }
                item.id = data.Id;

                arr.push(item);
                this._items$.next([...arr]);
            }, (error) => {
                console.log(JSON.stringify(error));
            }
            );
    }

    update(item: shared.Item) {
        this._service.put(item.data)
            .subscribe(
            (data) => {
                let arr: shared.Item[] = this._items$.getValue();

                arr.forEach((itm, idx) => {
                    if (itm.id === item.id) {
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

    delete(item: shared.Item) {
        this._service.delete(item.data)
            .subscribe(
            (data) => {
                let arr: shared.Item[] = this._items$.getValue();

                arr.forEach((itm, idx) => {
                    if (itm.id === item.id) {
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

    save(item: shared.Item) {
        (item.id) ? this.update(item) : this.add(item);
    }

}