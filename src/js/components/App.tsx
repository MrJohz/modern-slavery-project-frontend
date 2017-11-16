import React from 'react';
import { LanguageSelector } from './language-selector/LanguageSelector';

import './App.css';

const enum AppStateDiscriminator {
    LANGUAGE_SELECTION,
}

export interface AppState {
    readonly page: AppStateDiscriminator;
}

export function initModel(): AppState {
    return {
        page: AppStateDiscriminator.LANGUAGE_SELECTION,
    };
}

export function App(state: { model: AppState }) {
    switch (state.model.page) {
        case AppStateDiscriminator.LANGUAGE_SELECTION:
            return <LanguageSelector/>;
    }
    return <div>
    </div>;
}
