import React from 'react';

import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';

import styles from './LoginScreen.scss';

type LoginProps = Callback<'onLogin', {}> & Callback<'onCancel', void>;

export class LoginScreen extends React.Component<LoginProps> {
    render() {
        return <div>
            <div className={styles.loginScreen}>
                <label htmlFor="email">Email:</label><input id="email" type="text"/>
                <label htmlFor="password">Password:</label><input id="password" type="password"/>
                <Button>Login</Button>
            </div>
            <div onClick={() => this.props.onCancel(undefined)} className={styles.loginScreenBorder}/>
        </div>;
    }
}
