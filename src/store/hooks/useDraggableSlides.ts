import { useState, useEffect, useCallback } from 'react';
import { SlideType } from '../types';

const useDraggableSlides = (
    initialSlides: SlideType[], 
    onSlidesChange: (newSlides: SlideType[]) => void,
    selectedSlides: string[]
) => {
    const [currentSlides, setCurrentSlides] = useState<SlideType[]>(initialSlides);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [topSlide, setTopSlide] = useState(0);
    const [mouseOffset, setMouseOffset] = useState(0);
    const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        e.stopPropagation();
        e.preventDefault();
    
        const slideId = currentSlides[index].id;
    
        if (!selectedSlides.includes(slideId)) {
            return;
        }
    
        const offset = e.clientY - e.currentTarget.getBoundingClientRect().top;
        
        setMouseOffset(offset);
        setTopSlide(e.clientY - offset);
        
        setDraggedIndex(index);
    };
    

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) {
            setIsDragging(true);
        }
        setTopSlide(e.clientY - mouseOffset);
        updateDropIndicator(e.clientY);
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (draggedIndex === null) return;
    
        if (!isDragging) {
            setDraggedIndex(null);
            setDropIndicatorIndex(null);
            return;
        }
    
        const targetIndex = dropIndicatorIndex !== null ? dropIndicatorIndex : currentSlides.length;
    
        const newSlides = [...currentSlides];
        const selectedIndexes = selectedSlides
            .map(id => newSlides.findIndex(slide => slide.id === id))
            .sort((a, b) => a - b);
    
        const slidesToMove = selectedIndexes.map(index => newSlides[index]);
    
        // Удаляем выбранные слайды из нового массива
        for (let i = selectedIndexes.length - 1; i >= 0; i--) {
            newSlides.splice(selectedIndexes[i], 1);
        }
    
        // Корректируем индекс вставки
        let insertIndex = targetIndex;
        if (targetIndex > draggedIndex) {
            insertIndex -= selectedIndexes.length;
        }
    
        // Вставляем слайды в новое место
        newSlides.splice(insertIndex, 0, ...slidesToMove);
    
        setCurrentSlides(newSlides);
        onSlidesChange(newSlides);
    
        setIsDragging(false);
        setDraggedIndex(null);
        setDropIndicatorIndex(null);
    
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    
    const updateDropIndicator = useCallback((mouseY: number) => {
        const slideElements = Array.from(document.querySelectorAll('[id^="slide-"]'));
        
        let targetIndex = -1;
    
        for (let i = 0; i < slideElements.length; i++) {
            const element = slideElements[i];
            const rect = element.getBoundingClientRect();
    
            // Проверяем, находится ли курсор выше середины элемента
            if (mouseY < rect.top + rect.height / 2) {
                targetIndex = i; // Вставка перед текущим элементом
                break;
            }
            
            // Если курсор ниже последнего элемента, устанавливаем индекс для вставки после последнего элемента
            if (i === slideElements.length - 1 && mouseY > rect.bottom) {
                targetIndex = i + 1; // Вставка после последнего элемента
            }
        }
    
        // Если targetIndex не был установлен, устанавливаем его на длину массива
        setDropIndicatorIndex(targetIndex === -1 ? currentSlides.length : targetIndex);
    }, [currentSlides]);

    useEffect(() => {
        if (draggedIndex !== null) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggedIndex]);

    return {
        setCurrentSlides,
        currentSlides,
        handleMouseDown,
        draggedIndex,
        topSlide,
        dropIndicatorIndex,
    };
};

export { useDraggableSlides };
