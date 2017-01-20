import {
    platformNativeScriptDynamic
}
from "nativescript-angular/platform";

import {
    AppModule
}
from "./app.module";

import app = require('application');

app.on(app.launchEvent, function (args: app.ApplicationEventData) {
	console.log("Application launched ");
});

platformNativeScriptDynamic().bootstrapModule(AppModule);