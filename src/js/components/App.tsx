import React from 'react';

import { LanguageSelector } from './language-selector/LanguageSelector';
import { fetchProcedure, Procedure } from './run-procedure/procedure';
import { RunProcedure } from './run-procedure/RunProcedure';

import './App.css';

const enum AppStateDiscriminator {
    LANGUAGE_SELECTION,
    RUN_PROCEDURE,
}

export type AppState
    = { page: AppStateDiscriminator.LANGUAGE_SELECTION }
    | { page: AppStateDiscriminator.RUN_PROCEDURE, language: number, procedure: Procedure }
    ;

type AppProps = {};

export class App extends React.Component<AppProps, AppState> {

    state: AppState;

    constructor(props: AppProps) {
        super(props);

        this.state = { page: AppStateDiscriminator.LANGUAGE_SELECTION };
    }

    async setLanguage(languageId: number) {
        const procedure = await fetchProcedure(languageId);
        this.setState((): AppState => ({
            page: AppStateDiscriminator.RUN_PROCEDURE,
            language: languageId,
            procedure: procedure,
        }));
    }

    render() {
        switch (this.state.page) {
            case AppStateDiscriminator.LANGUAGE_SELECTION:
                return <LanguageSelector onSelect={({ languageId }) => this.setLanguage(languageId)}/>;
            case AppStateDiscriminator.RUN_PROCEDURE:
                return <RunProcedure language={this.state.language} procedure={this.state.procedure}/>;
        }

        return <div>Error: We've ended up in invalid state... :(</div>;
    }
}
