export default function promiseFinally<T>(value: T | Promise<T>, cb: () => void | Promise<void>): Promise<T>;
