import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from "@angular/core";
import * as common from "./";
import * as shared from "../../../../shared";
import { Page } from 'ui/page';

@Component({
    moduleId: module.id,
    selector: "ns-homeView-detail",
    templateUrl: "homeView-detail.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewDetailComponent implements OnInit {
    @Input() provider: any;
    @Input() set current(value: shared.Item) {
        this.item = (<any>Object).assign({}, value);
    }

    @Output() navigate = new EventEmitter();

    item: shared.Item;

    constructor(private _page: Page) { }

    ngOnInit() {
        this._page.actionBar.title = this.item.data.DeliveryItem;
    }

    onEdit() {
        this.navigate.emit();
    }
}