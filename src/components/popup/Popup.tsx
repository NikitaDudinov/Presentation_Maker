import { ReactElement, forwardRef } from "react";
import styles from './Popup.module.css';

type PopupProps = {
    height: string,
    width: string,
    content: ReactElement,
}

const Popup = forwardRef<HTMLDivElement, PopupProps>(({ height, width, content }, ref) => {
    return (
        <div className={styles.popupContainer}>
            <div ref={ref} style={{ maxWidth: width, maxHeight: height }} className={styles.popupContent}>
                {content}
            </div>
        </div>
    );
});

export {
    Popup,
};
