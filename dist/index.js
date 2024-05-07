"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const seting_1 = require("./seting/seting");
app_1.app.listen(seting_1.SETTINGS.PORT, () => {
    console.log(`server  and  start`);
});
