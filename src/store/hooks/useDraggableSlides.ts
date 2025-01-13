import { useState, useEffect, useCallback } from 'react';
import { SlideType } from '../types';

const useDraggableSlides = (
    initialSlides: SlideType[], 
    onSlidesChange: (newSlides: SlideType[]) => void,
    setSelectionSlide: (slideId: string) => void,
    selectSlideId: string | null
) => {
    const [currentSlides, setCurrentSlides] = useState<SlideType[]>(initialSlides);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [topSlide, setTopSlide] = useState(0);
    const [mouseOffset, setMouseOffset] = useState(0);
    const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedSlides, setSelectedSlides] = useState<string[]>(selectSlideId ? [selectSlideId] : []);


    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, index: number, slideId: string) => {
        e.stopPropagation();
        e.preventDefault();
        onSlideClick(slideId, e);
        
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
    }

    const handleMouseUp = (e: MouseEvent) => {
        if (draggedIndex === null) return;

        if (!isDragging) {
            setDraggedIndex(null);
            setDropIndicatorIndex(null);
            return;
        }

        const targetIndex = dropIndicatorIndex ?? currentSlides.length;

        const newSlides = [...currentSlides];
        const selectedIndexes = selectedSlides
            .map(id => newSlides.findIndex(slide => slide.id === id))
            .sort((a, b) => a - b);

        const slidesToMove = selectedIndexes.map(index => newSlides[index]);

        for (let i = selectedIndexes.length - 1; i >= 0; i--) {
            newSlides.splice(selectedIndexes[i], 1);
        }

        let insertIndex = targetIndex;
        if (targetIndex > draggedIndex) {
            insertIndex -= selectedIndexes.length;
        }
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

        const firstElement = slideElements[0];
        if (firstElement) {
            const firstRect = firstElement.getBoundingClientRect();
            if (mouseY < firstRect.top + firstRect.height * 0.3) {
                setDropIndicatorIndex(0);
                return;
            }
        }

        for (let i = 0; i < slideElements.length; i++) {
            const element = slideElements[i];
            const elementId = currentSlides[i].id;

            if (selectedSlides.includes(elementId)) continue;

            const rect = element.getBoundingClientRect();
            const nextElement = slideElements[i + 1];

            if (nextElement) {
                const nextRect = nextElement.getBoundingClientRect();
                const gapCenter = rect.bottom + (nextRect.top - rect.bottom) / 2;

                if (mouseY < gapCenter) {
                    targetIndex = i + 1;
                    break;
                }
            } else {
                targetIndex = mouseY > rect.bottom - rect.height * 0.3 ? i + 1 : i;
            }
        }

        setDropIndicatorIndex(targetIndex === -1 ? currentSlides.length : targetIndex);
    }, [currentSlides, selectedSlides]);

    const onSlideClick = (slideId: string, event: React.MouseEvent) => {
        if (event.ctrlKey) {
            setSelectedSlides(prev => 
                prev.includes(slideId) 
                    ? prev.filter(id => id !== slideId) 
                    : [...prev, slideId]
            );
        } else {
            setSelectedSlides([slideId]);
            setSelectionSlide(slideId);
        }
    };

    useEffect(() => {
        if (draggedIndex !== null) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggedIndex, handleMouseMove]);


    
    return {
        setCurrentSlides,
        currentSlides,
        handleMouseDown,
        draggedIndex,
        topSlide,
        dropIndicatorIndex,
        selectedSlides,
    };
};

export { useDraggableSlides };
