import React, { useState, useRef, useEffect} from 'react';
import styles from './Dropdown.module.css'
import dropdownIconUrl from '../../assets/drop-down.svg'
import classNames from 'classnames';

type DropdownProps = {
    options: string[] | number[];
    property: string;
    label: string;
    size?: string;
    onClick: (property: string, value: string | number) => void;
    value?: string | number;
}

const Dropdown: React.FC<DropdownProps> = ({ 
    options, 
    label, 
    size, 
    onClick, 
    property,
    value
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | number | null>(value || null);
    const [flipped, setFlipped] = useState(false);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedOption(value || null);
    }, [value]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setFlipped(!flipped);
    };
  
    const handleOptionClick = (option: string | number) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
  
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(target)) {
            setIsOpen(false);
            setFlipped(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
      
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = (option: string | number) => {
        handleOptionClick(option);
        console.log(property, option);
        onClick(property, option);
    };

    return (
        <div 
            className={classNames(styles.dropdownContainer, {
                [styles.mediumSize]: size === 'medium',
                [styles.smallSize]: size === 'small',
                [styles.largeSize]: size === 'large',
            })} 
            ref={dropdownMenuRef}
        >
            <button onClick={toggleDropdown} className={styles.dropdownToggle}>
                <span className={styles.dropdownLabel}>
                    {selectedOption !== null ? selectedOption : label}
                </span>
                <img 
                    className={styles.dropdownIcon}
                    src={dropdownIconUrl} 
                    alt={'drop-down'}
                    style={{
                        transform: flipped ? 'scaleY(-1)' : 'scaleY(1)',
                    }} 
                />
            </button>
            {isOpen && (
                <ul className={styles.dropdownMenu}>
                    {options.map((option) => (
                        <li 
                            key={option} 
                            onClick={() => handleClick(option)} 
                            className={classNames(styles.containerItemMenu, {
                                [styles.selected]: option === selectedOption
                            })}
                        >
                            <span className={styles.itemMenu}>{option}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { 
    Dropdown,
}