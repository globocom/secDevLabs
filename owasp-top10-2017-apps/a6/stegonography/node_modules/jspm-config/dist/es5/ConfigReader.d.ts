import * as Promise from 'any-promise';
/**
 * Read jspm config in separate process.
 * Should call `close()` when you are done.
 */
export declare class ConfigReader {
    private child;
    private timer;
    constructor();
    read(filePath: string): Promise<any>;
    close(): void;
    private startTimeBomb();
    private stopTimeBomb();
    private restartTimeBomb();
}
