export type CancellablePromise<T> = Promise<T> & { cancel(): void };

export function cancellable<T>(promise: Promise<T>): CancellablePromise<T> {
    let isCancelled = false;

    const cancelleablePromise = new Promise<T>((resolve, reject) => {
        promise.then(
            (...values: any[]) => (isCancelled ? undefined : resolve(...values)),
            (...values: any[]) => (isCancelled ? undefined : reject(...values)),
        );
    }) as CancellablePromise<T>;

    cancelleablePromise.cancel = () => {
        isCancelled = true;
    };

    return cancelleablePromise;
}
