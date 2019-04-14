"use strict";
var extend = require("xtend");
var path = require("path");
var readProjectConfig_1 = require("./readProjectConfig");
var error_1 = require("./error");
function resolveAll(options) {
    return readProjectConfig_1.readProjectConfig(options)
        .then(function (config) {
        var dependencyInfo = getDependencyInfo(config.jspmConfigs);
        return readMap(dependencyInfo.map, config.jspmPackageJson, dependencyInfo);
    });
}
exports.resolveAll = resolveAll;
function resolveByPackageJson(pjson, options) {
    return readProjectConfig_1.readJspmConfigs(pjson, options)
        .then(function (configs) {
        var dependencyInfo = getDependencyInfo(configs);
        return readMap(dependencyInfo.map, pjson, dependencyInfo);
    });
}
exports.resolveByPackageJson = resolveByPackageJson;
function resolve(moduleName, options) {
    return readProjectConfig_1.readProjectConfig(options)
        .then(function (config) {
        var dependencyInfo = getDependencyInfo(config.jspmConfigs);
        var packageName = dependencyInfo.map[moduleName];
        if (!packageName) {
            throw new error_1.ModuleNotFoundError(moduleName);
        }
        var map = readMap((_a = {}, _a[moduleName] = packageName, _a), config.jspmPackageJson, dependencyInfo);
        return map[moduleName];
        var _a;
    });
}
exports.resolve = resolve;
function readMap(map, pjson, dependencyInfo) {
    var paths = dependencyInfo.paths, packages = dependencyInfo.packages;
    var baseURL = pjson.directories && pjson.directories.baseURL;
    var result = {};
    for (var moduleName in map) {
        var node = {};
        var packageName = map[moduleName];
        node.path = path.join(baseURL || '', getModulePath(packageName, paths));
        var pkg = packages[packageName];
        if (pkg && pkg.map) {
            node.map = readMap(pkg.map, pjson, dependencyInfo);
        }
        result[moduleName] = node;
    }
    return result;
}
function getModulePath(packageName, paths) {
    for (var prefix in paths) {
        if (packageName.indexOf(prefix) === 0) {
            return packageName.replace(prefix, paths[prefix]);
        }
    }
    return packageName;
}
function getDependencyInfo(jspmConfigs) {
    var config = extend(jspmConfigs.browser, jspmConfigs.dev, jspmConfigs.jspm, jspmConfigs.node);
    return {
        paths: config.paths,
        map: config.map,
        packages: config.packages
    };
}
//# sourceMappingURL=resolve.js.map