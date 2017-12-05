import delay from 'delay';
import React from 'react';

import { Procedure, ProcedureStepAdvice, ProcedureStepQuestion, StepKind } from '../../models/procedure';
import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';

import styles from './RunProcedure.css';

type QuestionPageProps = { question: ProcedureStepQuestion } & Callback<'onAnswer', number | null>;

function QuestionPage({ question, onAnswer }: QuestionPageProps) {
    return <div>
        <div className={styles.question}>{question.question}</div>
        <div className={styles.answerBox}>{
            question.answers.map(answer =>
                <Button key={answer.answer}
                        onClick={() => onAnswer(answer.link)}>
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

type RunProcedureProps = { language: number, procedure: Procedure } & Callback<'onFinished', number[]>;
type RunProcedureState = { steps: number[] };

export class RunProcedure extends React.Component<RunProcedureProps, RunProcedureState> {

    private languageId: number;
    private procedure: Procedure;
    private onFinishedCallback: (arg: number[]) => void;

    constructor(props: RunProcedureProps) {
        super(props);

        this.languageId = props.language;
        this.procedure = props.procedure;
        this.onFinishedCallback = props.onFinished;

        this.state = {
            steps: [this.procedure.start],
        };
    }

    async nextStep(id: number | null) {
        await delay(350);

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
            this.onFinishedCallback([...ids.slice(1) as number[], ...this.state.steps]);
        } else {
            this.setState(({ steps }): RunProcedureState => {
                return { steps: [...ids as number[], ...steps] };
            });
        }
    }

    render() {
        const currentStep = this.procedure[this.state.steps[0]];
        switch (currentStep.kind) {
            case StepKind.QUESTION:
                return <QuestionPage question={currentStep} onAnswer={id => this.nextStep(id)}/>;
            case StepKind.ADVICE:
                return <AdvicePage advice={currentStep} onFinished={id => this.nextStep(id)}/>;
        }
        return <div>Hello, {this.languageId}</div>;
    }
}
