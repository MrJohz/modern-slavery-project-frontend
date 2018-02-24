import React from 'react';

import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';

import styles from './Introduction.scss';

type IntroductionProps = { languagesLoaded: boolean } & Callback<'onBeginQuestions', void>;

export function Introduction({ languagesLoaded, onBeginQuestions }: IntroductionProps) {
    return <div className={styles.introScreen}>
        <header className={styles.header}>
            <h1>Modern Day Slavery&nbsp;App</h1>
        </header>
        <nav className={styles.menu}>
            {languagesLoaded
                ? <Button className={styles.button}
                          onClick={onBeginQuestions}>Begin Questions</Button>
                : <Button className={styles.button} disabled={true}>Loading Data...</Button>}
            <Button className={styles.button}>Help</Button>
        </nav>
    </div>;
}
