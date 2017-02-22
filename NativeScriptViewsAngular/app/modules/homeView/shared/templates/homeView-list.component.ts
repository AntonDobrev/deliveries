import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Page } from 'ui/page';

import * as common from "./";
import * as shared from "../../../../shared";

@Component({
    moduleId: module.id,
    selector: ".main-container",
    templateUrl: "homeView-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewListComponent implements OnInit {
    @Input() provider: any;
    @Input() items: any;

    @Output() select = new EventEmitter();
    @Output() navigate = new EventEmitter();

    constructor(private _page: Page) {

    }
    ngOnInit() {
        this._page.actionBar.title = "Delivery Orders";
    }
    onSelect(item: shared.Item) {
        this.select.emit({
            item: item
        });
    }

    onAdd() {
        this.navigate.emit();
    }
}