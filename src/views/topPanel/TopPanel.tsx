import { Button } from '../../components/button/Button'
import styles from './TopPanel.module.css'
import imageBackUrl from '../../assets/back.png'
import imageAheadUrl from '../../assets/ahead.png'
import imagePlayUrl from '../../assets/play.svg'
import imageExportUrl from '../../assets/Export.svg'
import imageImportUrl from '../../assets/download.svg'
import PdfIcon from '../../assets/pdf.png'
import { saveToJsonFile } from '../../store/files/saveToJsonFile'
import { getFromFile } from '../../store/files/getFromFile'
import { useRef, useEffect, useState} from 'react'
import { useAppSelector } from '../../store/hooks/useAppSelector'
import { useAppActions } from '../../store/hooks/useAppActions'
import { useContext } from 'react'
import { HistoryContext } from '../../store/hooks/historyContext'
import { useNavigate } from 'react-router'
import { PDFPreview } from '../pdfPreview/PDFPreview'
import { generatePDF } from '../../store/generateToPdf'

const TopPanel = () => {
    const navigate = useNavigate()
    const {changePresentationTitle, setPresentation} = useAppActions();
    const presentation = useAppSelector((state => state))
    const [showPdfPreview, setShowPdfPreview] = useState(false);

    const history = useContext(HistoryContext)

    useEffect(() => {
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
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

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

    const handlePdfPreview = () => {
        setShowPdfPreview(true);
    };

    return (
        <>
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
                    <Button type={'icon'} iconUrl={imagePlayUrl} onClick={() => {navigate('slideshow')}} iconSize={'medium'}/>
                    <div>
                        <Button type={'icon'} iconUrl={imageImportUrl} onClick={handleButtonClick} iconSize={'medium'}/>
                        <input
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            type="file"
                            accept=".json,application/json"
                        />
                    </div>
                    <Button type={'icon'} iconUrl={imageExportUrl} onClick={() => {saveToJsonFile(presentation)}} iconSize={'medium'}/>
                    <Button type={'icon'} iconUrl={PdfIcon} onClick={handlePdfPreview} iconSize={'medium'}/>
                </div>
            </div>
            {showPdfPreview && (
                <PDFPreview 
                    presentation={presentation}
                    onClose={() => setShowPdfPreview(false)}
                    onGenerate={() => {
                        generatePDF(presentation);
                        setShowPdfPreview(false);
                    }}
                />
            )}
        </>
    )
}

export {
    TopPanel,
}