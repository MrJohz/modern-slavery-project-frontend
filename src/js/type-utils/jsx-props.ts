export type Children<T = JSX.Element | string> = { children: T | T[] };
export type Child<T = JSX.Element | string> = { children: T };
export type ManyChildren<T = JSX.Element | string> = { children: T[] };

export function childrenise<T = JSX.Element | string>(children: T | T[]): T[] {
    if (!Array.isArray(children)) {
        return [children];
    } else {
        return children;
    }
}

export type ClassName = { className: string };
