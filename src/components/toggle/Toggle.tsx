import React from 'react';
import styles from './Toggle.module.css'
import classNames from 'classnames';

interface ToggleProps {
    initialChecked?: boolean;
    onToggle?: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ initialChecked = false, onToggle }) => {
    const [isChecked, setIsChecked] = React.useState(initialChecked);

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setIsChecked(newChecked);
        if (onToggle) {
            onToggle(newChecked);
        }
    };

    return (
        <label className={styles.toggleContainer}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
                style={{ display: 'none' }}
            />
            <div 
                className={
                    classNames(styles.toggle, {
                        [styles.checked]: isChecked,
                    })
                }
            >
                <div 
                    className={
                        classNames(styles.toggleThumb, {
                            [styles.checkedToggleThumb]: isChecked,
                        })
                    }
                />
            </div>
        </label>
    );
};

export {
    Toggle,
}