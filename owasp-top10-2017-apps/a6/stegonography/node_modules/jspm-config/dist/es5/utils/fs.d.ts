import * as Promise from 'any-promise';
export declare type ReadFileOp = (path: string, encoding: string) => Promise<string>;
/**
 * Parse a string as JSON.
 */
export declare function parseJson(contents: string, path: string, allowEmpty: boolean): any;
/**
 * Read JSON from a path.
 */
export declare function readJson(path: string, allowEmpty?: boolean): Promise<any>;
export declare const readFile: ReadFileOp;
