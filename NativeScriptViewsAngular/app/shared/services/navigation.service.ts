import {
    Injectable
}
from "@angular/core";
import {
    Router
}
from "@angular/router";

import {
    BehaviorSubject
}
from "rxjs";

import {
    NavigationModes
}
from "../enums";
import {
    NavigationItem
}
from "../models";

@
Injectable()
export class NavigationService {
    private _modes = NavigationModes;
    private _mode: NavigationModes;
    private _routes: NavigationItem[];

    private _openDrawer$: BehaviorSubject < boolean > ;

    constructor(
        private _router: Router
    ) {
        this._mode = this._modes.NONE;
        this._routes = [
            /// start navigation routes
           			{ path: "homeView", title: "Deliveries", icon: "\uf015" },
 /// end navigation routes
        ];

        this._openDrawer$ = new BehaviorSubject < boolean > (false);
    }

    get mode(): NavigationModes {
        return this._mode;
    }

    get routes(): NavigationItem[] {
        return this._routes;
    }

    get openDrawer$() {
        return this._openDrawer$.asObservable();
    }

    navigateIndex() {
        this._router.navigate(["/"]);
    }

    navigate(path: string) {
        this._router.navigate(["/" + path]);
    }

    toggleDrawer() {
        this._openDrawer$.next(!this._openDrawer$.getValue());
    }
}