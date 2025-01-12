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
import { useNavigate } from 'react-router'
import { PresentationType } from '../../store/types'
import { SLIDE_HEIGHT } from '../../store/constants'
import { PDFPreview } from '../pdfPreview/PDFPreview'

const TopPanel = () => {
    const navigate = useNavigate()
    const {changePresentationTitle, setPresentation} = useAppActions();
    const presentation = useAppSelector((presentation => presentation))
    const [viewPdfFile, setViewPdfFile] = useState(false);
    const slidesRef = useRef<HTMLDivElement>(null)
    const [showPdfPreview, setShowPdfPreview] = useState(false);

    const generatePDF = async (presentation: PresentationType) => {
        console.log('Начал конвертацию');

        // Используем фиксированные размеры для A4 в ландшафтной ориентации (в пунктах)
        const pdfWidth = 842;
        const pdfHeight = 595;
        
        // Отступы для центрирования содержимого
        const margin = 20;
        const contentWidth = pdfWidth - (margin * 2);
        const contentHeight = pdfHeight - (margin * 2);
        
        // Рассчитываем масштаб, сохраняя пропорции
        const scaleX = contentWidth / 935;
        const scaleY = contentHeight / 525;
        const scale = Math.min(scaleX, scaleY);

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt', // используем пункты вместо пикселей
            format: 'a4',
        });

        for (const slide of presentation.slides) {
            const slideElement = `
                <div style="
                    width: ${935 * scale}px;
                    height: ${525 * scale}px;
                    background-color: ${slide.background};
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                ">
                    ${slide.elements.map(element => {
                        if (element.type === 'text') {
                            return `<div style="
                                position: absolute;
                                top: ${element.position.y * scale}px;
                                left: ${element.position.x * scale}px;
                                font-size: ${element.font.size * scale}px;
                                font-family: ${element.font.family};
                                white-space: pre-wrap;
                                line-height: 1.2;
                            ">${element.content}</div>`;
                        }
                        if (element.type === 'image') {
                            return `<img 
                                src="${element.src}"
                                style="
                                    position: absolute;
                                    top: ${element.position.y * scale}px;
                                    left: ${element.position.x * scale}px;
                                    width: ${element.size.width * scale}px;
                                    height: ${element.size.height * scale}px;
                                    object-fit: contain;
                                "
                            />`;
                        }
                        return '';
                    }).join('')}
                </div>
            `;

            const tempElement = document.createElement('div');
            tempElement.style.cssText = `
                position: fixed;
                left: 0;
                top: 0;
                z-index: -9999;
                background: white;
                padding: ${margin}px;
            `;
            tempElement.innerHTML = slideElement;
            document.body.appendChild(tempElement);

            try {
                await new Promise(resolve => setTimeout(resolve, 200)); // Увеличиваем задержку

                const canvas = await html2canvas(tempElement, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#fff',
                    logging: false,
                    windowWidth: 935 * scale,
                    windowHeight: 525 * scale
                });

                const imgData = canvas.toDataURL('image/png', 1.0);
                
                // Центрируем слайд на странице
                const xOffset = (pdfWidth - (935 * scale)) / 2;
                const yOffset = (pdfHeight - (525 * scale)) / 2;
                
                doc.addImage(imgData, 'PNG', xOffset, yOffset, 935 * scale, 525 * scale);

                if (slide !== presentation.slides[presentation.slides.length - 1]) {
                    doc.addPage();
                }
            } catch (error) {
                console.error('Ошибка при генерации PDF:', error);
            } finally {
                document.body.removeChild(tempElement);
            }
        }

        doc.save(`${presentation.title}.pdf`);
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
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }} 
                        />
                    </div>
                    <Button type={'icon'} iconUrl={imageExportUrl} onClick={() => {saveToJsonFile(presentation)}} iconSize={'medium'}/>
                    <Button type={'icon'} iconUrl={imagePlayUrl} onClick={handlePdfPreview} iconSize={'medium'}/>
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