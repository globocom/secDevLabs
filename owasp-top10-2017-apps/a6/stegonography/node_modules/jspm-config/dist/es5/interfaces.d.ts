export interface Options {
    cwd: string;
}
/**
 * Interface for `<jspm_packages>/.dependencies.json`.
 */
export interface DependenciesJson {
    [index: string]: {
        deps: {
            [index: string]: string;
        };
        peerDeps: {
            [index: string]: string;
        };
    };
}
/**
 * Browser field overrides like NPM.
 */
export declare type Browser = string | Overrides;
/**
 * Override map for file lookups.
 */
export interface Overrides {
    [dependency: string]: string;
}
export interface JspmPackageJson {
    name: string;
    main: string;
    version?: string;
    typings?: string;
    browser?: Browser;
    browserTypings?: Browser;
    directories?: {
        baseURL: string;
        packages?: string;
    };
    configFiles?: ConfigFiles;
    dependencies?: {
        [index: string]: string;
    };
    peerDependencies?: {
        [index: string]: string;
    };
    devDependencie?: {
        [index: string]: string;
    };
    overrides?: {
        [index: string]: any;
    };
}
/**
 * Interface for the resolved JSPM config.
 */
export interface JspmConfig {
    getDependencyTree(moduleName: string): any;
}
export interface ConfigFiles {
    jspm: string;
    'jspm:browser': string;
    'jspm:dev': string;
    'jspm:node': string;
}
export interface Configs {
    jspm?: any;
    browser?: any;
    dev?: any;
    node?: any;
}
export interface JspmProjectInfo {
    jspmPackageJson: JspmPackageJson;
    jspmConfigs: Configs;
    dependenciesJson?: DependenciesJson;
}
export interface PathMap {
    [prefix: string]: string;
}
/**
 * Module name maps to package name.
 */
export interface ModuleMap {
    [moduleName: string]: string;
}
export interface PackageMap {
    [versionedName: string]: {
        map: ModuleMap;
    };
}
export interface DependencyInfo {
    paths: PathMap;
    map: ModuleMap;
    packages: PackageMap;
}
export interface DependencyBranch {
    [moduleName: string]: DependencyTree;
}
export interface DependencyTree {
    path: string;
    map?: DependencyBranch;
}
