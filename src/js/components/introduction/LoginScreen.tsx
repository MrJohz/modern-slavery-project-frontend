import React, { ChangeEvent } from 'react';

import { autobind } from 'core-decorators';

import { Session } from '../../models/session';
import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';

import styles from './LoginScreen.scss';

type LoginProps = Callback<'onLogin', Session> & Callback<'onCancel', void>;
type LoginState = {
    email: string, emailErrors: string[],
    password: string, passwordErrors: string[],
    loginErrors: string[]
};

export class LoginScreen extends React.Component<LoginProps, LoginState> {

    state = {
        emailErrors: [], email: '',
        passwordErrors: [], password: '',
        loginErrors: [],
    };

    updateState<T extends keyof LoginState>(assignTo: T): (ev: ChangeEvent<HTMLInputElement>) => void {
        return (ev: ChangeEvent<HTMLInputElement>) => {
            const newState = {} as Pick<LoginState, T>;
            newState[assignTo] = ev.target.value;
            this.setState(newState);
        };
    }

    @autobind
    validatePassword() {
        const { password } = this.state;
        const passwordErrors = [];
        if (!password) {
            passwordErrors.push(`Please provide your password`);
        }

        this.setState({ passwordErrors });

        return passwordErrors;
    }

    @autobind
    clearPasswordErrors() {
        this.setState({ passwordErrors: [] });
    }

    @autobind
    validateEmail() {
        const { email } = this.state;
        const emailErrors = [];
        if (!email) {
            emailErrors.push(`Please provide your password`);
        } else if (!email.includes('@')) {
            emailErrors.push(`This doesn't appear to be a valid email address`);
        }

        this.setState({ emailErrors });

        return emailErrors;
    }

    @autobind
    clearEmailErrors() {
        this.setState({ emailErrors: [] });
    }

    @autobind
    async onSubmit() {
        const emailErrors = this.validateEmail();
        const passwordErrors = this.validatePassword();

        if (emailErrors.length || passwordErrors.length) {
            return;
        }

        const { email, password } = this.state;

        const maybeSession = await Session.create(email, password);

        if (Array.isArray(maybeSession)) {
            this.setState({loginErrors: maybeSession});
        } else {
            this.setState({ loginErrors: []});
            this.props.onLogin(maybeSession);
        }
    }

    render() {
        return [
            <div key={'login form'} className={styles.loginScreen}>
                <label htmlFor="email">Email:</label>
                <input id="email" type="text"
                       onChange={this.updateState('email')}
                       onBlur={this.validateEmail}
                       onFocus={this.clearEmailErrors}/>
                {
                    this.state.emailErrors
                        ? (<div className={styles.errors}>{this.state.emailErrors}</div>)
                        : null
                }
                <label htmlFor="password">Password:</label>
                <input id="password" type="password"
                       onChange={this.updateState('password')}
                       onBlur={this.validatePassword}
                       onFocus={this.clearPasswordErrors}/>
                {
                    this.state.passwordErrors
                        ? (<div className={styles.errors}>{this.state.passwordErrors}</div>)
                        : null
                }
                {
                    this.state.loginErrors
                        ? (<div className={styles.errors}>{this.state.loginErrors}</div>)
                        : null
                }
                <Button onClick={this.onSubmit}>Login</Button>
            </div>,

            <div key={'login border'} className={styles.loginScreenBorder}
                 onClick={() => this.props.onCancel(undefined)}/>,
        ];
    }
}
