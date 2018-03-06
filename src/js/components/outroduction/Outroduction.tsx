import React from 'react';

import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';

import styles from './Outroduction.scss';

type IntroductionProps = Callback<'onRestart', void>;

export function Outroduction({ onRestart }: IntroductionProps) {
    return <div className={styles.outroScreen}>
        <p className={styles.thankYouText}>
            Thank you for completing this process!
        </p>
        <img src="https://www.turningtechnologies.ca/wp-content/uploads/2016/02/CheckMark.png?x23062"
             className={styles.tickImage}/>
        <Button onClick={onRestart} className={styles.button}>Go Back</Button>
    </div>;
}
