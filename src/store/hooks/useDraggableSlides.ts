import { useState, useEffect } from 'react';
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
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (draggedIndex === null) return;

        const slideElements: HTMLElement[] = currentSlides.map(element => {
            if(!selectedSlides.includes(element.id)){
                const el = document.getElementById(`slide-${element.id}`);
                if (!el) {
                    console.warn(`Element with ID slide-${element.id} not found.`);
                }
                return el as HTMLElement; 
            }
            return null
        }).filter((el): el is HTMLElement => el !== null);

        let targetIndex = -1;
        const mouseY = e.clientY;

        for (let i = 0; i < slideElements.length; i++) {
            const rect = slideElements[i].getBoundingClientRect();
            if (mouseY > rect.top && mouseY <= rect.top + rect.height / 2) {
                targetIndex = i;
                break;
            }

            if (mouseY > rect.top + rect.height / 2 && mouseY <= rect.top + rect.height) {
                targetIndex = i + 1;
            }
        }

        if (targetIndex !== -1) {
            const newSlides = [...currentSlides.filter(slide => !selectedSlides.includes(slide.id))];
            newSlides.splice(targetIndex, 0, ...currentSlides.filter(slide => selectedSlides.includes(slide.id)));

            setCurrentSlides(newSlides);
            onSlidesChange(newSlides);
        }

        setIsDragging(false);
        setDraggedIndex(null);
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
    }, [draggedIndex]);

    return {
        setCurrentSlides,
        currentSlides,
        handleMouseDown,
        draggedIndex,
        topSlide,
    };
};

export { useDraggableSlides };