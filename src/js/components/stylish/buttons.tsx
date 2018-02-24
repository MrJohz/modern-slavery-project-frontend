import React from 'react';
import classNames from 'classnames';

import { Callback, Children, childrenise, ClassName, Optional } from '../../utils/jsx-props';

import styles from './buttons.scss';

type ButtonProps =
    Optional<{disabled: boolean}> &
    Children &
    Optional<ClassName> &
    Optional<Callback<'onClick', void>>;

export function Button({ disabled, children, onClick, className }: ButtonProps) {
    return <button onClick={() => onClick && onClick(undefined)}
                   disabled={disabled}
                   className={classNames(styles.button, className)}>{
        childrenise(children)
    }</button>;
}

export function SubtleButton({ children, onClick, className }: ButtonProps) {
    return <button onClick={() => onClick && onClick(undefined)}
                   className={classNames(styles.subtleButton, className)}>{
        childrenise(children)
    }</button>;
}
