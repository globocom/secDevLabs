"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extend = require("xtend");
var listify = require("listify");
var invariant = require("invariant");
var zipObject = require("zip-object");
var path_1 = require("path");
var url_1 = require("url");
var jspm_config_1 = require("jspm-config");
var fs_1 = require("../utils/fs");
var parse_1 = require("../utils/parse");
var find_1 = require("../utils/find");
var path_2 = require("../utils/path");
var config_1 = require("../utils/config");
var search_1 = require("../search");
var error_1 = require("./error");
exports.DEFAULT_DEPENDENCY = {
    src: undefined,
    raw: undefined,
    main: undefined,
    browser: undefined,
    typings: undefined,
    browserTypings: undefined,
    version: undefined,
    files: undefined,
    global: undefined,
    postmessage: undefined,
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
    globalDependencies: {},
    globalDevDependencies: {}
};
function resolveAllDependencies(options) {
    return Promise.all([
        resolveBowerDependencies(options).catch(function () { return extend(exports.DEFAULT_DEPENDENCY); }),
        resolveNpmDependencies(options).catch(function () { return extend(exports.DEFAULT_DEPENDENCY); }),
        resolveJspmDependencies(options).catch(function () { return extend(exports.DEFAULT_DEPENDENCY); }),
        resolveTypeDependencies(options).catch(function () { return extend(exports.DEFAULT_DEPENDENCY); })
    ])
        .then(function (trees) { return mergeDependencies.apply(void 0, [exports.DEFAULT_DEPENDENCY].concat(trees)); });
}
exports.resolveAllDependencies = resolveAllDependencies;
function resolveDependency(dependency, options) {
    var type = dependency.type, location = dependency.location, raw = dependency.raw, meta = dependency.meta;
    if (type === 'registry') {
        return resolveDependencyRegistry(dependency, options);
    }
    if (type === 'github' || type === 'bitbucket') {
        if (meta.sha === 'master') {
            options.emitter.emit('badlocation', { type: type, raw: raw, location: location });
        }
    }
    return resolveDependencyInternally(type, location, raw, options);
}
exports.resolveDependency = resolveDependency;
function resolveDependencyInternally(type, location, raw, options) {
    if (type === 'jspm' || (type === 'npm' && options.jspmConfig)) {
        return resolveJspmDependency(location, raw, options);
    }
    if (type === 'npm') {
        return resolveNpmDependency(location, raw, options);
    }
    if (type === 'bower') {
        return resolveBowerDependency(location, raw, options);
    }
    return resolveFileDependency(location, raw, options);
}
function resolveDependencyRegistry(dependency, options) {
    var location = dependency.location, meta = dependency.meta;
    return fs_1.readJsonFrom(location)
        .then(function (entry) {
        var _a = parse_1.parseDependency(entry.location), type = _a.type, location = _a.location;
        var raw = "registry:" + meta.source + "/" + meta.name + "#" + entry.tag;
        if (entry.deprecated) {
            options.emitter.emit('deprecated', {
                parent: options.parent,
                raw: dependency.raw,
                date: new Date(entry.deprecated)
            });
        }
        return resolveDependencyInternally(type, location, raw, options);
    }, function (error) {
        if (error.code === 'EINVALIDSTATUS' && error.status === 404) {
            return search_1.search({ name: meta.name })
                .then(function (res) {
                var message = "Unable to find \"" + meta.name + "\" (\"" + meta.source + "\") in the registry.";
                if (res.total > 0) {
                    var plur = res.total === 1 ? 'source' : 'sources';
                    message += "\nHowever, we found \"" + meta.name + "\" for " + res.total + " other " + plur + ": ";
                    message += "" + listify(res.results.map(function (x) { return JSON.stringify(x.source); }));
                    message += "\nYou can install these using the \"source\" option.";
                }
                message += '\nWe could use your help adding these typings to the registry: ';
                message += 'https://github.com/typings/registry';
                return Promise.reject(new error_1.default(message, error));
            });
        }
        return Promise.reject(error);
    });
}
function resolveNpmDependency(pkgName, raw, options) {
    return find_1.findUp(options.cwd, path_1.join('node_modules', pkgName))
        .then(function (modulePath) {
        if (path_2.isDefinition(modulePath)) {
            return resolveFileDependency(modulePath, raw, options);
        }
        return resolveNpmDependencyFrom(modulePath, raw, options);
    }, function (error) {
        return Promise.reject(resolveError(raw, error, options));
    });
}
function resolveBowerDependency(name, raw, options) {
    return resolveBowerComponentPath(options.cwd)
        .then(function (bowerComponentPath) {
        var modulePath = path_1.resolve(bowerComponentPath, name);
        if (path_2.isDefinition(modulePath)) {
            return resolveFileDependency(modulePath, raw, options);
        }
        return resolveBowerDependencyFrom(modulePath, raw, extend(options, { bowerComponentPath: bowerComponentPath }));
    }, function (error) {
        return Promise.reject(resolveError(raw, error, options));
    });
}
function resolveFileDependency(location, raw, options) {
    var name = options.name, parent = options.parent;
    var src;
    if (path_2.isHttp(location)) {
        src = location;
    }
    else if (parent && path_2.isHttp(parent.src)) {
        src = url_1.resolve(parent.src, location);
    }
    else {
        src = path_1.resolve(options.cwd, location);
    }
    if (!path_2.isDefinition(src)) {
        return resolveTypeDependencyFrom(src, raw, options);
    }
    options.emitter.emit('resolve', { name: name, src: src, raw: raw, parent: parent });
    var tree = extend(exports.DEFAULT_DEPENDENCY, {
        typings: src,
        src: src,
        raw: raw,
        parent: parent
    });
    options.emitter.emit('resolved', { name: name, src: src, tree: tree, raw: raw, parent: parent });
    return Promise.resolve(tree);
}
function resolveBowerDependencies(options) {
    return find_1.findUp(options.cwd, 'bower.json')
        .then(function (bowerJsonPath) {
        return resolveBowerComponentPath(path_1.dirname(bowerJsonPath))
            .then(function (bowerComponentPath) {
            return resolveBowerDependencyFrom(bowerJsonPath, undefined, extend(options, { bowerComponentPath: bowerComponentPath }));
        });
    }, function (cause) {
        return Promise.reject(new error_1.default("Unable to resolve Bower dependencies", cause));
    });
}
exports.resolveBowerDependencies = resolveBowerDependencies;
function resolveBowerDependencyFrom(src, raw, options) {
    var name = options.name, parent = options.parent;
    checkCircularDependency(parent, src);
    options.emitter.emit('resolve', { name: name, src: src, raw: raw, parent: parent });
    return fs_1.readJson(src)
        .then(function (bowerJson) {
        if (bowerJson === void 0) { bowerJson = {}; }
        var tree = extend(exports.DEFAULT_DEPENDENCY, {
            name: bowerJson.name,
            version: bowerJson.version,
            main: bowerJson.main,
            browser: bowerJson.browser,
            typings: bowerJson.typings,
            browserTypings: bowerJson.browserTypings,
            src: src,
            raw: raw,
            parent: parent
        });
        var dependencyMap = extend(bowerJson.dependencies);
        var devDependencyMap = extend(options.dev ? bowerJson.devDependencies : {});
        var dependencyOptions = extend(options, { parent: tree });
        options.emitter.emit('resolved', { name: name || tree.name, src: src, tree: tree, raw: raw, parent: parent });
        return Promise.all([
            resolveBowerDependencyMap(dependencyMap, dependencyOptions),
            resolveBowerDependencyMap(devDependencyMap, dependencyOptions),
            maybeResolveTypeDependencyFrom(path_1.join(src, '..', config_1.CONFIG_FILE), raw, options)
        ])
            .then(function (_a) {
            var dependencies = _a[0], devDependencies = _a[1], typedPackage = _a[2];
            tree.dependencies = dependencies;
            tree.devDependencies = devDependencies;
            return mergeDependencies(tree, typedPackage);
        });
    }, function (error) {
        return Promise.reject(resolveError(raw, error, options));
    });
}
function resolveBowerComponentPath(path) {
    return fs_1.readJson(path_1.resolve(path, '.bowerrc'))
        .then(function (bowerrc) {
        if (bowerrc === void 0) { bowerrc = {}; }
        return path_1.resolve(path, bowerrc.directory || 'bower_components');
    }, function () {
        return path_1.resolve(path, 'bower_components');
    });
}
function resolveBowerDependencyMap(dependencies, options) {
    var keys = Object.keys(dependencies);
    return Promise.all(keys.map(function (name) {
        var modulePath = path_1.resolve(options.bowerComponentPath, name, 'bower.json');
        var resolveOptions = extend(options, { name: name, dev: false, global: false, peer: false });
        return resolveBowerDependencyFrom(modulePath, "bower:" + name, resolveOptions);
    }))
        .then(function (results) { return zipObject(keys, results); });
}
function resolveNpmDependencies(options) {
    return find_1.findUp(options.cwd, 'package.json')
        .then(function (packageJsonPath) {
        return resolveNpmDependencyFrom(packageJsonPath, undefined, options);
    }, function (cause) {
        return Promise.reject(new error_1.default("Unable to resolve NPM dependencies", cause));
    });
}
exports.resolveNpmDependencies = resolveNpmDependencies;
function resolveJspmDependencies(options) {
    return find_1.findUp(options.cwd, 'package.json')
        .then(function (packageJsonPath) {
        var cwd = path_1.dirname(packageJsonPath);
        return jspm_config_1.readJspmPackageJson({ cwd: cwd })
            .then(function (packageJson) {
            return jspm_config_1.resolveByPackageJson(packageJson, { cwd: cwd })
                .then(function (config) {
                var keys = Object.keys(config);
                return Promise.all(keys.map(function (name) {
                    var jspmConfig = config[name];
                    return resolveJspmDependencyFrom(name, "jspm:" + name, extend(options, { jspmConfig: jspmConfig }));
                }))
                    .then(function (results) {
                    var tree = extend(exports.DEFAULT_DEPENDENCY, {
                        name: packageJson.name,
                        version: packageJson.version,
                        main: packageJson.main,
                        browser: packageJson.browser,
                        typings: packageJson.typings,
                        browserTypings: packageJson.browserTypings,
                        src: packageJsonPath,
                        dependencies: zipObject(keys, results)
                    });
                    return tree;
                });
            });
        });
    });
}
exports.resolveJspmDependencies = resolveJspmDependencies;
function resolveNpmDependencyFrom(src, raw, options) {
    var name = options.name, parent = options.parent;
    checkCircularDependency(parent, src);
    options.emitter.emit('resolve', { name: name, src: src, raw: raw, parent: parent });
    return fs_1.readJson(src)
        .then(function (packageJson) {
        if (packageJson === void 0) { packageJson = {}; }
        var tree = extend(exports.DEFAULT_DEPENDENCY, {
            name: packageJson.name,
            version: packageJson.version,
            main: packageJson.main,
            browser: packageJson.browser,
            typings: packageJson.typings,
            browserTypings: packageJson.browserTypings,
            src: src,
            raw: raw,
            parent: parent
        });
        var dependencyMap = extend(packageJson.dependencies);
        var devDependencyMap = extend(options.dev ? packageJson.devDependencies : {});
        var peerDependencyMap = extend(options.peer ? packageJson.peerDependencies : {});
        var dependencyOptions = extend(options, { parent: tree });
        options.emitter.emit('resolved', { name: name || tree.name, src: src, tree: tree, raw: raw, parent: parent });
        return Promise.all([
            resolveNpmDependencyMap(src, dependencyMap, dependencyOptions),
            resolveNpmDependencyMap(src, devDependencyMap, dependencyOptions),
            resolveNpmDependencyMap(src, peerDependencyMap, dependencyOptions),
            maybeResolveTypeDependencyFrom(path_1.join(src, '..', config_1.CONFIG_FILE), raw, options)
        ])
            .then(function (_a) {
            var dependencies = _a[0], devDependencies = _a[1], peerDependencies = _a[2], typedPackage = _a[3];
            tree.dependencies = dependencies;
            tree.devDependencies = devDependencies;
            tree.peerDependencies = peerDependencies;
            return mergeDependencies(tree, typedPackage);
        });
    }, function (error) {
        return Promise.reject(resolveError(raw, error, options));
    });
}
function resolveNpmDependencyMap(src, dependencies, options) {
    var cwd = path_1.dirname(src);
    var keys = Object.keys(dependencies);
    return Promise.all(keys.map(function (name) {
        var resolveOptions = extend(options, { name: name, cwd: cwd, dev: false, peer: false, global: false });
        return resolveNpmDependency(path_1.join(name, 'package.json'), "npm:" + name, resolveOptions);
    }))
        .then(function (results) { return zipObject(keys, results); });
}
function resolveTypeDependencies(options) {
    return find_1.findConfigFile(options.cwd)
        .then(function (path) {
        return resolveTypeDependencyFrom(path, undefined, options);
    }, function (cause) {
        return Promise.reject(new error_1.default("Unable to resolve Typings dependencies", cause));
    });
}
exports.resolveTypeDependencies = resolveTypeDependencies;
function resolveTypeDependencyFrom(src, raw, options) {
    var name = options.name, parent = options.parent;
    checkCircularDependency(parent, src);
    options.emitter.emit('resolve', { name: name, src: src, raw: raw, parent: parent });
    return fs_1.readConfigFrom(src)
        .then(function (config) {
        var tree = extend(exports.DEFAULT_DEPENDENCY, {
            name: config.name,
            main: config.main,
            version: config.version,
            browser: config.browser,
            files: Array.isArray(config.files) ? config.files : undefined,
            global: typeof config.global === 'boolean' ? !!config.global : undefined,
            postmessage: typeof config.postmessage === 'string' ? config.postmessage : undefined,
            src: src,
            raw: raw,
            parent: parent
        });
        var global = options.global, dev = options.dev, peer = options.peer;
        var dependencyMap = extend(config.dependencies);
        var devDependencyMap = extend(dev ? config.devDependencies : {});
        var peerDependencyMap = extend(peer ? config.peerDependencies : {});
        var globalDependencyMap = extend(global ? config.globalDependencies : {});
        var globalDevDependencyMap = extend(global && dev ? config.globalDevDependencies : {});
        var dependencyOptions = extend(options, { parent: tree });
        options.emitter.emit('resolved', { name: name || tree.name, src: src, tree: tree, raw: raw, parent: parent });
        if (parent == null && config.globalDependencies) {
            options.emitter.emit('globaldependencies', {
                name: name || tree.name,
                raw: raw,
                dependencies: config.globalDependencies
            });
        }
        return Promise.all([
            resolveTypeDependencyMap(src, dependencyMap, dependencyOptions),
            resolveTypeDependencyMap(src, devDependencyMap, dependencyOptions),
            resolveTypeDependencyMap(src, peerDependencyMap, dependencyOptions),
            resolveTypeDependencyMap(src, globalDependencyMap, dependencyOptions),
            resolveTypeDependencyMap(src, globalDevDependencyMap, dependencyOptions)
        ])
            .then(function (_a) {
            var dependencies = _a[0], devDependencies = _a[1], peerDependencies = _a[2], globalDependencies = _a[3], globalDevDependencies = _a[4];
            tree.dependencies = dependencies;
            tree.devDependencies = devDependencies;
            tree.peerDependencies = peerDependencies;
            tree.globalDependencies = globalDependencies;
            tree.globalDevDependencies = globalDevDependencies;
            return tree;
        });
    }, function (error) {
        return Promise.reject(resolveError(raw, error, options));
    });
}
function maybeResolveTypeDependencyFrom(src, raw, options) {
    return resolveTypeDependencyFrom(src, raw, options).catch(function () { return extend(exports.DEFAULT_DEPENDENCY); });
}
function resolveTypeDependencyMap(src, dependencies, options) {
    var cwd = path_1.dirname(src);
    var keys = Object.keys(dependencies);
    return Promise.all(keys.map(function (name) {
        var resolveOptions = extend(options, { name: name, cwd: cwd, dev: false, global: false, peer: false });
        return resolveDependency(parse_1.parseDependency(dependencies[name]), resolveOptions);
    }))
        .then(function (results) { return zipObject(keys, results); });
}
function resolveJspmDependency(pkgName, raw, options) {
    return find_1.findUp(options.cwd, 'package.json')
        .then(function (packageJsonPath) {
        return jspm_config_1.resolve(pkgName, { cwd: path_1.dirname(packageJsonPath) });
    })
        .then(function (jspmConfig) {
        return resolveJspmDependencyFrom(pkgName, raw, extend(options, { jspmConfig: jspmConfig }));
    }, function (error) {
        if (error instanceof jspm_config_1.ModuleNotFoundError) {
            return resolveJspmDependencyFrom(pkgName, raw, options);
        }
        return Promise.reject(resolveError(raw, error, options));
    });
}
exports.resolveJspmDependency = resolveJspmDependency;
function resolveJspmDependencyFrom(name, raw, options) {
    var parent = options.parent, jspmConfig = options.jspmConfig;
    var modulePath = jspmConfig.path;
    var src = path_1.resolve(options.cwd, modulePath, 'package.json');
    checkCircularDependency(parent, src);
    options.emitter.emit('resolve', { name: name, src: src, raw: raw, parent: parent });
    return fs_1.readJson(src)
        .catch(function (err) {
        if (err.code === 'ENOENT') {
            return;
        }
        return Promise.reject(err);
    })
        .then(function (meta) {
        if (meta === void 0) { meta = {}; }
        var tree = extend(exports.DEFAULT_DEPENDENCY, {
            src: src,
            raw: raw,
            parent: parent,
            name: meta.name,
            version: meta.version,
            main: meta.main,
            browser: meta.browser,
            typings: meta.typings,
            browserTypings: meta.browserTypings
        });
        options.emitter.emit('resolved', { name: name, src: src, tree: tree, raw: raw, parent: parent });
        var dependencyOptions = extend(options, { parent: tree });
        var configPath = path_1.resolve(options.cwd, modulePath, config_1.CONFIG_FILE);
        return Promise.all([
            resolveJspmDependencyMap(jspmConfig.map, dependencyOptions),
            maybeResolveTypeDependencyFrom(configPath, raw, options)
        ])
            .then(function (_a) {
            var dependencies = _a[0], typedPackage = _a[1];
            tree.dependencies = dependencies;
            return mergeDependencies(tree, typedPackage);
        });
    });
}
function resolveJspmDependencyMap(dependencies, options) {
    if (dependencies === void 0) { dependencies = {}; }
    var keys = Object.keys(dependencies);
    return Promise.all(keys.map(function (name) {
        var resolveOptions = extend(options, { dev: false, peer: false, global: false, jspmConfig: dependencies[name] });
        return resolveJspmDependencyFrom(name, "jspm:" + name, resolveOptions);
    }))
        .then(function (results) { return zipObject(keys, results); });
}
function checkCircularDependency(tree, filename) {
    if (tree) {
        var currentSrc = tree.src;
        while (tree) {
            invariant(tree.src !== filename, "Circular dependency detected using \"" + currentSrc + "\"");
            tree = tree.parent;
        }
    }
}
function resolveError(raw, cause, options) {
    var name = options.name;
    var message = "Unable to resolve " + (raw == null ? 'typings' : "\"" + raw + "\"");
    if (name != null) {
        message += " from \"" + name + "\"";
    }
    return new error_1.default(message, cause);
}
function mergeDependencies(root) {
    var trees = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        trees[_i - 1] = arguments[_i];
    }
    var dependency = extend(root);
    for (var _a = 0, trees_1 = trees; _a < trees_1.length; _a++) {
        var tree = trees_1[_a];
        if (tree == null) {
            continue;
        }
        var name = tree.name, raw = tree.raw, src = tree.src, main = tree.main, browser = tree.browser, typings = tree.typings, browserTypings = tree.browserTypings, parent = tree.parent, files = tree.files, global_1 = tree.global;
        if (parent != null) {
            dependency.parent = parent;
        }
        if (global_1 != null) {
            dependency.global = global_1;
        }
        if (typeof name === 'string') {
            dependency.name = name;
        }
        if (typeof raw === 'string') {
            dependency.raw = raw;
        }
        if (main != null || browser != null || typings != null || browserTypings != null || files != null) {
            dependency.src = src;
            dependency.main = main;
            dependency.files = files;
            dependency.browser = browser;
            dependency.typings = typings;
            dependency.browserTypings = browserTypings;
        }
        dependency.postmessage = tree.postmessage || dependency.postmessage;
        dependency.dependencies = extend(dependency.dependencies, tree.dependencies);
        dependency.devDependencies = extend(dependency.devDependencies, tree.devDependencies);
        dependency.peerDependencies = extend(dependency.peerDependencies, tree.peerDependencies);
        dependency.globalDependencies = extend(dependency.globalDependencies, tree.globalDependencies);
        dependency.globalDevDependencies = extend(dependency.globalDevDependencies, tree.globalDevDependencies);
    }
    return dependency;
}
//# sourceMappingURL=dependencies.js.map