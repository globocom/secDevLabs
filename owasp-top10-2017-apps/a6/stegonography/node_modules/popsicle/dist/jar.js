"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tough_cookie_1 = require("tough-cookie");
function cookieJar(store) {
    return new tough_cookie_1.CookieJar(store);
}
exports.default = cookieJar;
//# sourceMappingURL=jar.js.map