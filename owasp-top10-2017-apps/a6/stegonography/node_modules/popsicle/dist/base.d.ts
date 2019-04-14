/// <reference types="node" />
import { Url } from 'url';
export interface Query {
    [key: string]: string | string[];
}
export interface Headers {
    [name: string]: string | string[];
}
export declare type RawHeaders = string[];
export interface BaseOptions {
    url?: string;
    query?: string | Query;
    headers?: Headers;
    rawHeaders?: RawHeaders;
}
export declare class Base {
    Url: Url;
    rawHeaders: RawHeaders;
    constructor({url, headers, rawHeaders, query}: BaseOptions);
    url: string;
    query: string | Query;
    headers: Headers;
    toHeaders(): Headers;
    set(name: string, value?: string | string[]): this;
    append(name: string, value?: string | string[]): this;
    name(name: string): string | undefined;
    get(name: string): string | undefined;
    getAll(name: string): string[];
    remove(name: string): this;
    type(): string;
    type(value: string): this;
}
