import delay from 'delay';
import React from 'react';

import { Callback } from '../../utils/jsx-props';
import { Procedure, ProcedureStepAdvice, ProcedureStepQuestion, StepKind } from './procedure';

import styles from './RunProcedure.css';

type RunProcedureProps = { language: number, procedure: Procedure };
type RunProcedureState = { currentStepId: number };

type QuestionPageProps = { question: ProcedureStepQuestion } & Callback<'onAnswer', number>;

function QuestionPage({ question, onAnswer }: QuestionPageProps) {
    return <div>
        <div className={styles.question}>{question.question}</div>
        <div className={styles.answerBox}>{
            question.answers.map(answer =>
                <div key={answer.link} className={styles.answer}
                     onClick={() => onAnswer(answer.link)}>
                    {answer.answer}
                </div>)
        }</div>
    </div>;
}

type AdvicePageProps = { advice: ProcedureStepAdvice }

function AdvicePage({ advice }: AdvicePageProps) {
    return <div>Hello! For facilitator: {advice.forFacilitator}<br/>For user: {advice.forUser}</div>;
}

export class RunProcedure extends React.Component<RunProcedureProps, RunProcedureState> {

    private languageId: number;
    private procedure: Procedure;

    constructor(opts: RunProcedureProps) {
        super(opts);

        this.languageId = opts.language;
        this.procedure = opts.procedure;

        this.state = {
            currentStepId: this.procedure.start,
        };
    }

    async nextStep(id: number) {
        await delay(350);
        this.setState((): RunProcedureState => ({ currentStepId: id }));
    }

    render() {
        const currentStep = this.procedure[this.state.currentStepId];
        switch (currentStep.kind) {
            case StepKind.QUESTION:
                return <QuestionPage question={currentStep} onAnswer={id => this.nextStep(id)}/>;
            case StepKind.ADVICE:
                return <AdvicePage advice={currentStep}/>;
        }
        return <div>Hello, {this.languageId}</div>;
    }
}
