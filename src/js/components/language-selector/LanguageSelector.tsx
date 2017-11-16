import React from 'react';

import styles from './LanguageSelector.css';
import { Flag } from './Flag';

export interface Language {
    id: number;
    flags: string[];
    languageName: string;
    welcomeText: string;
}

const languages: Language[] = [
    {
        id: 0,
        flags: ['gb', 'us', 'ca'],
        languageName: 'English',
        welcomeText: `Hello, I'm here to help you.  Please click here to continue.`,
    },
    {
        id: 1,
        flags: ['de'],
        languageName: 'Deutsch',
        welcomeText: `Hallo, ich bin hier, um dir zu helfen. Bitte klicken Sie hier um fortzufahren.`,
    },
    {
        id: 2,
        flags: ['es'],
        languageName: 'Català',
        welcomeText: `Hola, sóc aquí per ajudar-te. Feu clic aquí per continuar.`,
    },
    {
        id: 3,
        flags: ['es'],
        languageName: 'Català',
        welcomeText: `Hola, sóc aquí per ajudar-te. Feu clic aquí per continuar.`,
    },
];

type LanguageOptionOpts = { language: Language };

function LanguageOption({ language }: LanguageOptionOpts) {
    return <div className={styles.flagSelector}>
        <div className={styles.flags}>
            {language.flags.map(flagSrc => <Flag key={flagSrc} flagId={flagSrc}/>)}
        </div>
        <div className={styles.welcomeText}>{language.welcomeText}</div>
        <div className={styles.languageName}>[ {language.languageName} ]</div>
    </div>;
}

export function LanguageSelector() {
    return <div>
        {languages.map(lang => <LanguageOption key={lang.id} language={lang}/>)}
    </div>;
}
