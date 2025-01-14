import { Button } from '../../../components/button/Button'
import { Popover } from '../../../components/popover/Popover'
import { Dropdown } from '../../../components/dropdown/Dropdown'
import imageTextUrl from '../../../assets/text.svg'
import styles from './EditTextComponent.module.css'
import {useState} from 'react'
import { FigureElementType, ImageElementType, TextElementType } from '../../../store/types'
import { useAppActions } from '../../../store/hooks/useAppActions'

const options = [    
    'Times New Roman', 
    'Arial', 
    'Calibri', 
    'Verdana', 
    'Georgia', 
    'Courier New', 
    'Impact'
]

const sizes = [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

type EditTextComponentProps = {
    element?: ImageElementType | TextElementType | FigureElementType;
    selectedSlideId: string | null;
};

const EditTextComponent: React.FC<EditTextComponentProps> = ({ element, selectedSlideId }) => {

    const {addTextElement, updateTextStyle} = useAppActions();

    const [textStyle, setTextStyle] = useState({
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        textTransform: 'none'
    });

    const [activeStyles, setActiveStyles] = useState({
        bold: false,
        italic: false,
        underline: false,
        capsLock: false,
    });

    const toggleBold = () => {
        const newWeight = textStyle.fontWeight === 'bold' ? 'normal' : 'bold';
        setTextStyle(prev => ({
            ...prev,
            fontWeight: newWeight
        }));
        setActiveStyles(prev => ({ ...prev, bold: !prev.bold }));
        updateTextStyle('weight', newWeight);
    };

    const toggleItalic = () => {
        const newStyle = textStyle.fontStyle === 'italic' ? 'normal' : 'italic';
        setTextStyle(prev => ({
            ...prev,
            fontStyle: newStyle
        }));
        setActiveStyles(prev => ({ ...prev, italic: !prev.italic }));
        updateTextStyle('style', newStyle);
    };

    const toggleUnderline = () => {
        const newDecoration = textStyle.textDecoration === 'underline' ? 'none' : 'underline';
        setTextStyle(prev => ({
            ...prev,
            textDecoration: newDecoration
        }));
        setActiveStyles(prev => ({ ...prev, underline: !prev.underline }));
        updateTextStyle('decoration', newDecoration);
    };

    const toggleCapsLock = () => {
        const newTransform = textStyle.textTransform === 'uppercase' ? 'none' : 'uppercase';
        setTextStyle(prev => ({
            ...prev,
            textTransform: newTransform
        }));
        setActiveStyles(prev => ({ ...prev, capsLock: !prev.capsLock }));
        updateTextStyle('transform', newTransform);
    };

    const handleAddText = () => {
        if (selectedSlideId) {
            addTextElement('');
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        updateTextStyle('color', newColor);
    };

    return (
        element && element.type === 'text' ? (
        <Popover 
            content={
                <div className={styles.container}>
                    <div className={styles.row}>
                        <span className={styles.label}>font</span>
                        <Dropdown 
                            options={options} 
                            label={element.fontFamily}
                            size={'medium'}
                            property='fontFamily'
                            onClick={updateTextStyle}
                        />
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>size</span>
                        <Dropdown 
                            options={sizes} 
                            label={String(element.fontSize)} 
                            size={'small'} 
                            property='fontSize'
                            onClick={updateTextStyle}
                        />
                        <div className={styles.buttonGroup}>
                            <span 
                                onClick={toggleBold} 
                                className={`${styles.styleButton} ${activeStyles.bold ? styles.activeBold : ''}`}
                            >
                                B
                            </span>
                            <span 
                                onClick={toggleItalic} 
                                className={`${styles.styleButton} ${activeStyles.italic ? styles.activeStyle : ''}`}
                            >
                                I
                            </span>
                            <span 
                                onClick={toggleUnderline} 
                                className={`${styles.styleButton} ${activeStyles.underline ? styles.activeUnderline : ''}`}
                            >
                                U
                            </span>
                            <span 
                                onClick={toggleCapsLock} 
                                className={`${styles.styleButton} ${activeStyles.capsLock ? styles.activeCapsLock : ''}`}
                            >
                                A
                            </span>
                        </div>
                        <input 
                            type="color" 
                            className={styles.colorPicker}
                            onChange={handleColorChange}
                            value={element.color}
                        />
                    </div>
                </div>
            }
        >
            <Button type={'icon'} onClick={() => {}} iconUrl={imageTextUrl} iconSize={'medium'}/>
        </Popover>
        ) : (
            <Button 
                type={'icon'} 
                onClick={handleAddText} 
                iconUrl={imageTextUrl} 
                iconSize={'medium'}
            />
        )
    )
}

export {
    EditTextComponent
}