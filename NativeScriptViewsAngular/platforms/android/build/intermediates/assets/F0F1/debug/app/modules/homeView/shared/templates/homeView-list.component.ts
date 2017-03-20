import { Delivery } from './../../../../shared/models/delivery.model';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, ElementRef , ViewChild} from "@angular/core";
import { Page } from 'ui/page';

import * as common from "./";
import * as shared from "../../../../shared";

import { SearchBar } from "ui/search-bar";
import { isAndroid } from "platform";

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

    @ViewChild("sb") _searchBar: ElementRef;


    public searchPhrase: string;

    constructor(private _page: Page) {

    }
    ngOnInit() {
        this._page.actionBar.title = "Delivery Orders";
    }
    onSelect(item: Delivery) {
        this.select.emit({
            item: item
        });
    }

    public onChange(value) {
    }

    public onClear() {
        this.searchPhrase = "";
    }

    public onSearchBarLoaded() {
        if (isAndroid) {
            this._searchBar.nativeElement.android.setQuery("", false);
            this._searchBar.nativeElement.android.clearFocus();
            this._searchBar.nativeElement.android.onActionViewCollapsed();
        }
    }
}