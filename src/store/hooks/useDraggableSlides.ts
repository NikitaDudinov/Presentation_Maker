import { useState, useEffect } from 'react';
import { SlideType } from '../types';

const useDraggableSlides = (initialSlides: SlideType[], onSlidesChange: (newSlides: SlideType[]) => void) => {
    const [currentSlides, setCurrentSlides] = useState<SlideType[]>(initialSlides);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [topSlide, setTopSlide] = useState(0);
    const [heightSlide, setHeightSlide] = useState(0);

    useEffect(() => {
        setCurrentSlides(initialSlides);
    }, [initialSlides]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggedIndex(index);
        const slideElement = e.currentTarget;
        setHeightSlide(slideElement.getBoundingClientRect().height);
        setTopSlide(slideElement.getBoundingClientRect().top + window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (draggedIndex !== null) {
            const newPosition = e.clientY;
            setTopSlide(newPosition - heightSlide / 2);
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (draggedIndex !== null) {
            const newPosition = e.clientY;
            const hoverIndex = currentSlides.findIndex((_, index) => {
                if (index === draggedIndex) return false;
                const slideElement = document.getElementById(`slide-${index}`);
                if (slideElement) {
                    const { top, bottom } = slideElement.getBoundingClientRect();
                    return newPosition >= top && newPosition <= bottom;
                }
                return false;
            });

            if (hoverIndex !== -1 && hoverIndex !== draggedIndex) {
                const newSlides = [...currentSlides];
                const draggedItem = newSlides[draggedIndex];
                newSlides.splice(draggedIndex, 1);
                newSlides.splice(hoverIndex, 0, draggedItem);
                setCurrentSlides(newSlides);
                onSlidesChange(newSlides);
            }
        }
        setDraggedIndex(null);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggedIndex]);

    return { currentSlides, handleMouseDown, draggedIndex, topSlide, heightSlide };
};

export {
    useDraggableSlides,
}