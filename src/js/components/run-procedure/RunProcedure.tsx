import React from 'react';

import { Procedure, ProcedureStepAdvice, ProcedureStepQuestion, StepKind, History } from '../../models/procedure';
import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';

import styles from './RunProcedure.css';

type QuestionPageProps
    = { question: ProcedureStepQuestion }
    & Callback<'onAnswer', {next: number | null, answerId: number}>;

function QuestionPage({ question, onAnswer }: QuestionPageProps) {
    return <div>
        <div className={styles.question}>{question.question}</div>
        <div className={styles.answerBox}>{
            question.answers.map(answer =>
                <Button key={answer.answer}
                        onClick={() => onAnswer({next: answer.link, answerId: answer.id})}>
                    {answer.answer}
                </Button>)
        }</div>
    </div>;
}

type AdvicePageProps = { advice: ProcedureStepAdvice } & Callback<'onFinished', number | null>;

function AdvicePage({ advice, onFinished }: AdvicePageProps) {
    if (!advice.forUser) {
        onFinished(advice.link);  // if there is no advice to give, short-circuit and skip this
    }

    return <div className={styles.advicePage}>
        <div className={styles.adviceBox}>{advice.forUser}</div>
        <Button onClick={() => onFinished(advice.link)}>Continue</Button>
    </div>;
}

type RunProcedureProps = { language: number, procedure: Procedure } & Callback<'onFinished', History[]>;
type RunProcedureState = { steps: number[], history: History[] };

export class RunProcedure extends React.Component<RunProcedureProps, RunProcedureState> {

    private languageId: number;
    private procedure: Procedure;
    private onFinishedCallback: (arg: History[]) => void;

    constructor(props: RunProcedureProps) {
        super(props);

        this.languageId = props.language;
        this.procedure = props.procedure;
        this.onFinishedCallback = props.onFinished;

        this.state = {
            steps: [this.procedure.start],
            history: [],
        };
    }

    recordHistory(question: number, answer: number): Promise<void> {
        let resolve: () => void;
        const promise = new Promise<void>(r => { resolve = r;});

        this.setState(state => {
            resolve();
            return ({
                ...state,
                history: [...state.history, { question, answer }],
            });
        });

        return promise;
    }

    async nextStep(id: number | null) {
        const ids = [id];
        while (true) {  // don't display advice pages with no user-facing advice
            const stepId = ids[0];
            if (stepId == null) {
                break;
            }

            const step = this.procedure[stepId];
            if (step && step.kind === StepKind.ADVICE && !step.forUser) {
                ids.unshift(step.link);
            } else {
                break;
            }
        }

        if (ids[0] === null) {
            this.onFinishedCallback(this.state.history);
        } else {
            this.setState((state): RunProcedureState => ({
                ...state, steps: [...ids as number[], ...state.steps],
            }));
        }
    }

    render() {
        const currentStep = this.procedure[this.state.steps[0]];
        switch (currentStep.kind) {
            case StepKind.QUESTION:
                return <QuestionPage question={currentStep} onAnswer={async ({ next, answerId }) => {
                    await this.recordHistory(currentStep.id, answerId);
                    await this.nextStep(next);
                }}/>;
            case StepKind.ADVICE:
                return <AdvicePage advice={currentStep} onFinished={next => this.nextStep(next)}/>;
        }
        return <div>Hello, {this.languageId}</div>;
    }
}
