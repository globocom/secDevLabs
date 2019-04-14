"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test = require("blue-tape");
var path_1 = require("path");
var events_1 = require("events");
var dependencies_1 = require("./dependencies");
var FIXTURE_DIR = path_1.join(__dirname, '__test__/fixtures');
var emitter = new events_1.EventEmitter();
test('dependencies', function (t) {
    var RESOLVE_FIXTURE_DIR = path_1.join(__dirname, '__test__/fixtures/resolve');
    t.test('resolve fixture', function (t) {
        t.test('resolve a dependency tree', function (t) {
            var expected = {
                raw: undefined,
                global: undefined,
                postmessage: undefined,
                name: 'foobar',
                src: path_1.join(RESOLVE_FIXTURE_DIR, 'typings.json'),
                main: 'foo.d.ts',
                files: undefined,
                version: undefined,
                browser: undefined,
                typings: undefined,
                browserTypings: undefined,
                dependencies: {},
                devDependencies: {},
                peerDependencies: {},
                globalDependencies: {},
                globalDevDependencies: {}
            };
            var bowerDep = {
                raw: 'bower:bower-dep',
                global: undefined,
                postmessage: undefined,
                src: path_1.join(RESOLVE_FIXTURE_DIR, 'bower_components/bower-dep/bower.json'),
                typings: 'bower-dep.d.ts',
                browserTypings: undefined,
                dependencies: {},
                devDependencies: {},
                peerDependencies: {},
                globalDependencies: {},
                globalDevDependencies: {},
                name: 'bower-dep',
                files: undefined,
                version: undefined,
                main: 'index.js',
                browser: undefined
            };
            var exampleDep = {
                raw: 'bower:example',
                global: undefined,
                postmessage: undefined,
                src: path_1.join(RESOLVE_FIXTURE_DIR, 'bower_components/example/bower.json'),
                main: undefined,
                browser: undefined,
                files: undefined,
                version: undefined,
                typings: undefined,
                browserTypings: undefined,
                name: 'example',
                dependencies: {},
                devDependencies: {},
                peerDependencies: {},
                globalDependencies: {},
                globalDevDependencies: {}
            };
            var typedDep = {
                raw: 'file:typings/dep.d.ts',
                global: undefined,
                postmessage: undefined,
                src: path_1.join(RESOLVE_FIXTURE_DIR, 'typings/dep.d.ts'),
                typings: path_1.join(RESOLVE_FIXTURE_DIR, 'typings/dep.d.ts'),
                main: undefined,
                browser: undefined,
                files: undefined,
                version: undefined,
                browserTypings: undefined,
                dependencies: {},
                devDependencies: {},
                peerDependencies: {},
                globalDependencies: {},
                globalDevDependencies: {}
            };
            var npmDep = {
                raw: 'npm:npm-dep',
                global: undefined,
                postmessage: undefined,
                src: path_1.join(RESOLVE_FIXTURE_DIR, 'node_modules/npm-dep/package.json'),
                main: './index.js',
                browser: undefined,
                files: undefined,
                version: undefined,
                typings: undefined,
                browserTypings: undefined,
                name: 'npm-dep',
                dependencies: {},
                devDependencies: {},
                peerDependencies: {},
                globalDependencies: {},
                globalDevDependencies: {}
            };
            var typedDevDep = {
                globalDependencies: {},
                globalDevDependencies: {},
                browser: undefined,
                browserTypings: undefined,
                dependencies: {},
                devDependencies: {},
                peerDependencies: {},
                main: undefined,
                name: 'dep',
                raw: 'bower:dep',
                global: undefined,
                postmessage: undefined,
                src: path_1.join(RESOLVE_FIXTURE_DIR, 'bower_components/dep/bower.json'),
                typings: undefined,
                files: undefined,
                version: undefined
            };
            expected.dependencies['bower-dep'] = bowerDep;
            expected.dependencies.dep = typedDep;
            expected.dependencies['npm-dep'] = npmDep;
            expected.devDependencies['dev-dep'] = typedDevDep;
            bowerDep.dependencies.example = exampleDep;
            return dependencies_1.resolveAllDependencies({
                cwd: RESOLVE_FIXTURE_DIR,
                dev: true,
                emitter: emitter
            })
                .then(function (result) {
                t.equal(result.parent, undefined);
                t.ok(result.dependencies.dep.parent != null);
                t.ok(result.dependencies['npm-dep'].parent != null);
                removeParentReference(result);
                t.deepEqual(result, expected);
            });
        });
    });
    t.test('jspm module without package.json', function (t) {
        var cwd = path_1.join(FIXTURE_DIR, 'jspm-typings-registry');
        var jspmDep = {
            raw: 'jspm:make-error',
            type: 'jspm',
            location: 'make-error',
            meta: {
                name: 'make-error'
            }
        };
        var makeErrorDep = {
            src: path_1.join(cwd, 'jspm_packages/npm/make-error@1.2.0/package.json'),
            raw: 'jspm:make-error',
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
            globalDevDependencies: {},
            parent: undefined,
            name: undefined
        };
        return dependencies_1.resolveDependency(jspmDep, { cwd: cwd, emitter: emitter })
            .then(function (actual) {
            t.deepEqual(actual, makeErrorDep);
        });
    });
    t.test('jspm resolve dependency', function (t) {
        var cwd = path_1.join(FIXTURE_DIR, 'jspm-typings-github');
        var jspmDep = {
            raw: 'jspm:unthenify',
            type: 'jspm',
            location: 'unthenify',
            meta: {
                name: 'unthenify'
            }
        };
        var utilArityDep = {
            src: path_1.join(cwd, 'jspm_packages/npm/util-arity@1.0.2/package.json'),
            raw: 'jspm:util-arity',
            main: 'arity.js',
            browser: undefined,
            typings: 'arity.d.ts',
            browserTypings: undefined,
            version: '1.0.2',
            files: undefined,
            global: undefined,
            postmessage: undefined,
            dependencies: {},
            devDependencies: {},
            peerDependencies: {},
            globalDependencies: {},
            globalDevDependencies: {},
            name: 'util-arity'
        };
        var utilArityParent = {
            src: path_1.join(cwd, 'jspm_packages/npm/unthenify@1.0.2/package.json'),
            raw: 'jspm:unthenify',
            main: 'dist/index.js',
            browser: undefined,
            typings: undefined,
            browserTypings: undefined,
            version: '1.0.2',
            files: undefined,
            global: undefined,
            postmessage: undefined,
            dependencies: {
                'util-arity': utilArityDep
            },
            devDependencies: {},
            peerDependencies: {},
            globalDependencies: {},
            globalDevDependencies: {},
            name: 'unthenify'
        };
        var es6PromiseDep = {
            src: 'https://raw.githubusercontent.com/typings/typed-es6-promise/' +
                '94aac67ef7a14a8de8e9e1d3c1f9a26caa0d9fb1/typings.json',
            raw: 'github:typings/typed-es6-promise#94aac67ef7a14a8de8e9e1d3c1f9a26caa0d9fb1',
            main: 'dist/es6-promise.d.ts',
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
            globalDevDependencies: {},
            name: 'es6-promise'
        };
        var es6PromiseParent = {
            src: path_1.join(cwd, 'jspm_packages/npm/unthenify@1.0.2/typings.json'),
            raw: 'jspm:unthenify',
            main: undefined,
            browser: undefined,
            typings: undefined,
            browserTypings: undefined,
            version: undefined,
            files: undefined,
            global: undefined,
            postmessage: undefined,
            dependencies: { 'es6-promise': es6PromiseDep },
            devDependencies: {},
            peerDependencies: {},
            globalDependencies: {},
            globalDevDependencies: {},
            name: undefined
        };
        var unthenifyDep = {
            src: path_1.join(cwd, 'jspm_packages/npm/unthenify@1.0.2/package.json'),
            raw: 'jspm:unthenify',
            main: 'dist/index.js',
            browser: undefined,
            typings: undefined,
            browserTypings: undefined,
            version: '1.0.2',
            files: undefined,
            global: undefined,
            postmessage: undefined,
            dependencies: {
                'util-arity': utilArityDep,
                'es6-promise': es6PromiseDep
            },
            devDependencies: {},
            peerDependencies: {},
            globalDependencies: {},
            globalDevDependencies: {},
            name: 'unthenify'
        };
        return dependencies_1.resolveDependency(jspmDep, { cwd: cwd, emitter: emitter })
            .then(function (actual) {
            t.is(actual.parent, undefined, 'top of result should have no parent');
            t.true(actual.dependencies['util-arity'], '`util-arity` is a dependency');
            var actualUtilArityParent = actual.dependencies['util-arity'].parent;
            removeParentReference(actualUtilArityParent);
            t.deepEqual(actualUtilArityParent, utilArityParent, '`util-arity` has correct parent');
            t.true(actual.dependencies['es6-promise'], '`es6-promise` is a dependency');
            var actualEs6PromiseParent = actual.dependencies['es6-promise'].parent;
            removeParentReference(actualEs6PromiseParent);
            t.deepEqual(actualEs6PromiseParent, es6PromiseParent, '`es6-promise` has correct parent');
            removeParentReference(actual);
            t.deepEqual(actual, unthenifyDep, 'result as expected (after parent removed to avoid circular reference)');
        });
    });
});
function removeParentReference(tree) {
    delete tree.parent;
    removeParentReferenceFromDependencies(tree.dependencies);
    removeParentReferenceFromDependencies(tree.devDependencies);
    removeParentReferenceFromDependencies(tree.peerDependencies);
    removeParentReferenceFromDependencies(tree.globalDependencies);
    removeParentReferenceFromDependencies(tree.globalDevDependencies);
    return tree;
}
function removeParentReferenceFromDependencies(dependencies) {
    Object.keys(dependencies).forEach(function (key) {
        removeParentReference(dependencies[key]);
    });
}
//# sourceMappingURL=dependencies.spec.js.map