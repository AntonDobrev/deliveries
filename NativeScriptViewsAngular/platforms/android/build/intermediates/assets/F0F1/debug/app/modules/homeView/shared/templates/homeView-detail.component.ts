import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Delivery } from './../../../../shared/models/delivery.model';
import * as common from "./";
import * as shared from "../../../../shared";
import { Page } from 'ui/page';

import { OrderStatus } from "../../../../shared/enums";


@Component({
    moduleId: module.id,
    selector: "ns-homeView-detail",
    templateUrl: "homeView-detail.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewDetailComponent implements OnInit {

    @Input() provider: any;
    @Input() set current(value: Delivery) {
        this.item = (<any>Object).assign({}, value);
    }

    @Output() navigate = new EventEmitter();

    item: Delivery;

    itemStatus: string;

    constructor(private _page: Page) { }

    ngOnInit() {
        this._page.actionBar.title = this.item.DeliveryItem;
        this.itemStatus = OrderStatus[this.item.Status];
    }

    onEdit() {
        this.navigate.emit();
    }
}