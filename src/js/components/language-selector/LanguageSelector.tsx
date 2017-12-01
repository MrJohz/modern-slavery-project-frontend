import React from 'react';

import styles from './LanguageSelector.css';
import { Flag } from './Flag';
import { Callback, Optional } from '../../utils/jsx-props';

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
        flags: ['es', 'ad' /* no catalan flag...  :( */],
        languageName: 'Català',
        welcomeText: `Hola, sóc aquí per ajudar-te. Feu clic aquí per continuar.`,
    },
    {
        id: 3,
        flags: ['ba', 'rs'],
        languageName: 'Bosanski',
        welcomeText: `Zdravo, tu sam da vam pomognem. Kliknite ovde da nastavite.`,
    },
    {
        id: 4,
        flags: ['cn', 'tw', 'sg', 'mm'],
        languageName: '中文',
        welcomeText: `你好，我来帮你。请点击这里继续。`,
    },
    {
        id: 5,
        flags: ['ng', 'gq'],
        languageName: 'Igbo',
        welcomeText: `Ndewo, m nọ ebe a iji nyere gị aka. Biko pịa ebe a iji gaa n'ihu.`,
    },
    {
        id: 6,
        flags: ['pk', 'in'],
        languageName: 'ਪੰਜਾਬੀ',
        welcomeText: `ਹੈਲੋ, ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ ਜਾਰੀ ਰੱਖਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਇੱਥੇ ਕਲਿੱਕ ਕਰੋ.`,
    },
];

type LanguageOptionOpts = { language: Language } & Optional<Callback<'onSelect', { languageId: number }>>;

function LanguageOption({ language, onSelect }: LanguageOptionOpts) {
    return <div className={styles.flagSelector} onClick={() => onSelect && onSelect({ languageId: language.id })}>
        <div className={styles.flags}>
            {language.flags.map(flagSrc => <Flag key={flagSrc} flagId={flagSrc}/>)}
        </div>
        <div className={styles.welcomeText}>{language.welcomeText}</div>
        <div className={styles.languageName}>[ {language.languageName} ]</div>
    </div>;
}

type LanguageSelectorOpts = Optional<Callback<'onSelect', { languageId: number }>>

export function LanguageSelector({ onSelect }: LanguageSelectorOpts) {
    return <div> {
        languages.map(lang => <LanguageOption key={lang.id} language={lang} onSelect={onSelect}/>)
    } </div>;
}
