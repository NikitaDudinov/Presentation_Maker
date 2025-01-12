import styles from './SlidesList.module.css';
import { Slide } from "../slide/Slide";
import { useDraggableSlides } from "../../store/hooks/useDraggableSlides";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { useAppActions } from "../../store/hooks/useAppActions";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../../store/constants';

type SlideListProps = {
    slidePreviewScale: number;
}

const SlidesList = ({slidePreviewScale}: SlideListProps) => {
    const {setSelectionSlide, updateSlides} = useAppActions();
    const slides = useAppSelector(state => state.slides);
    const selectSlideId = useAppSelector(state => state.selection.selectedSlideId);

    const { 
        currentSlides, 
        handleMouseDown, 
        draggedIndex,
        topSlide,
        dropIndicatorIndex,
        selectedSlides,
    } = useDraggableSlides(
        slides, 
        (newSlides) => {
            updateSlides(newSlides);
        },
        setSelectionSlide,
        selectSlideId,
    );

    return (
        <div className={styles.slidesList}>
            {dropIndicatorIndex === 0 && draggedIndex !== null && (
                <div className={styles.dropIndicator} />
            )}
            
            {currentSlides.map((slide, index) => {
                const isSelected = selectedSlides.includes(slide.id);
                const isDragging = draggedIndex !== null && isSelected;
                const selectedIndex = selectedSlides.indexOf(slide.id);
                
                return (
                    <div 
                        key={slide.id}
                        style={{
                            paddingTop: isDragging ? `7px` : '0',
                            height: isDragging ? `${SLIDE_HEIGHT * slidePreviewScale}px` : 'unset',
                            paddingBottom: isDragging ? `7px` : '0',
                        }}
                        >
                        <div 
                            id={`slide-${index}`}
                            className={`${styles.slide} ${isSelected ? styles.selected : ''}`}
                            onMouseDown={(e) => handleMouseDown(e, index, slide.id)}
                            style={{
                                width: `${SLIDE_WIDTH * slidePreviewScale}px`,
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
                                scale={slidePreviewScale}
                            />
                        </div>
                        {dropIndicatorIndex === index + 1 && draggedIndex !== null && !isSelected && (
                            <div className={styles.dropIndicator} />
                        )}
                    </div>
                );
            })}
            
            {dropIndicatorIndex === currentSlides.length && draggedIndex !== null && (
                <div className={styles.dropIndicator} />
            )}
        </div>
    );
};

export { SlidesList };
