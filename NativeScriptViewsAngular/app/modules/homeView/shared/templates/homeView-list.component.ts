import { Delivery } from './../../../../shared/models/delivery.model';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, ElementRef , ViewChild} from "@angular/core";
import { Page } from 'ui/page';

import { SearchBar } from "ui/search-bar";
import { isAndroid } from "platform";

@Component({
    moduleId: module.id,
    selector: ".main-container",
    templateUrl: "homeView-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewListComponent implements OnInit {
    public searchPhrase: string;

    @Input() items: Delivery[];
    @Output() select = new EventEmitter();
    @ViewChild("sb") _searchBar: ElementRef;

    constructor(private _page: Page) {}

    ngOnInit() {
        this._page.actionBar.title = "Delivery Orders";
    }

    onSelect(delivery: Delivery) {
        this.select.emit({
            item: delivery
        });
    }

    onChange(searchText: string) {
        this.searchPhrase = searchText;
    }

    onSearchBarLoaded() {
        if (isAndroid) {
            this._searchBar.nativeElement.android.setQuery("", false);
            this._searchBar.nativeElement.android.clearFocus();
            this._searchBar.nativeElement.android.onActionViewCollapsed();
        }
    }

    getStatusClassName(status: string) {
      return status.replace(/\s+/g, '-').toLowerCase();
    }

    getStatusIcon(status: number) {
        switch (status) {
            case 1:
                return String.fromCharCode(parseInt('62', 16)); // Pending

            case 2:
                return String.fromCharCode(parseInt('65', 16)); // In Progress

            case 3:
                return String.fromCharCode(parseInt('61', 16)); // Delivered

            case 4:
                return String.fromCharCode(parseInt('63', 16)); // Refused

            case 10:
                return String.fromCharCode(parseInt('64', 16)); // Lost

            default:
                break;
        }
    }
}
