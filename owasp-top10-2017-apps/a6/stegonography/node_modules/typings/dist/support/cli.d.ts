import { DependencyTree } from 'typings-core';
export interface PrintOptions {
    verbose: boolean;
}
export declare function log(message: string): void;
export declare function setLoglevel(level: string): number | undefined;
export declare function logInfo(message: string, prefix?: string): void;
export declare function logWarning(message: string, prefix?: string): void;
export declare function logError(message: string, prefix?: string): void;
export declare function setStatus(message: string): void;
export declare function render(): void;
export declare function startSpinner(): void;
export declare function stopSpinner(): void;
export declare function spinner<T>(promise: Promise<T> | T): Promise<T>;
export declare function handle(promise: any, options: PrintOptions): Promise<any>;
export declare function handleError(error: Error, options: PrintOptions): any;
export interface ArchifyOptions {
    name?: string;
    tree: DependencyTree;
    unicode?: boolean;
}
export declare function archifyDependencyTree(options: ArchifyOptions): string;
