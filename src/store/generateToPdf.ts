import jsPDF from "jspdf";
import { FigureElementType, PresentationType } from "./types";
import { CSSProperties } from "react";
import html2canvas from 'html2canvas';

const generatePDF = async (presentation: PresentationType) => {
    console.log('Начал конвертацию');

    const pdfWidth = 842;
    const pdfHeight = 595;
    
    const margin = 20;
    const contentWidth = pdfWidth - (margin * 2);
    const contentHeight = pdfHeight - (margin * 2);
    
    const scaleX = contentWidth / 935;
    const scaleY = contentHeight / 525;
    const scale = Math.min(scaleX, scaleY);

    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
    });

    for (const slide of presentation.slides) {
        console.log(slide.background)
        const slideElement = `
            <div style="
                width: ${935 * scale}px;
                height: ${525 * scale}px;
                background: ${slide.background.startsWith('http') || slide.background.startsWith('data:') || slide.background.startsWith('/src')
                    ? `url(${slide.background})`
                    : slide.background};
                position: relative;
                overflow: hidden;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            ">
                ${slide.elements.map(element => {
                    if (element.type === 'text') {
                        if (element.type === 'text') {
                            const textStyles: CSSProperties = {
                                fontFamily: `${element.fontFamily}, sans-serif`,
                                fontSize: `${element.fontSize * scale}px`,
                                fontWeight: element.weight,
                                fontStyle: element.style,
                                textDecoration: element.decoration,
                                textTransform: element.transform,
                                color: element.color,
                                width: element.size.width,
                                height: element.size.height
                            };
            
                            const textStyleString = Object.entries(textStyles)
                                .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`) // Преобразуем camelCase в kebab-case
                                .join(' ');
            
                            return `<div style="
                                position: absolute;
                                top: ${element.position.y * scale}px;
                                left: ${element.position.x * scale}px;
                                ${textStyleString}
                                white-space: pre-wrap;
                                line-height: 1.2;
                            ">${element.content}</div>`;
                        }
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
                    if (element.type === 'figure') {
                        return `
                            <div style="
                                position: absolute; 
                                top: ${element.position.y * scale}px; 
                                left: ${element.position.x * scale}px; 
                                width: ${element.size.width * scale}px; 
                                height: ${element.size.height * scale}; 
                                user-select:none; 
                                pointer-events:none;">
                                <svg width="100%" height="100%">
                                    <!-- Рендерим фигуру на основе figureObject -->
                                    ${renderFigureToSVG(element)}
                                </svg>
                            </div>`;
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

const renderFigureToSVG = (figureObject: FigureElementType) => {
    switch (figureObject.figureType) {
        case 'rectangle':
            return `<rect width="100%" height="100%" fill="none" stroke="${figureObject.fill}" stroke-width="8"/>`;
        case 'circle':
            return `<ellipse cx="50%" cy="50%" rx="45%" ry="45%" fill="none" stroke="${figureObject.fill}" stroke-width="4"/>`;
        case 'triangle':
            return `<polygon points="50,0 100,100 0,100"  fill="none" stroke="${figureObject.fill}" stroke-width="3"/>`;
        case 'line':
            return `<line x1="5%" y1="50%" x2="95%" y2="50%" fill="none" stroke="${figureObject.fill}" stroke-width="4"/>`;
        default:
            return '';
    }
};

export {
    generatePDF
}