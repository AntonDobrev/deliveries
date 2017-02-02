"use strict";
var homeView_component_1 = require("./modules/homeView/homeView.component");
exports.appRoutes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    }, {
        path: "home",
        component: homeView_component_1.HomeViewComponent
    }
];
//# sourceMappingURL=app.routes.js.map