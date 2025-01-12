import React, { useState } from 'react';
import styles from './PDFPreview.module.css';
import { PresentationType } from '../../store/types';
import { Button } from '../../components/button/Button';

interface PDFPreviewProps {
    presentation: PresentationType;
    onClose: () => void;
    onGenerate: () => void;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ presentation, onClose, onGenerate }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevSlide = () => {
        setCurrentSlide(prev => Math.max(0, prev - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide(prev => Math.min(presentation.slides.length - 1, prev + 1));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') handlePrevSlide();
        if (e.key === 'ArrowRight') handleNextSlide();
        if (e.key === 'Escape') onClose();
    };

    return (
        <div 
            className={styles.overlay} 
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className={styles.previewContainer}>
                <div className={styles.header}>
                    <h2>Предварительный просмотр PDF</h2>
                    <div className={styles.controls}>
                        <span>{`${currentSlide + 1} / ${presentation.slides.length}`}</span>
                        <button onClick={handlePrevSlide} disabled={currentSlide === 0}>
                            ←
                        </button>
                        <button onClick={handleNextSlide} disabled={currentSlide === presentation.slides.length - 1}>
                            →
                        </button>
                    </div>
                </div>
                
                <div className={styles.slideContainer}>
                    <div className={styles.slide} style={{ background: presentation.slides[currentSlide].background }}>
                        {presentation.slides[currentSlide].elements.map(element => {
                            if (element.type === 'text') {
                                return (
                                    <div
                                        key={element.id}
                                        style={{
                                            position: 'absolute',
                                            top: element.position.y,
                                            left: element.position.x,
                                            fontSize: element.font.size,
                                            fontFamily: element.font.family,
                                            whiteSpace: 'pre-wrap',
                                        }}
                                    >
                                        {element.content}
                                    </div>
                                );
                            }
                            if (element.type === 'image') {
                                return (
                                    <img
                                        key={element.id}
                                        src={element.src}
                                        style={{
                                            position: 'absolute',
                                            top: element.position.y,
                                            left: element.position.x,
                                            width: element.size.width,
                                            height: element.size.height,
                                            objectFit: 'contain',
                                        }}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>

                <div className={styles.footer}>
                    <Button type='text' onClick={onClose} label={'Отмена'}/>
                    <Button type='text' onClick={onGenerate} label={'Сгенерировать PDF'}/>
                </div>
            </div>
        </div>
    );
};