// Type definitions for AbortController specification
// Definitions by: Jonathan Frere <http://johz.me>

interface AbortSignal extends EventTarget {
    readonly aborted: boolean;
    onabort: () => void;
}

interface AbortSignalConstructor {
    readonly prototype: AbortSignal;
}

interface AbortController {
    readonly signal: AbortSignal;
    abort(): void;
}

interface AbortControllerConstructor {
    new(): AbortController;
}

interface RequestInit {
    signal?: AbortSignal;
}

declare var AbortSignal: AbortSignalConstructor;
declare var AbortController: AbortControllerConstructor;
