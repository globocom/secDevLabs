"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_1 = require("./support/cli");
var typings_core_1 = require("typings-core");
function help() {
    return "\ntypings list\n\nOptions:\n  [--production] List only production dependencies (omit dev dependencies)\n\nAliases: la, ll, ls\n";
}
exports.help = help;
function exec(args, options) {
    return cli_1.spinner(typings_core_1.list(options))
        .then(function (tree) {
        console.log(cli_1.archifyDependencyTree({ tree: tree, unicode: options.unicode }));
    });
}
exports.exec = exec;
//# sourceMappingURL=bin-list.js.map