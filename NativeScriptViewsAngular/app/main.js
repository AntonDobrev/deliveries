"use strict";
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./app.module");
var app = require('application');
app.on(app.launchEvent, function (args) {
    console.log("Application launched ");
});
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map