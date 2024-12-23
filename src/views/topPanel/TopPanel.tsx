import { Button } from '../../components/button/Button'
import styles from './TopPanel.module.css'
import imageBackUrl from '../../assets/back.png'
import imageAheadUrl from '../../assets/ahead.png'
import imagePlayUrl from '../../assets/play.svg'
import imageExportUrl from '../../assets/Export.svg'
import imageImportUrl from '../../assets/download.svg'
import { saveToJsonFile } from '../../store/files/saveToJsonFile'
import { getFromFile } from '../../store/files/getFromFile'
import { useRef, useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks/useAppSelector'
import { useAppActions } from '../../store/hooks/useAppActions'
import { useContext } from 'react'
import { HistoryContext } from '../../store/hooks/historyContext'
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Slide } from '../slide/Slide'
import { useNavigate } from 'react-router'

const TopPanel = () => {
    const navigate = useNavigate()
    const {changePresentationTitle, setPresentation} = useAppActions();
    const presentation = useAppSelector((presentation => presentation))
    const [viewPdfFile, setViewPdfFile] = useState(false);
    const slidesRef = useRef<HTMLDivElement>(null)

    const generatePDF = async () => {
        if (slidesRef.current) {
            const elementWidth = slidesRef.current.offsetWidth;
            const elementHeight = slidesRef.current.offsetHeight; 
            const canvas = await html2canvas(slidesRef.current, {
                scale: 2,
                useCORS: true,
            });
            const imgData = canvas.toDataURL("image/png");
            const pdfWidth = elementWidth * 0.264583;
            const pdfHeight = elementHeight * 0.264583;
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [pdfWidth, pdfHeight],
            });
            doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            doc.save(`${presentation.title}.pdf`);
        }
    };

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
                <Button type={'icon'} iconUrl={imagePlayUrl} onClick={() => {navigate('slideshow')}} iconSize={'medium'}/>
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
                <Button type={'icon'} iconUrl={imagePlayUrl} onClick={() => {setViewPdfFile(true)}} iconSize={'medium'}/>
                {viewPdfFile && 
                    <div className={styles.previewPdfContainer}>
                        <Button type={'text'} label={'Закрыть'} onClick={() => setViewPdfFile(false)}/>
                        <div ref={slidesRef} className={styles.listSlides}>
                            {presentation.slides.map(slide => 
                                <Slide key={slide.id} slide={slide}/>
                            )}
                        </div>
                         <Button 
                            type={'text'} 
                            label={'Скачать в PDF'}     
                            onClick={() => {
                                generatePDF();
                                setTimeout(() => {
                                    setViewPdfFile(false);
                                }, 2000);
                            }} />
                    </div>
                }
            </div>
        </div>
    )
}

export {
    TopPanel,
}