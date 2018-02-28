import React from 'react';

import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';
import { LoginScreen } from './LoginScreen';

import styles from './Introduction.scss';

type IntroductionProps = { languagesLoaded: boolean } & Callback<'onBeginQuestions', void>;
type IntroductionState = { showLogin: boolean };

export class Introduction extends React.Component<IntroductionProps, IntroductionState> {

    state = {
        showLogin: false,
    };

    constructor(props: IntroductionProps) {
        super(props);
    }

    showLoginScreen() {
        this.setState({ showLogin: true });
    }

    hideLoginScreen() {
        this.setState({ showLogin: false });
    }

    render() {
        return <div className={styles.introScreen}>
            <header className={styles.header}>
                <h1>Modern Day Slavery&nbsp;App</h1>
            </header>
            <nav className={styles.menu}>
                {this.props.languagesLoaded
                    ? <Button className={styles.button}
                              onClick={this.props.onBeginQuestions}>Begin Questions (anonymously)</Button>
                    : <Button className={styles.button} disabled={true}>Loading Data...</Button>}
                <Button className={styles.button}
                        onClick={() => this.showLoginScreen()}>Login</Button>
                <Button className={styles.button}>Help</Button>
            </nav>

            {this.state.showLogin
                ? <LoginScreen onLogin={u => console.log(u)}
                               onCancel={() => this.hideLoginScreen()}/>
                : undefined}
        </div>;
    }
}
