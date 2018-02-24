import React from 'react';

import { Language } from '../../models/language';
import { Callback, Optional } from '../../utils/jsx-props';
import { Flag } from './Flag';

import styles from './LanguageSelector.css';

type LanguageOptionOpts = { language: Language } & Optional<Callback<'onSelect', { languageId: number }>>;

function LanguageOption({ language, onSelect }: LanguageOptionOpts) {
    return <div className={styles.flagSelector} onClick={() => onSelect && onSelect({ languageId: language.id })}>
        <div className={styles.flags}>
            {language.flags.map(flagSrc => <Flag key={flagSrc} flagId={flagSrc}/>)}
        </div>
        <div className={styles.welcomeText}>{language.welcomeText}</div>
        <div className={styles.languageName}>[&nbsp;{language.languageName}&nbsp;]</div>
    </div>;
}

type LanguageSelectorOpts = { languages: Language[] } & Optional<Callback<'onSelect', { languageId: number }>>

export function LanguageSelector({ languages, onSelect }: LanguageSelectorOpts) {
    return <div> {
        languages.map(lang => <LanguageOption key={lang.id} language={lang} onSelect={onSelect}/>)
    } </div>;
}
