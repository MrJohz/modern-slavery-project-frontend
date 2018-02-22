import React from 'react';

import { fetchLanguages, Language } from '../models/language';
import { fetchProcedure, Procedure, History, postResults } from '../models/procedure';
import { LanguageSelector } from './language-selector/LanguageSelector';
import { RunProcedure } from './run-procedure/RunProcedure';

import './App.css';

const enum AppStateDiscriminator {
    LOADING,
    LANGUAGE_SELECTION,
    RUN_PROCEDURE,
}

type LoadedProps = { languages: Language[] };

export type AppState
    = { page: AppStateDiscriminator.LOADING }
    | ({ page: AppStateDiscriminator.LANGUAGE_SELECTION } & LoadedProps)
    | ({ page: AppStateDiscriminator.RUN_PROCEDURE, language: number, procedure: Procedure } & LoadedProps)
    ;

type AppProps = {};

export class App extends React.Component<AppProps, AppState> {

    private canceller?: AbortController;

    constructor(props: AppProps) {
        super(props);

        this.state = { page: AppStateDiscriminator.LOADING };
    }

    async componentDidMount() {
        this.canceller = new AbortController();

        const languages = await fetchLanguages({ signal: this.canceller.signal });
        this.setLoaded({ languages });
        this.canceller = undefined;
    }

    componentWillUnmount() {
        this.canceller && this.canceller.abort();
    }

    setLoaded(props: LoadedProps) {
        this.setState((): AppState => ({
            ...props,
            page: AppStateDiscriminator.LANGUAGE_SELECTION,
        }));
    }

    async setFinished(arg: History[]) {
        await postResults(arg);

        this.setState((state: LoadedProps): AppState => ({
            ...state,
            page: AppStateDiscriminator.LANGUAGE_SELECTION,
        }));
    }

    async setLanguage(languageId: number) {
        const procedure = await fetchProcedure(languageId);
        this.setState((state: LoadedProps): AppState => ({
            ...state,
            page: AppStateDiscriminator.RUN_PROCEDURE,
            language: languageId,
            procedure: procedure,
        }));
    }

    render() {
        switch (this.state.page) {
            case AppStateDiscriminator.LOADING:
                return <div>Loading...</div>;
            case AppStateDiscriminator.LANGUAGE_SELECTION:
                return <LanguageSelector languages={this.state.languages}
                                         onSelect={({ languageId }) => this.setLanguage(languageId)}/>;
            case AppStateDiscriminator.RUN_PROCEDURE:
                return <RunProcedure language={this.state.language}
                                     procedure={this.state.procedure}
                                     onFinished={(arg) => this.setFinished(arg)}/>;
        }

        return <div>Error: We've ended up in invalid state... :(</div>;
    }
}
