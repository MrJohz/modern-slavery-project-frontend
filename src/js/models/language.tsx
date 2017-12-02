export interface Language {
    id: number;
    flags: string[];
    languageName: string;
    welcomeText: string;
}

type FetchOptions = { signal?: AbortSignal };

export async function fetchLanguages(opts?: FetchOptions): Promise<Language[]> {
    const signal = opts && opts.signal;

    const response = await fetch('http://localhost:3000/languages', { signal });
    return await response.json();
}
