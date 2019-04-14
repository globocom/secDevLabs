"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var extend = require("xtend");
var has = require("has");
var path_1 = require("path");
var fs_1 = require("../utils/fs");
var path_2 = require("../utils/path");
var path_3 = require("../utils/path");
var references_1 = require("../utils/references");
var config_1 = require("../utils/config");
var error_1 = require("./error");
function compile(tree, resolutions, options) {
    var name = options.name, cwd = options.cwd, global = options.global;
    var fileCache = {};
    if (tree.global && !global) {
        return Promise.reject(new error_1.default("Unable to compile \"" + name + "\", the typings are meant to be installed as " +
            "global but attempted to be compiled as an external module"));
    }
    for (var _i = 0, resolutions_1 = resolutions; _i < resolutions_1.length; _i++) {
        var resolution = resolutions_1[_i];
        if (resolution !== 'main' && resolution !== 'browser') {
            return Promise.reject(new error_1.default("Unable to resolve using \"" + resolution + "\" setting"));
        }
    }
    return Promise.all(resolutions.map(function (resolution) {
        var resolved = {};
        var imported = {};
        return compileDependencyTree(tree, extend(options, {
            resolution: resolution,
            fileCache: fileCache,
            imported: imported,
            resolved: resolved
        }));
    }))
        .then(function (output) {
        var results = {};
        for (var i = 0; i < output.length; i++) {
            results[resolutions[i]] = output[i];
        }
        return {
            cwd: cwd,
            name: name,
            tree: tree,
            global: global,
            results: results
        };
    });
}
exports.compile = compile;
function resolveImportFrom(from, to) {
    return path_3.isModuleName(to) ? to : path_3.resolveFrom(from, to);
}
function resolveOverride(src, to, tree) {
    if (typeof to === 'string') {
        if (path_3.isModuleName(to)) {
            var _a = getModuleNameParts(to, tree), moduleName = _a[0], modulePath = _a[1];
            return modulePath ? path_3.normalizeToDefinition(to) : moduleName;
        }
        return path_3.resolveFrom(src, path_3.normalizeToDefinition(to));
    }
    return to ? src : undefined;
}
function getStringifyOptions(tree, options, parent) {
    var overrides = {};
    var isTypings = typeof tree.typings === 'string';
    var main = isTypings ? tree.typings : tree.main;
    var browser = isTypings ? tree.browserTypings : tree.browser;
    if (options.resolution === 'browser' && browser) {
        if (typeof browser === 'string') {
            var mainDefinition = path_3.resolveFrom(tree.src, path_3.normalizeToDefinition(main));
            var browserDefinition = path_3.resolveFrom(tree.src, path_3.normalizeToDefinition(browser));
            overrides[mainDefinition] = browserDefinition;
        }
        else {
            for (var _i = 0, _a = Object.keys(browser); _i < _a.length; _i++) {
                var key = _a[_i];
                var from = resolveOverride(tree.src, key, tree);
                var to = resolveOverride(tree.src, browser[key], tree);
                overrides[from] = to;
            }
        }
    }
    var referenced = {};
    var dependencies = {};
    var entry = main == null ? undefined : path_3.normalizeToDefinition(main);
    var prefix = "" + (parent ? parent.prefix : '') + config_1.DEPENDENCY_SEPARATOR + options.name;
    return extend(options, {
        tree: tree,
        entry: entry,
        prefix: prefix,
        overrides: overrides,
        referenced: referenced,
        dependencies: dependencies,
        parent: parent
    });
}
function compileDependencyTree(tree, options) {
    var stringifyOptions = getStringifyOptions(tree, options, undefined);
    var contents = [];
    var name = options.name, global = options.global, resolution = options.resolution;
    options.emitter.emit('compiledependency', { tree: tree, global: global, name: name, resolution: resolution });
    if (Array.isArray(tree.files)) {
        for (var _i = 0, _a = tree.files; _i < _a.length; _i++) {
            var file = _a[_i];
            contents.push(stringifyDependencyImport(path_3.resolveFrom(tree.src, file), DependencyImport.ALL_PATHS, false, stringifyOptions));
        }
    }
    if (stringifyOptions.entry) {
        contents.push(stringifyDependencyImport(path_3.resolveFrom(tree.src, stringifyOptions.entry), DependencyImport.ALL_PATHS, true, stringifyOptions));
    }
    if (contents.length === 0) {
        contents.push(stringifyDependencyImport(path_3.resolveFrom(tree.src, 'index.d.ts'), DependencyImport.DEFAULT_ONLY, true, stringifyOptions));
    }
    return Promise.all(contents).then(function (out) { return out.join(path_2.EOL); });
}
function cachedReadFileFrom(path, options) {
    if (!has(options.fileCache, path)) {
        options.fileCache[path] = fs_1.readFileFrom(path);
    }
    return options.fileCache[path];
}
function cachedStringifyOptions(name, compileOptions, options) {
    if (!has(options.dependencies, name)) {
        var branch = options.tree.dependencies[name];
        if (branch) {
            options.dependencies[name] = getStringifyOptions(branch, compileOptions, options);
        }
        else {
            options.dependencies[name] = null;
        }
    }
    return options.dependencies[name];
}
function getPath(path, options) {
    if (has(options.overrides, path)) {
        return options.overrides[path];
    }
    return path;
}
var DependencyImport;
(function (DependencyImport) {
    DependencyImport[DependencyImport["DEFAULT_ONLY"] = 0] = "DEFAULT_ONLY";
    DependencyImport[DependencyImport["SUFFIXES_ONLY"] = 1] = "SUFFIXES_ONLY";
    DependencyImport[DependencyImport["ALL_PATHS"] = 2] = "ALL_PATHS";
})(DependencyImport || (DependencyImport = {}));
function getDependencyImportPaths(importPath, mode) {
    var paths = [];
    if (mode === DependencyImport.DEFAULT_ONLY || mode === DependencyImport.ALL_PATHS) {
        paths.push(importPath);
    }
    if (mode === DependencyImport.SUFFIXES_ONLY || mode === DependencyImport.ALL_PATHS) {
        paths.push(path_3.appendToPath(importPath, '.d.ts'), path_3.appendToPath(importPath, '/index.d.ts'));
    }
    return paths;
}
function readDependencyImport(importPath, mode, isEntry, stringifyOptions, parent) {
    function attempt(cause, paths, index, isEntry, options) {
        var cwd = options.cwd, tree = options.tree, resolution = options.resolution, fileCache = options.fileCache, resolved = options.resolved, imported = options.imported, emitter = options.emitter, meta = options.meta;
        if (index >= paths.length) {
            var authorPhrase = options.parent ? "The author of \"" + options.parent.name + "\" needs to" : 'You should';
            var relativePath = path_3.isModuleName(importPath) ? importPath : path_3.relativeTo(options.tree.src, importPath);
            if (isEntry) {
                return Promise.reject(new error_1.default("Unable to read typings for \"" + options.name + "\". " +
                    (authorPhrase + " check the entry paths in \"" + path_1.basename(options.tree.src) + "\" are up to date"), cause));
            }
            return Promise.reject(new error_1.default("Unable to read \"" + relativePath + "\" from \"" + options.name + "\". " +
                (authorPhrase + " validate all import paths are accurate (case sensitive and relative)"), cause));
        }
        var path = getPath(paths[index], options);
        if (path_3.isModuleName(path)) {
            var _a = getModuleNameParts(path, tree), moduleName = _a[0], modulePath = _a[1];
            var childOptions = cachedStringifyOptions(moduleName, {
                cwd: cwd,
                resolution: resolution,
                fileCache: fileCache,
                emitter: emitter,
                imported: imported,
                resolved: resolved,
                name: moduleName,
                global: false,
                meta: meta
            }, options);
            if (!childOptions) {
                stringifyOptions.resolved[getCachePath(importPath, stringifyOptions, false)] = path;
                return Promise.resolve(null);
            }
            var paths_1 = getDependencyImportPaths(path_3.resolveFrom(childOptions.tree.src, modulePath || childOptions.entry || 'index.d.ts'), modulePath ? DependencyImport.SUFFIXES_ONLY : (childOptions.entry ? DependencyImport.ALL_PATHS : DependencyImport.DEFAULT_ONLY));
            return attempt(null, paths_1, 0, true, childOptions);
        }
        var cached = has(options.imported, path);
        if (!cached) {
            options.imported[path] = fs_1.readFileFrom(path).then(function (contents) {
                var fileInfo = ts.preProcessFile(contents);
                var sourceFile = ts.createSourceFile(path, contents.replace(references_1.REFERENCE_REGEXP, ''), ts.ScriptTarget.Latest, true);
                var modulePath = getCachePath(path, options, true);
                var moduleInfo = { path: path, modulePath: modulePath, isEntry: isEntry, parent: parent, sourceFile: sourceFile, options: options, fileInfo: fileInfo };
                return moduleInfo;
            }, function (err) {
                if (err.code === 'ENOENT' || err.code === 'ENOTDIR' || err.code === 'EISDIR' || err.code === 'EINVALIDSTATUS') {
                    return attempt(err, paths, index + 1, isEntry, options);
                }
                return Promise.reject(err);
            });
        }
        return options.imported[path].then(function (moduleInfo) {
            if (moduleInfo) {
                stringifyOptions.resolved[getCachePath(importPath, stringifyOptions, false)] = moduleInfo.modulePath;
            }
            return !cached ? moduleInfo : undefined;
        });
    }
    return attempt(null, getDependencyImportPaths(importPath, mode), 0, isEntry, stringifyOptions);
}
function stringifyDependencyImport(importPath, mode, isEntry, options, parent) {
    return readDependencyImport(importPath, mode, isEntry, options, parent)
        .then(function (info) { return info ? stringifyDependencyPath(info) : undefined; });
}
function getCachePath(originalPath, options, strip) {
    var path = strip ? path_3.pathFromDefinition(originalPath) : originalPath;
    if (path_3.isModuleName(path)) {
        return path_3.normalizeSlashes("" + options.prefix + config_1.DEPENDENCY_SEPARATOR + path);
    }
    return path_3.normalizeSlashes(path_1.join(options.prefix, path_3.relativeTo(options.tree.src, path)));
}
function stringifyDependencyPath(moduleInfo) {
    var path = moduleInfo.path, options = moduleInfo.options, sourceFile = moduleInfo.sourceFile, fileInfo = moduleInfo.fileInfo;
    var tree = options.tree, global = options.global, resolution = options.resolution, name = options.name, prefix = options.prefix, emitter = options.emitter;
    emitter.emit('compile', { name: name, prefix: prefix, path: path, tree: tree, resolution: resolution });
    var importedFiles = fileInfo.importedFiles.map(function (x) { return resolveImportFrom(path, x.fileName); });
    var referencedFiles = fileInfo.referencedFiles.map(function (x) { return path_3.resolveFrom(path, x.fileName); });
    if (global) {
        Object.keys(tree.dependencies).forEach(function (x) { return importedFiles.push(x); });
    }
    var imports = importedFiles.map(function (importedFile) {
        var mode = path_3.isModuleName(importedFile) ? DependencyImport.DEFAULT_ONLY : DependencyImport.SUFFIXES_ONLY;
        return stringifyDependencyImport(importedFile, mode, false, options, moduleInfo);
    });
    return Promise.all(imports).then(function (imports) {
        var stringified = stringifyModuleFile(moduleInfo);
        for (var _i = 0, referencedFiles_1 = referencedFiles; _i < referencedFiles_1.length; _i++) {
            var reference = referencedFiles_1[_i];
            emitter.emit('reference', { name: name, prefix: prefix, path: path, reference: reference, tree: tree, resolution: resolution });
        }
        var contents = imports.filter(function (x) { return x != null; }).concat(stringified).join(path_2.EOL);
        emitter.emit('compiled', { name: name, prefix: prefix, path: path, tree: tree, resolution: resolution, contents: contents });
        return contents;
    });
}
function getModuleNameParts(name, tree) {
    var parts = name.split(/[\\\/]/g);
    var len = parts.length;
    while (len) {
        len--;
        var name_1 = parts.slice(0, len).join('/');
        var path = parts.slice(len).join('/');
        if (tree.dependencies[name_1]) {
            return [name_1, path];
        }
    }
    return [parts.join('/'), null];
}
function getImportPath(path, options) {
    return options.resolved[getCachePath(path, options, false)];
}
function stringifyModuleFile(info) {
    var options = info.options, modulePath = info.modulePath;
    var tree = options.tree, name = options.name, prefix = options.prefix, parent = options.parent, cwd = options.cwd, global = options.global;
    var source = path_3.isHttp(info.path) ? info.path : path_3.normalizeSlashes(path_1.relative(cwd, info.path));
    var meta = options.meta ? "// Generated by " + config_1.PROJECT_NAME + path_2.EOL + "// Source: " + source + path_2.EOL : '';
    if (global) {
        if (ts.isExternalModule(info.sourceFile)) {
            throw new error_1.default("Attempted to compile \"" + name + "\" as a global " +
                "module, but it looks like an external module. " +
                "You'll need to remove the global option to continue.");
        }
        return "" + meta + path_2.normalizeEOL(info.sourceFile.getText().trim(), path_2.EOL) + path_2.EOL;
    }
    else {
        if (!ts.isExternalModule(info.sourceFile) && !(info.parent && ts.isExternalModule(info.parent.sourceFile))) {
            throw new error_1.default("Attempted to compile \"" + name + "\" as an external module, " +
                "but it looks like a global module. " +
                "You'll need to enable the global option to continue.");
        }
    }
    var hasExports = false;
    var hasDefaultExport = false;
    var hasExportEquals = false;
    var hasLocalImports = false;
    var wasDeclared = false;
    function replacer(node) {
        if (node.kind === ts.SyntaxKind.ExportAssignment) {
            hasDefaultExport = !node.isExportEquals;
            hasExportEquals = !hasDefaultExport;
        }
        else if (node.kind === ts.SyntaxKind.ExportDeclaration) {
            hasExports = true;
        }
        else if (node.kind === ts.SyntaxKind.ExportSpecifier) {
            hasDefaultExport = hasDefaultExport || node.name.getText() === 'default';
        }
        var flags = ts.getCombinedModifierFlags(node);
        hasExports = hasExports || !!(flags & ts.ModifierFlags.Export);
        hasDefaultExport = hasDefaultExport || !!(flags & ts.ModifierFlags.Default);
        if (node.kind === ts.SyntaxKind.StringLiteral &&
            (node.parent.kind === ts.SyntaxKind.ExportDeclaration ||
                node.parent.kind === ts.SyntaxKind.ImportDeclaration ||
                node.parent.kind === ts.SyntaxKind.ModuleDeclaration)) {
            hasLocalImports = hasLocalImports || !path_3.isModuleName(node.text);
            return " '" + getImportPath(resolveImportFrom(info.path, node.text), options) + "'";
        }
        if (node.kind === ts.SyntaxKind.DeclareKeyword) {
            wasDeclared = true;
            return info.sourceFile.text.slice(node.getFullStart(), node.getStart());
        }
        if (node.kind === ts.SyntaxKind.ExternalModuleReference) {
            var requirePath = getImportPath(resolveImportFrom(info.path, node.expression.text), options);
            return " require('" + requirePath + "')";
        }
    }
    function read(start, end) {
        var text = info.sourceFile.text.slice(start, end);
        if (start === 0) {
            return text.replace(/^\s+$/, '');
        }
        if (end == null) {
            return text.replace(/\s+$/, '');
        }
        if (wasDeclared) {
            wasDeclared = false;
            return text.replace(/^\s+/, '');
        }
        return text;
    }
    var moduleText = path_2.normalizeEOL(processTree(info.sourceFile, replacer, read), path_2.EOL);
    var moduleName = parent && parent.global ? name : modulePath;
    if (info.isEntry && !hasLocalImports) {
        return meta + declareText(parent ? moduleName : name, moduleText);
    }
    var prettyPath = path_3.normalizeSlashes(path_1.join(name, path_3.relativeTo(tree.src, path_3.pathFromDefinition(info.path))));
    var declared = meta + declareText(modulePath, moduleText);
    function alias(name) {
        var imports = [];
        if (hasExportEquals) {
            imports.push("import main = require('" + modulePath + "');");
            imports.push("export = main;");
        }
        else {
            if (hasExports) {
                imports.push("export * from '" + modulePath + "';");
            }
            if (hasDefaultExport) {
                imports.push("export { default } from '" + modulePath + "';");
            }
        }
        if (imports.length === 0) {
            return '';
        }
        return declareText(name, imports.join(path_2.EOL));
    }
    if (info.isEntry && !parent) {
        return declared + alias(prettyPath) + alias(name);
    }
    return declared + (parent ? '' : alias(prettyPath));
}
function declareText(name, text) {
    return "declare module '" + name + "' {" + (text ? path_2.EOL + text + path_2.EOL : '') + "}" + path_2.EOL;
}
function processTree(sourceFile, replacer, reader) {
    var code = '';
    var position = 0;
    function skip(node) {
        position = node.end;
    }
    function readThrough(node) {
        if (node.pos > position) {
            code += reader(position, node.pos);
            position = node.pos;
        }
    }
    function visit(node) {
        readThrough(node);
        var replacement = replacer(node);
        if (replacement != null) {
            code += replacement;
            skip(node);
        }
        else {
            ts.forEachChild(node, visit);
        }
    }
    visit(sourceFile);
    code += reader(position);
    return code;
}
//# sourceMappingURL=compile.js.map