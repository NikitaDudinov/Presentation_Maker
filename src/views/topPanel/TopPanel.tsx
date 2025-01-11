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
import { PresentationType } from '../../store/types'
import { SLIDE_HEIGHT } from '../../store/constants'

const TopPanel = () => {
    const navigate = useNavigate()
    const {changePresentationTitle, setPresentation} = useAppActions();
    const presentation = useAppSelector((presentation => presentation))
    const [viewPdfFile, setViewPdfFile] = useState(false);
    const slidesRef = useRef<HTMLDivElement>(null)

    const generatePDF = async (presentation: PresentationType) => {
        console.log('Начал конвертацию');
    
        const slideHeightPx = 525; // Высота слайда
        const slideWidthPx = 935; // Ширина слайда
    
        // Размеры A4 в пикселях (при 72 dpi)
        const a4WidthPx = 842; // Ширина A4 в пикселях
        const a4HeightPx = 595; // Высота A4 в пикселях
    
        // Рассчитываем масштаб
        const scaleX = a4WidthPx / slideWidthPx;
        const scaleY = a4HeightPx / slideHeightPx;
        const scale = 0.7
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: 'a4',
        });
    
        for (const slide of presentation.slides) {
            const slideElement = `
                <div style="width: ${slideWidthPx * scale}px; height: ${slideHeightPx * scale}px; background-color: ${slide.background}; position: relative;">
                    ${slide.elements.map(element => {
                        if (element.type === 'text') {
                            return `<div style="position: absolute; top: ${element.position.y * scale}px; left: ${element.position.x * scale}px; font-size: ${element.font.size * scale}px; font-family: ${element.font.family}; color: black;">${element.content}</div>`;
                        }
                        if (element.type === 'image') {
                            return `<img src="${element.src}" style="position: absolute; top: ${element.position.y * scale}px; left: ${element.position.x * scale}px; width: ${element.size.width * scale}px; height: ${element.size.height * scale}px;" />`;
                        }
                        return '';
                    }).join('')}
                </div>
            `;
    
            const tempElement = document.createElement('div');
            tempElement.style.display = 'block'; // Временно показываем элемент для отладки
            tempElement.innerHTML = slideElement;
            document.body.appendChild(tempElement);
    
            try {
                // Задержка для отрисовки
                await new Promise(resolve => setTimeout(resolve, 100));
    
                // Используем увеличенный масштаб для повышения качества
                const canvas = await html2canvas(tempElement, { scale: 2, useCORS: true, backgroundColor: '#fff' });
                const imgData = canvas.toDataURL("image/png"); // Используем PNG
    
                // Добавляем изображение в PDF с учетом масштаба
                doc.addImage(imgData, 'PNG', 0, 0, slideWidthPx * scale, slideHeightPx * scale);
                if (slide !== presentation.slides[presentation.slides.length - 1]) {
                    doc.addPage(); // Добавляем новую страницу для следующего слайда
                }
            } catch (error) {
                console.error('Ошибка при генерации PDF:', error);
            } finally {
                document.body.removeChild(tempElement); // Удаляем временный элемент после обработки
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
                <Button type={'icon'} iconUrl={imagePlayUrl} onClick={() => generatePDF(presentation)} iconSize={'medium'}/>
            </div>
        </div>
    )
}

export {
    TopPanel,
}