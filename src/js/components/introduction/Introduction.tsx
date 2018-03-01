import { autobind } from 'core-decorators';
import React from 'react';
import { Session } from '../../models/session';

import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';
import { LoginScreen } from './LoginScreen';

import styles from './Introduction.scss';

type LoginButtonProps = { maybeSession: Session | null, showLogin: () => void };

function LoginButton({ maybeSession, showLogin }: LoginButtonProps) {
    if (maybeSession) {
        return <Button className={styles.menuItem}>Options</Button>;
    } else {
        return <Button className={styles.menuItem}
                       onClick={showLogin}>Login</Button>;
    }
}

type LogoutButtonProps = { maybeSession: Session | null, logout: () => void };

function LogoutButton({ maybeSession, logout }: LogoutButtonProps) {
    if (maybeSession) {
        return <Button className={styles.menuItem} onClick={logout}>Logout</Button>;
    } else {
        return null;
    }
}

type LoggedInBylineProps = { maybeSession: Session | null };

function LoggedInByline({ maybeSession }: LoggedInBylineProps) {
    if (maybeSession) {
        return <p className={styles.menuItem}>
            You are currently logged in as&nbsp;{maybeSession.user.name}.
        </p>;
    } else {
        return <p className={styles.menuItem}>
            You are not currently logged in. Your responses will be submitted&nbsp;anonymously.
        </p>;
    }
}

type IntroductionProps = { languagesLoaded: boolean } & Callback<'onBeginQuestions', void>;
type IntroductionState = { showLogin: boolean, session: Session | null };

export class Introduction extends React.Component<IntroductionProps, IntroductionState> {

    state: IntroductionState = {
        session: null,
        showLogin: false,
    };

    constructor(props: IntroductionProps) {
        super(props);
    }

    @autobind
    showLoginScreen() {
        this.setState({ showLogin: true });
    }

    @autobind
    hideLoginScreen() {
        this.setState({ showLogin: false });
    }

    @autobind
    onLogin(session: Session) {
        this.setState({ session, showLogin: false });
    }

    @autobind
    async onLogout() {
        const session = this.state.session;
        await (session && session.clear());
        this.setState({ session: null });
    }

    render() {
        const session = this.state.session;
        let body;

        if (this.props.languagesLoaded) {
            body = <nav className={styles.menu}>
                <LoggedInByline maybeSession={session}/>
                <Button className={styles.menuItem}
                        onClick={this.props.onBeginQuestions}>Begin Questions</Button>
                <Button className={styles.menuItem}>Help</Button>
                <LoginButton maybeSession={this.state.session} showLogin={this.showLoginScreen}/>
                <LogoutButton maybeSession={this.state.session} logout={this.onLogout}/>
            </nav>;
        } else {
            body = <div className={styles.menu}>
                <p>Loading data...</p>
            </div>;
        }

        return <div className={styles.introScreen}>
            <header className={styles.header}>
                <h1>Modern Day Slavery&nbsp;App</h1>  {/* avoid widow line w/ non-breaking space  */}
            </header>
            {body}

            {this.state.showLogin
                ? <LoginScreen onLogin={this.onLogin}
                               onCancel={this.hideLoginScreen}/>
                : undefined}
        </div>;
    }
}
