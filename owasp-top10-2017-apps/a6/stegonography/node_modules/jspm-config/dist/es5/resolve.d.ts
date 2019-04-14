import * as Promise from 'any-promise';
import { Options, DependencyBranch, DependencyTree, JspmPackageJson } from './interfaces';
export declare function resolveAll(options: Options): Promise<DependencyBranch>;
export declare function resolveByPackageJson(pjson: JspmPackageJson, options: Options): Promise<DependencyBranch>;
export declare function resolve(moduleName: string, options: Options): Promise<DependencyTree>;
