import { autobind } from 'core-decorators';
import React from 'react';

import { fetchLanguages, Language } from '../models/language';
import { fetchProcedure, Procedure, History, postResults } from '../models/procedure';
import { Session } from '../models/session';
import { Introduction } from './introduction/Introduction';
import { Outroduction } from './outroduction/Outroduction';
import { LanguageSelector } from './language-selector/LanguageSelector';
import { RunProcedure } from './run-procedure/RunProcedure';

import './App.css';

const enum AppStateDiscriminator {
    LOADING,
    INTRODUCTION,
    LANGUAGE_SELECTION,
    RUN_PROCEDURE,
    OUTRODUCTION,
}

type LoadedProps = { languages: Language[] };

export type AppState
    = ({ page: AppStateDiscriminator.LOADING }
    | ({ page: AppStateDiscriminator.INTRODUCTION } & LoadedProps)
    | ({ page: AppStateDiscriminator.LANGUAGE_SELECTION } & LoadedProps)
    | ({ page: AppStateDiscriminator.RUN_PROCEDURE, language: number, procedure: Procedure } & LoadedProps)
    | ({ page: AppStateDiscriminator.OUTRODUCTION } & LoadedProps))
    & { session: Session | null };

type AppProps = {};

export class App extends React.Component<AppProps, AppState> {

    private canceller?: AbortController;

    state: AppState = {
        page: AppStateDiscriminator.LOADING,
        session: null,
    };

    async componentDidMount() {
        this.canceller = new AbortController();

        const languages = await fetchLanguages({ signal: this.canceller.signal });
        this.setLoaded({ languages });
        this.canceller = undefined;
    }

    componentWillUnmount() {
        this.canceller && this.canceller.abort();
    }

    beginProcedures() {
        this.setState({
            page: AppStateDiscriminator.LANGUAGE_SELECTION,
        });
    }

    setLoaded(props: LoadedProps) {
        this.setState({ page: AppStateDiscriminator.INTRODUCTION, ...props, session: this.state.session });
    }

    @autobind
    restartApp() {
        this.setState({ page: AppStateDiscriminator.INTRODUCTION });
    }

    @autobind
    setSession(session: Session | null) {
        this.setState({ session });
    }

    async setFinished(language: number, history: History[]) {
        const sessionId = this.state.session && this.state.session.id;
        await postResults(language, sessionId, history);
        this.setState({ page: AppStateDiscriminator.OUTRODUCTION });
    }

    async setLanguage(languageId: number) {
        const procedure = await fetchProcedure(languageId);
        this.setState({
            page: AppStateDiscriminator.RUN_PROCEDURE,
            language: languageId,
            procedure: procedure,
            session: this.state.session,
        });
    }

    render() {
        switch (this.state.page) {
            case AppStateDiscriminator.LOADING:
            case AppStateDiscriminator.INTRODUCTION:
                return <Introduction languagesLoaded={'languages' in this.state}
                                     onBeginQuestions={() => this.beginProcedures()}
                                     onSetSession={this.setSession}/>;
            case AppStateDiscriminator.LANGUAGE_SELECTION:
                return <LanguageSelector languages={this.state.languages}
                                         onSelect={({ languageId }) => this.setLanguage(languageId)}/>;
            case AppStateDiscriminator.RUN_PROCEDURE:
                const { language, procedure } = this.state;
                return <RunProcedure language={language}
                                     procedure={procedure}
                                     onFinished={(arg) => this.setFinished(language, arg)}/>;
            case AppStateDiscriminator.OUTRODUCTION:
                return <Outroduction onRestart={this.restartApp}/>;
        }

        return <div>Error: We've ended up in invalid state... :(</div>;
    }
}
