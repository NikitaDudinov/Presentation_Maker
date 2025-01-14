import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

type ButtonProps = {
    type: 'text' | 'icon';
    onClick: () => void;
    label?: string;
    iconUrl?: string;
    iconSize?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
    type, 
    onClick, 
    label, 
    iconUrl, 
    iconSize = 'medium',
    disabled = false
}) => {
    if (type === 'text') {
        return (
            <button 
                onClick={onClick}
                className={classNames(styles.buttonText, {
                    [styles.disabledButton]: disabled
                })}
                disabled={disabled}
            >
                <span className={classNames(styles.labelButton, {
                    [styles.disabledLabelButton]: disabled
                })}>
                    {label}
                </span>
            </button>
        );
    }

    return (
        <button 
            onClick={onClick}
            className={classNames(styles.buttonIcon, {
                [styles.disabledButton]: disabled
            })}
            disabled={disabled}
        >
            <img 
                src={iconUrl} 
                alt={label || 'icon'} 
                className={classNames({
                    [styles.smallIcon]: iconSize === 'small',
                    [styles.mediumIcon]: iconSize === 'medium',
                    [styles.largeIcon]: iconSize === 'large'
                })}
            />
        </button>
    );
};

export {
    Button,
};