import { Button } from '../../../components/button/Button'
import { Popover } from '../../../components/popover/Popover'
import { Dropdown } from '../../../components/dropdown/Dropdown'
import imageTextUrl from '../../../assets/text.svg'
import styles from './EditTextComponent.module.css'
import {useState} from 'react'
import { ImageElementType, TextElementType } from '../../../store/types'
import { changePropertyTextElement } from '../../../store/changePropertyTextElement'
import { dispatch } from '../../../store/presentation'
import { addTextElement } from '../../../store/addTextElement'

const options = ['Times New Roman', 'Arial', 'Calibri']

const sizes = [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

type EditTextComponentProps = {
    element?: ImageElementType | TextElementType;
};

const EditTextComponent: React.FC<EditTextComponentProps> = ({ element }) => {

    if(element && element.type === 'text'){
        console.log(element.font)
    }

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

    const [inputText, setInputText] = useState('');

    const toggleBold = () => {
        setTextStyle(prev => ({
            ...prev,
            fontWeight: prev.fontWeight === 'bold' ? 'normal' : 'bold'
        }));
        setActiveStyles(prev => ({ ...prev, bold: !prev.bold }));
    };

    const toggleItalic = () => {
        setTextStyle(prev => ({
            ...prev,
            fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic'
        }));
        setActiveStyles(prev => ({ ...prev, italic: !prev.italic }));
    };

    const toggleUnderline = () => {
        setTextStyle(prev => ({
            ...prev,
            textDecoration: prev.textDecoration === 'underline' ? 'none' : 'underline'
        }));
        setActiveStyles(prev => ({ ...prev, underline: !prev.underline }));
    };

    const toggleCapsLock = () => {
        setTextStyle(prev => ({
            ...prev,
            textDecoration: prev.textTransform === 'uppercase' ? 'none' : 'uppercase'
        }));
        setActiveStyles(prev => ({ ...prev, capsLock: !prev.capsLock }));
    };


    return (
        element && element.type === 'text' ? (
        <Popover 
            content={
                <div>
                    <span className={styles.label}>font</span>
                    <Dropdown 
                        options={options} 
                        label={element.font.family}
                        size={'medium'}
                        property='family'
                        onClick={changePropertyTextElement}
                    />
                    <span className={styles.label}>size</span>
                    <Dropdown 
                        options={sizes} 
                        label={String(element.font.size)} 
                        size={'small'} 
                        property='size'
                        onClick={changePropertyTextElement}
                    />
                    <div className={styles.textEditor}>
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
                    </div>
                </div>
            }
        >
            <Button type={'icon'} onClick={() => {}} iconUrl={imageTextUrl} iconSize={'medium'}/>
        </Popover>
        ) : (
            <Popover 
            content={
                <div>
                <span className={styles.label}>Добавить текст</span>
                <Button type='text' onClick={() => dispatch(addTextElement)} label="Добавить текст"/>
                </div>
            }
        >
            <Button type={'icon'} onClick={() => {}} iconUrl={imageTextUrl} iconSize={'medium'}/>
        </Popover>
        )
        
    )
}



export {
    EditTextComponent
}