import { Button } from '../../components/button/Button'
import styles from './TopPanel.module.css'
import imageBackUrl from '../../assets/back.png'
import imageAheadUrl from '../../assets/ahead.png'
import imagePlayUrl from '../../assets/play.svg'
import imageExportUrl from '../../assets/Export.svg'
import imageImportUrl from '../../assets/download.svg'
import { saveToJsonFile } from '../../store/files/saveToJsonFile'
import { getFromFile } from '../../store/files/getFromFile'
import { useRef } from 'react'
import { useAppSelector } from '../../store/hooks/useAppSelector'
import { useAppActions } from '../../store/hooks/useAppActions'
import { useContext } from 'react'
import { HistoryContext } from '../../store/hooks/historyContext'


const TopPanel = () => {
    const {changePresentationTitle, setPresentation} = useAppActions();

    const history = useContext(HistoryContext)

    document.addEventListener('keydown', handleKeyPress);

    function handleKeyPress(event: KeyboardEvent): void {
        if (event.ctrlKey && event.key === 'z') {
            event.preventDefault(); 
            onUndo();
        }
        if (event.ctrlKey && event.key === 'y') {
            event.preventDefault(); 
            onRedo();
        }
    }

    function onUndo() {
        const newPresentation = history.undo()
        if (newPresentation) {
            setPresentation(newPresentation)
        }
    }

    function onRedo() {
        const newPresentation = history.redo()
        if (newPresentation) {
            setPresentation(newPresentation)
        }
    }

    const presentation = useAppSelector((presentation => presentation))
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = event.target.value;
        changePresentationTitle(newValue);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            try {
                const presentation = await getFromFile(file);
                if(presentation) 
                    setPresentation(presentation)
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={styles.topPanel}>
            <div className={styles.navigationContainer}>
                <Button type={'icon'} iconUrl={imageBackUrl} onClick={onUndo} iconSize={'small'}/>
                <Button type={'icon'} iconUrl={imageAheadUrl} onClick={onRedo} iconSize={'small'}/>
            </div>
            <input
                className={styles.titleInput}
                type="text"
                defaultValue={presentation.title} 
                onKeyUp={() => "this.style.width = ;"}
                onChange={onTitleChange}
            />
            <div className={styles.actionContainer}>
                <Button type={'icon'} iconUrl={imagePlayUrl} onClick={() => {}} iconSize={'medium'}/>
                <div>
                    <Button type={'icon'} iconUrl={imageImportUrl} onClick={handleButtonClick} iconSize={'medium'}/>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }} 
                    />
                </div>
                <Button type={'icon'} iconUrl={imageExportUrl} onClick={() => {saveToJsonFile(presentation)}} iconSize={'medium'}/>
            </div>
        </div>
    )
}

export {
    TopPanel,
}