import React from 'react';

import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';

import styles from './Introduction.scss';

type IntroductionProps = { languagesLoaded: boolean } & Callback<'onBeginQuestions', void>;
type IntroductionState = { showLogin: boolean };

function LoginScreen() {
    return <div className={styles.loginScreen}>
        <label htmlFor="email">Email:</label><input id="email" type="text"/>
        <label htmlFor="password">Password:</label><input id="password" type="password"/>
        <Button>Login</Button>
    </div>;
}

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
                ? <LoginScreen/>
                : undefined}
        </div>;
    }
}
