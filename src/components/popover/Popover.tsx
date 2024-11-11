import { useState, useRef, ReactElement, useEffect } from 'react';
import styles from './Popover.module.css'


type PopoverProps = {
    children: ReactElement,
    content: ReactElement
}

const Popover = ({ 
    children, 
    content 
}: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const togglePopover = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div ref={popoverRef} className={styles.popoverContainer}>
            <div onClick={togglePopover} className={styles.popoverChildren}>
                {children}
            </div>
            {isOpen && (
                <div className={styles.popoverContent}>
                    {content}
                </div>
            )}
        </div>
    );
};

export {
    Popover,
}