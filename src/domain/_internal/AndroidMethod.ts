import {AndroidMethodArgumentMap} from "./AndroidMethodArgumentMap";

type AndroidMethod = {
    [K in keyof AndroidMethodArgumentMap]: AndroidMethodArgumentMap[K] extends readonly (string | number | boolean)[] ? K : never;
}[keyof AndroidMethodArgumentMap];

export type {
    AndroidMethod
};