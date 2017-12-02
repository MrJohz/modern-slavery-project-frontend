import delay from 'delay';
import React from 'react';

import { Callback } from '../../utils/jsx-props';
import { Procedure, ProcedureStepAdvice, ProcedureStepQuestion, StepKind } from '../../models/procedure';
import { Button, SubtleButton } from '../stylish/buttons';

import styles from './RunProcedure.css';

type QuestionPageProps = { question: ProcedureStepQuestion } & Callback<'onAnswer', number>;

function QuestionPage({ question, onAnswer }: QuestionPageProps) {
    return <div>
        <div className={styles.question}>{question.question}</div>
        <div className={styles.answerBox}>{
            question.answers.map(answer =>
                <Button key={answer.link}
                        onClick={() => onAnswer(answer.link)}>
                    {answer.answer}
                </Button>)
        }</div>
    </div>;
}

type AdvicePageProps = { advice: ProcedureStepAdvice } & Callback<'onFinished', void>;

class AdvicePage extends React.Component<AdvicePageProps, { showing: 'facilitator' | 'user' }> {
    private advice: ProcedureStepAdvice;
    private onFinishedCallback: (arg: void) => void;

    constructor(props: AdvicePageProps) {
        super(props);
        this.advice = props.advice;
        this.onFinishedCallback = props.onFinished;

        this.state = { showing: 'user' };
    }

    setFinished() {
        this.onFinishedCallback(undefined);
    }

    setShowing(showing: 'facilitator' | 'user') {
        this.setState({ showing: showing });
    }

    render() {
        switch (this.state.showing) {
            case 'user':
                return <div className={styles.advicePage}>
                    <div className={styles.adviceBox}>{this.advice.forUser}</div>
                    <SubtleButton onClick={() => this.setShowing('facilitator')}>
                        Click here to continue
                    </SubtleButton>
                </div>;
            case 'facilitator':
                return <div className={styles.advicePage}>
                    <div className={styles.adviceBox}>{this.advice.forFacilitator}</div>
                    <Button onClick={() => this.setFinished()}>Click here to finish</Button>
                </div>;
        }
    }
}

type RunProcedureProps = { language: number, procedure: Procedure } & Callback<'onFinished', void>;
type RunProcedureState = { currentStepId: number };

export class RunProcedure extends React.Component<RunProcedureProps, RunProcedureState> {

    private languageId: number;
    private procedure: Procedure;
    private onFinishedCallback: (arg: void) => void;

    constructor(props: RunProcedureProps) {
        super(props);

        this.languageId = props.language;
        this.procedure = props.procedure;
        this.onFinishedCallback = props.onFinished;

        this.state = {
            currentStepId: this.procedure.start,
        };
    }

    async nextStep(id: number) {
        await delay(350);
        this.setState((): RunProcedureState => ({ currentStepId: id }));
    }

    setFinished() {
        this.onFinishedCallback(undefined);
    }

    render() {
        const currentStep = this.procedure[this.state.currentStepId];
        switch (currentStep.kind) {
            case StepKind.QUESTION:
                return <QuestionPage question={currentStep} onAnswer={id => this.nextStep(id)}/>;
            case StepKind.ADVICE:
                return <AdvicePage advice={currentStep} onFinished={() => this.setFinished()}/>;
        }
        return <div>Hello, {this.languageId}</div>;
    }
}
