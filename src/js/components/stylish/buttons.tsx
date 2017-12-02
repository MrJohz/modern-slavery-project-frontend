import React from 'react';
import classNames from 'classnames';

import { Callback, Children, childrenise, ClassName, Optional } from '../../utils/jsx-props';

import styles from './buttons.css';

type ButtonProps =
    Children &
    Optional<ClassName> &
    Optional<Callback<'onClick', void>>;

export function Button({ children, onClick, className }: ButtonProps) {
    return <button onClick={() => onClick && onClick(undefined)}
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
