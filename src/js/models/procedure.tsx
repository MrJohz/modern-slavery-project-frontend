export const enum StepKind {
    QUESTION = 'question',
    ADVICE = 'advice',
}

export interface ProcedureStepQuestion {
    kind: StepKind.QUESTION;
    question: string;
    answers: { answer: string, link: number | null }[];
}

export interface ProcedureStepAdvice {
    kind: StepKind.ADVICE;
    link: number | null;
    forUser: string;
    forFacilitator: string;
}

export interface Procedure {
    start: number;

    [key: number]: ProcedureStepQuestion | ProcedureStepAdvice;
}

type FetchOptions = { signal?: AbortSignal };

export async function fetchProcedure(languageId: number, opts?: FetchOptions): Promise<Procedure> {
    const signal = opts && opts.signal;

    const response = await fetch(`http://localhost:3000/procedures/1?language=${languageId}`, { signal });
    return await response.json();
}
