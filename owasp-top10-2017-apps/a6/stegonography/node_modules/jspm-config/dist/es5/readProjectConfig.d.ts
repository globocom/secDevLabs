import Promise = require('any-promise');
import { JspmPackageJson, Configs, Options, DependenciesJson, JspmProjectInfo } from './interfaces';
export declare function readProjectConfig(options: Options): Promise<JspmProjectInfo>;
export declare function readDependenciesJson(jspmPackageJson: JspmPackageJson, options: Options): Promise<DependenciesJson>;
export declare function readJspmPackageJson(options: Options): Promise<JspmPackageJson>;
export declare function readJspmConfigs(jspmPackageJson: JspmPackageJson, options: Options): Promise<Configs>;
