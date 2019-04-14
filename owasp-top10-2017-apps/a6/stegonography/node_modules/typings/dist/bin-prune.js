"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typings_core_1 = require("typings-core");
var cli_1 = require("./support/cli");
function help() {
    return "\ntypings prune\n\nOptions:\n  [--production] Also prune non-production dependencies\n";
}
exports.help = help;
function exec(args, options) {
    return cli_1.spinner(typings_core_1.prune(options));
}
exports.exec = exec;
//# sourceMappingURL=bin-prune.js.map