import React from 'react';

import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';

import styles from './Outroduction.scss';

type IntroductionProps = Callback<'onRestart', void>;

export function Outroduction({ onRestart }: IntroductionProps) {
    return <div className={styles.outroScreen}>
        <p>
            Thank you for using this software.
        </p>
        <Button onClick={onRestart} className={styles.button}>Go Back</Button>
    </div>;
}
