import React, { useState } from 'react';
import styles from './PDFPreview.module.css';
import { PresentationType } from '../../store/types';
import { Button } from '../../components/button/Button';
import { Slide } from '../slide/Slide';

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
                    <Slide 
                        slide={presentation.slides[currentSlide]}
                        scale={1.3}
                    />
                </div>


                <div className={styles.footer}>
                    <div className={styles.redButton}>
                        <Button type='text' onClick={onClose} label={'Отмена'}/>
                    </div>
                    <div className={styles.greenButton}>
                        <Button type='text' onClick={onGenerate} label={'Сгенерировать PDF'}/>
                    </div>
                </div>
            </div>
        </div>
    );
};