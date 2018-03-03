import { ROOT_URL } from '../utils/constants';

export interface Language {
    id: number;
    flags: string[];
    languageName: string;
    welcomeText: string;
}

type FetchOptions = { signal?: AbortSignal };

export async function fetchLanguages(opts?: FetchOptions): Promise<Language[]> {
    const signal = opts && opts.signal;

    const response = await fetch(`${ROOT_URL}/languages`, { signal });
    return await response.json();
}
