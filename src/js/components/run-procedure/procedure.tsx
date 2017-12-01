import delay from 'delay';

export const enum StepKind {
    QUESTION = 'step',
    ADVICE = 'advice',
}

export interface ProcedureStepQuestion {
    kind: StepKind.QUESTION;
    question: string;
    answers: { answer: string, link: number }[];
}

export interface ProcedureStepAdvice {
    kind: StepKind.ADVICE;
    forUser: string;
    forFacilitator: string;
}

export interface Procedure {
    start: number;

    [key: number]: ProcedureStepQuestion | ProcedureStepAdvice;
}

export async function fetchProcedure(languageId: number): Promise<Procedure> {
    await delay(1000); // TODO: remove me!
    return {
        start: 0,

        0: {
            kind: StepKind.QUESTION,
            question: 'Are you free to leave your home?',
            answers: [{
                answer: 'Yes',
                link: 1,
            }, {
                answer: 'Sometimes',
                link: 2,
            }, {
                answer: 'Never',
                link: 3,
            }],
        },

        1: {
            kind: StepKind.QUESTION,
            question: 'Are you a minor (less than 18 years old)?',
            answers: [{
                answer: 'Yes',
                link: 3,
            }, {
                answer: 'No',
                link: 4,
            }],
        },

        2: {
            kind: StepKind.QUESTION,
            question: 'Could you leave at any time if you wished?',
            answers: [{
                answer: 'Yes',
                link: 4,
            }, {
                answer: 'No',
                link: 3,
            }],
        },

        3: {
            kind: StepKind.ADVICE,
            forUser: 'Call the police',
            forFacilitator: 'Make sure the user calls the police',
        },

        4: {
            kind: StepKind.ADVICE,
            forUser: 'Nothing to do',
            forFacilitator: 'This person is not at risk',
        },

    };
}
