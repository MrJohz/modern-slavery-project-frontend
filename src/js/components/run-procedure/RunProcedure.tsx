import React from 'react';
import { Procedure, ProcedureStepAdvice, ProcedureStepQuestion, StepKind } from './procedure';

import styles from './RunProcedure.css';

type RunProcedureProps = { language: number, procedure: Procedure };
type RunProcedureState = { currentStepId: number };

type QuestionPageProps = { question: ProcedureStepQuestion }

function QuestionPage({ question }: QuestionPageProps) {
    return <div>Hello! {question.question} - {question.answers.map(answer => answer.answer + '->' + answer.link)}</div>;
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

    render() {
        const currentStep = this.procedure[this.state.currentStepId];
        switch (currentStep.kind) {
            case StepKind.QUESTION:
                return <QuestionPage question={currentStep}/>;
            case StepKind.ADVICE:
                return <AdvicePage advice={currentStep}/>;
        }
        return <div>Hello, {this.languageId}</div>;
    }
}
