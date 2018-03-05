import { ROOT_URL } from '../utils/constants';

export const enum StepKind {
    QUESTION = 'question',
    ADVICE = 'advice',
}

export interface ProcedureStepQuestion {
    id: number;
    kind: StepKind.QUESTION;
    question: string;
    answers: { id: number, answer: string, link: number | null }[];
}

export interface ProcedureStepAdvice {
    id: number;
    kind: StepKind.ADVICE;
    link: number | null;
    forUser: string;
    forFacilitator: string;
}

export interface Procedure {
    start: number;

    [key: number]: ProcedureStepQuestion | ProcedureStepAdvice;
}

export interface History {
    question: number;
    answer: number;
}

type FetchOptions = { signal?: AbortSignal };

export async function fetchProcedure(languageId: number, opts?: FetchOptions): Promise<Procedure> {
    const signal = opts && opts.signal;

    const response = await fetch(`${ROOT_URL}/procedures/1?language=${languageId}`, { signal });
    return await response.json();
}

export async function postResults(languageId: number, session: string | null, results: History[], opts?: FetchOptions) {
    const signal = opts && opts.signal;
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (session != null) {
        headers.set('session', session);
    }

    await fetch(`${ROOT_URL}/results`, {
        signal, headers,
        method: 'POST',
        body: JSON.stringify({ language: languageId, results }),
    });
}
