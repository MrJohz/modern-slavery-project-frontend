import React from 'react';

import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';

import styles from './HelpScreen.scss';
import text from './HelpScreen.md';

type HelpProps = Callback<'onClose', void>;

export function HelpScreen({ onClose }: HelpProps) {
    return <div>
        <div className={styles.loginScreen}
             dangerouslySetInnerHTML={{ __html: text }}/>
        <Button className={styles.closeButton}
             onClick={() => onClose(undefined)}>X</Button>
        <div className={styles.loginScreenBorder}
             onClick={() => onClose(undefined)}/>
    </div>;
}
