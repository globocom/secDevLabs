"use strict";
var path = require("path");
var Promise = require("any-promise");
var extend = require("xtend");
var pick = require("object.pick");
var fs_1 = require("./utils/fs");
var constants_1 = require("./constants");
var error_1 = require("./error");
var ConfigReader_1 = require("./ConfigReader");
function readProjectConfig(options) {
    return readJspmPackageJson(options)
        .then(function (jspmPackageJson) {
        return Promise.all([
            readJspmConfigs(jspmPackageJson, options),
            readDependenciesJson(jspmPackageJson, options)
        ])
            .then(function (results) {
            return {
                jspmPackageJson: jspmPackageJson,
                jspmConfigs: results[0],
                dependenciesJson: results[1]
            };
        });
    })
        .catch(function (err) {
        if (err.code === 'ENOENT') {
            // package.json does not exist. Returns undefined.
            return;
        }
        throw err;
    });
}
exports.readProjectConfig = readProjectConfig;
function readDependenciesJson(jspmPackageJson, options) {
    var packages;
    if (jspmPackageJson.directories) {
        if (jspmPackageJson.directories.packages) {
            packages = jspmPackageJson.directories.packages;
        }
        else if (jspmPackageJson.directories.baseURL) {
            packages = path.join(jspmPackageJson.directories.baseURL, constants_1.JSPM_PACKAGE_JSON_DEFAULT.directories.packages);
        }
        else {
            packages = constants_1.JSPM_PACKAGE_JSON_DEFAULT.directories.packages;
        }
    }
    else {
        packages = constants_1.JSPM_PACKAGE_JSON_DEFAULT.directories.packages;
    }
    var filePath = path.join(options.cwd, packages, '.dependencies.json');
    return fs_1.readJson(filePath).catch(function (err) {
        if (err.code === 'ENOENT') {
            // <jspm_packages>/.dependencies.json does not exist. Returns undefined.
            return;
        }
        throw err;
    });
}
exports.readDependenciesJson = readDependenciesJson;
function readJspmPackageJson(options) {
    return fs_1.readJson(path.join(options.cwd, 'package.json'))
        .then(function (pjson) {
        return extractJspmPackageJson(pjson);
    });
}
exports.readJspmPackageJson = readJspmPackageJson;
function readJspmConfigs(jspmPackageJson, options) {
    var baseURL = jspmPackageJson.directories && jspmPackageJson.directories.baseURL || constants_1.JSPM_PACKAGE_JSON_DEFAULT.directories.baseURL;
    var configFiles = extend(constants_1.JSPM_PACKAGE_JSON_DEFAULT.configFiles, jspmPackageJson.configFiles);
    var cwd = options.cwd;
    var configs = {};
    var reader = new ConfigReader_1.ConfigReader();
    var hasConfig = false;
    return Promise.resolve()
        .then(function () {
        var filePath = path.resolve(cwd, baseURL, configFiles['jspm']);
        return reader.read(filePath).then(function (config) {
            if (config) {
                configs.jspm = config;
                hasConfig = true;
            }
        });
    })
        .then(function () {
        var filePath = path.resolve(options.cwd, baseURL, configFiles['jspm:browser']);
        return reader.read(filePath).then(function (config) {
            if (config) {
                configs.browser = config;
                hasConfig = true;
            }
        });
    })
        .then(function () {
        var filePath = path.resolve(options.cwd, baseURL, configFiles['jspm:dev']);
        return reader.read(filePath).then(function (config) {
            if (config) {
                configs.dev = config;
                hasConfig = true;
            }
        });
    })
        .then(function () {
        var filePath = path.resolve(options.cwd, baseURL, configFiles['jspm:node']);
        return reader.read(filePath).then(function (config) {
            if (config) {
                configs.node = config;
                hasConfig = true;
            }
        });
    })
        .then(function () {
        reader.close();
        return hasConfig ? configs : undefined;
    }, function () {
        reader.close();
    });
}
exports.readJspmConfigs = readJspmConfigs;
function extractJspmPackageJson(packageJson) {
    var result = pick(packageJson, [
        'name',
        'version',
        'main',
        'browser',
        'typings',
        'browserTypings',
        'directories',
        'configFiles',
        'dependencies',
        'peerDependencies',
        'devDependencies'
    ]);
    if (packageJson.jspm === true) {
        return result;
    }
    else if (typeof packageJson.jspm === 'object') {
        return extend(result, packageJson.jspm);
    }
    else {
        throw new error_1.ConfigError('This is not a jspm project');
    }
}
//# sourceMappingURL=readProjectConfig.js.map