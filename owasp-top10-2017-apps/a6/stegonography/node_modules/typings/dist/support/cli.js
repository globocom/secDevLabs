"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var archy = require("archy");
var listify = require("listify");
var logUpdate = require("log-update");
var elegantSpinner = require("elegant-spinner");
var truncate = require("cli-truncate");
var os = require("os");
var promise_finally_1 = require("promise-finally");
var pkg = require('../../package.json');
var statusFrame;
var statusTimeout;
var statusMessage;
function log(message) {
    logUpdate.clear();
    console.error(message);
    render();
}
exports.log = log;
function formatLine(color, type, line, prefix) {
    return chalk.bgBlack.white('typings') + " " + color(type) + " " + (prefix ? chalk.magenta(prefix + " ") : '') + line;
}
var loglevels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    silent: 4
};
var loglevel = loglevels['info'];
function setLoglevel(level) {
    if (!loglevels.hasOwnProperty(level)) {
        logError("invalid log level (options are " + listify(Object.keys(loglevels)) + ")");
        return;
    }
    return (loglevel = loglevels[level]);
}
exports.setLoglevel = setLoglevel;
function logInfo(message, prefix) {
    if (loglevel > loglevels['info']) {
        return;
    }
    var output = message.split(/\r?\n/g).map(function (line) {
        return formatLine(chalk.bgBlack.cyan, 'INFO', line, prefix);
    }).join('\n');
    log(output);
}
exports.logInfo = logInfo;
function logWarning(message, prefix) {
    if (loglevel > loglevels['warn']) {
        return;
    }
    var output = message.split(/\r?\n/g).map(function (line) {
        return formatLine(chalk.bgYellow.black, 'WARN', line, prefix);
    }).join('\n');
    log(output);
}
exports.logWarning = logWarning;
function logError(message, prefix) {
    if (loglevel > loglevels['error']) {
        return;
    }
    var output = message.split(/\r?\n/g).map(function (line) {
        return formatLine(chalk.bgBlack.red, 'ERR!', line, prefix);
    }).join('\n');
    log(output);
}
exports.logError = logError;
function setStatus(message) {
    statusMessage = message;
}
exports.setStatus = setStatus;
function render() {
    clearInterval(statusTimeout);
    if (statusFrame && process.stdout.isTTY) {
        var status = chalk.cyan(statusFrame());
        if (statusMessage) {
            status += " " + statusMessage;
        }
        logUpdate(truncate(status, process.stdout.columns));
        statusTimeout = setTimeout(render, 50);
    }
}
exports.render = render;
function startSpinner() {
    statusFrame = elegantSpinner();
    render();
}
exports.startSpinner = startSpinner;
function stopSpinner() {
    clearTimeout(statusTimeout);
    statusFrame = undefined;
    statusTimeout = undefined;
    statusMessage = undefined;
    logUpdate.clear();
    logUpdate.done();
}
exports.stopSpinner = stopSpinner;
function spinner(promise) {
    startSpinner();
    return promise_finally_1.default(Promise.resolve(promise), stopSpinner);
}
exports.spinner = spinner;
function handle(promise, options) {
    return Promise.resolve(promise).catch(function (err) { return handleError(err, options); });
}
exports.handle = handle;
function handleError(error, options) {
    var cause = error.cause;
    logError(error.message, 'message');
    while (cause) {
        logError(cause.message, 'caused by');
        cause = cause.cause;
    }
    if (options.verbose && error.stack) {
        logError('');
        logError(error.stack, 'stack');
    }
    logError('');
    logError(process.cwd(), 'cwd');
    logError(os.type() + " " + os.release(), 'system');
    logError(process.argv.map(function (arg) { return JSON.stringify(arg); }).join(' '), 'command');
    logError(process.version, 'node -v');
    logError(pkg.version, "typings -v");
    if (error.code) {
        logError(error.code, 'code');
    }
    logError('');
    logError('If you need help, you may report this error at:');
    logError("  <https://github.com/typings/typings/issues>");
    process.exit(1);
}
exports.handleError = handleError;
function toDependencyName(name, node, suffix) {
    var fullname = node.version ? name + "@" + node.version : name;
    return suffix ? fullname + " " + suffix : fullname;
}
function archifyDependencyTree(options) {
    var result = {
        label: options.name ? toDependencyName(options.name, options.tree) : '',
        nodes: []
    };
    function children(nodes, dependencies, suffix) {
        for (var _i = 0, _a = Object.keys(dependencies).sort(); _i < _a.length; _i++) {
            var name = _a[_i];
            var tree_1 = dependencies[name];
            nodes.push(traverse({
                label: toDependencyName(name, tree_1, suffix),
                nodes: []
            }, tree_1));
        }
    }
    function traverse(result, tree) {
        var nodes = result.nodes;
        children(nodes, tree.dependencies);
        children(nodes, tree.devDependencies, chalk.gray('(dev)'));
        children(nodes, tree.peerDependencies, chalk.gray('(peer)'));
        children(nodes, tree.globalDependencies, chalk.gray('(global)'));
        children(nodes, tree.globalDevDependencies, chalk.gray('(global dev)'));
        return result;
    }
    var tree = traverse(result, options.tree);
    return archy(tree, '', { unicode: options.unicode });
}
exports.archifyDependencyTree = archifyDependencyTree;
//# sourceMappingURL=cli.js.map