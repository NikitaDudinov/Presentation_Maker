import styles from './SlidesList.module.css'
import { Slide } from "../slide/Slide";
import { useDraggableSlides } from "../../store/hooks/useDraggableSlides";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { useAppActions } from "../../store/hooks/useAppActions";
import { SLIDE_WIDTH } from '../../store/constants';
import { useEffect, useState } from 'react';

type SlideListProps = {
    slidePreviewScale: number;
}

const SlidesList = ({ slidePreviewScale }: SlideListProps) => {
    const { setSelectionSlide, updateSlides, removeSlide } = useAppActions();
    const slides = useAppSelector(state => state.slides);
    const selectSlideId = useAppSelector(state => state.selection.selectedSlideId);
    
    const [selectedSlides, setSelectedSlides] = useState<string[]>(selectSlideId ? [selectSlideId] : []);
    
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
        console.log(selectSlideId)
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Delete' && selectSlideId !== null) {
                removeSlide(selectSlideId)
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectSlideId]);

    useEffect(() => {
        setCurrentSlides(slides);
    }, [slides]);
    
    const {
        setCurrentSlides,
        currentSlides, 
        handleMouseDown, 
        draggedIndex,
        topSlide,
    } = useDraggableSlides(
        slides, 
        updateSlides,
        selectedSlides
    );

    return (
        <div className={styles.slidesList}>
            {currentSlides.map((slide, index) => {
                const isSelected = selectedSlides.includes(slide.id);
                const isDragging = draggedIndex !== null && isSelected;
                const selectedIndex = selectedSlides.indexOf(slide.id);

                return (
                    <div 
                        key={slide.id}
                    >
                        <div 
                            id={`slide-${slide.id}`}
                            className={`${styles.slide} ${isSelected ? styles.selected : ''}`}
                            onClick={(e) => onSlideClick(slide.id, e)}
                            onMouseDown={(e) => handleMouseDown(e, index)}
                            style={{
                                width: `${SLIDE_WIDTH * slidePreviewScale * 0.95}px`,
                                position: isDragging ? 'fixed' : 'relative',
                                top: isDragging ? `${topSlide + (selectedIndex * 8)}px` : '0',
                                left: isDragging ? `${10 + (selectedIndex * 8)}px` : '0',
                                zIndex: isSelected ? 2 + selectedIndex : 1,
                                marginBottom: '8px',
                                cursor: isDragging ? 'grabbing' : 'grab',
                            }}
                        >
                            <Slide
                                isSelected={isSelected}
                                slide={slide}   
                                scale={slidePreviewScale * 0.95}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export { SlidesList };