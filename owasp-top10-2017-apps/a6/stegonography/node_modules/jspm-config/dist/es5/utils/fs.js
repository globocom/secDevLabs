"use strict";
var fs = require("graceful-fs");
var Promise = require("any-promise");
var thenify = require("thenify");
var stripBom = require("strip-bom");
var parse = require("parse-json");
var Throat = require("throat");
var throat = Throat(Promise);
/**
 * Parse a string as JSON.
 */
function parseJson(contents, path, allowEmpty) {
    if (contents === '' && allowEmpty) {
        return {};
    }
    return parse(contents, undefined, path);
}
exports.parseJson = parseJson;
/**
 * Read JSON from a path.
 */
function readJson(path, allowEmpty) {
    if (allowEmpty === void 0) { allowEmpty = false; }
    return exports.readFile(path, 'utf8')
        .then(stripBom)
        .then(function (contents) { return parseJson(contents, path, allowEmpty); });
}
exports.readJson = readJson;
exports.readFile = throat(10, thenify(fs.readFile));
//# sourceMappingURL=fs.js.map