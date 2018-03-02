import React, { ChangeEvent } from 'react';

import { autobind } from 'core-decorators';

import { User } from '../../models/session';
import { Callback } from '../../utils/jsx-props';
import { Button } from '../stylish/buttons';

import styles from './OptionsScreen.scss';

type ChangeEventCallback = (ev: ChangeEvent<HTMLInputElement>) => void;

function updateState<T, K extends keyof T>(parent: React.Component<any, T>, assignTo: K): ChangeEventCallback {
    return (ev: ChangeEvent<HTMLInputElement>) => {
        const newState = {} as Pick<T, K>;
        newState[assignTo] = ev.target.value as any;
        parent.setState(newState);
    };
}

type EditableNameProps = { name: string } & Callback<'onSave', string>;
type EditableNameState = { editing: boolean, name: string };

class EditableName extends React.Component<EditableNameProps, EditableNameState> {
    state: EditableNameState = { editing: false, name: '' };

    @autobind
    startEditing() {
        this.setState({ editing: true, name: this.props.name });
    }

    @autobind
    saveEdit() {
        this.props.onSave(this.state.name);
        this.setState({ editing: false });
    }

    render(): JSX.Element {
        if (this.state.editing) {
            return <div>
                <label htmlFor="name">Display name:</label>
                <input id="name" value={this.state.name}
                       onChange={updateState(this, 'name')}/>
                <Button className={styles.miniButton} onClick={this.saveEdit}>SAVE</Button>
            </div>;
        } else {
            return <div>
                <span>Display name: {this.props.name}</span>
                <Button className={styles.miniButton} onClick={this.startEditing}>EDIT</Button>
            </div>;
        }
    }
}

type OptionsProps = { user: User } & Callback<'onClose', void>;
type OptionsState = {
    user: User
};

export class OptionsScreen extends React.Component<OptionsProps, OptionsState> {

    constructor(props: OptionsProps) {
        super(props);

        this.state = { user: props.user };
    }

    @autobind
    async saveName(name: string) {
        // TODO: get this to work
        const user = this.state.user.clone();
        user.name = name;
        await user.save();
    }

    render() {
        return [
            <div key={'options form'} className={styles.loginScreen}>
                <EditableName name={this.state.user.name} onSave={console.log}/>
            </div>,

            <div key={'options border'} className={styles.loginScreenBorder}
                 onClick={() => this.props.onClose(undefined)}/>,
        ];
    }
}
