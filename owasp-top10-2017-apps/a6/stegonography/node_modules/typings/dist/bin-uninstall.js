"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var typings_core_1 = require("typings-core");
var cli_1 = require("./support/cli");
function help() {
    return "\ntypings uninstall <name> [--save|--save-dev|--save-peer] [--global]\n\nOptions:\n  [--save|-S]       Remove from \"dependencies\"\n  [--save-dev|-D]   Remove from \"devDependencies\"\n  [--save-peer|-P]  Remove from \"peerDependencies\"\n  [--global|-G]     Remove from the global version of dependencies\n    [-SG]           Remove from \"globalDependencies\"\n    [-DG]           Remove from \"globalDevDependencies\"\n\nAliases: r, rm, remove, un\n";
}
exports.help = help;
function exec(args, options) {
    if (args.length === 0) {
        cli_1.logError(help());
        return;
    }
    return cli_1.spinner(typings_core_1.uninstallDependencies(args, options))
        .then(function (result) {
        Object.keys(result.resolutions).forEach(function (name) {
            args.forEach(function (arg) {
                console.log("- " + arg + " " + chalk.grey("(" + name + ")"));
            });
        });
    });
}
exports.exec = exec;
//# sourceMappingURL=bin-uninstall.js.map