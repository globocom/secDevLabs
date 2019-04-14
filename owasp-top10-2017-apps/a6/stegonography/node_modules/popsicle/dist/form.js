"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormData = require("form-data");
function form(obj) {
    var form = new FormData();
    if (obj) {
        Object.keys(obj).forEach(function (name) {
            form.append(name, obj[name]);
        });
    }
    return form;
}
exports.default = form;
//# sourceMappingURL=form.js.map