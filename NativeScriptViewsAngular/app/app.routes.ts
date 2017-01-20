import {
    Routes
}
from "@angular/router";

import {
    HomeViewComponent
}
from "./modules/homeView/homeView.component";

export const appRoutes: Routes = [

    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    }, {
        path: "home",
        component: HomeViewComponent
    }

];