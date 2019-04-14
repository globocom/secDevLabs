"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typings_core_1 = require("typings-core");
var cli_1 = require("./support/cli");
function help() {
    return "\ntypings bundle --out <filepath>\n\nOptions:\n  [--out|-o] <filepath>  The bundled output file path\n  [--global|-G]          Bundle as a global definition\n";
}
exports.help = help;
function exec(args, options) {
    return cli_1.spinner(typings_core_1.bundle(options));
}
exports.exec = exec;
//# sourceMappingURL=bin-bundle.js.map