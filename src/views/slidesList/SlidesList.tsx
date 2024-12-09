import styles from './SlidesList.module.css'
import { Slide } from "../slide/Slide"
import { useDraggableSlides } from "../../store/hooks/useDraggableSlides"
import { useAppSelector } from "../../store/hooks/useAppSelector"
import { useAppActions } from "../../store/hooks/useAppActions"
const SLIDE_PREVIEW_SCALE = 0.3

const SlidesList = () => {
    const {setSelectionSlide, updateSlides} = useAppActions();
    const presentation = useAppSelector(state => state)

    const { currentSlides, handleMouseDown, draggedIndex, topSlide, heightSlide } = useDraggableSlides(presentation.slides, (newSlides) => {
        updateSlides(newSlides);
    }); 

    const onSlideClick = (slideId: string) => {
        setSelectionSlide(slideId)
    };

    return (
        <div className={styles.slidesList}>
            {currentSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    style={{
                        height: draggedIndex === index ? `${heightSlide}px` : 'unset'
                    }}
                >
                    <div
                        onClick={() => onSlideClick(slide.id)}
                        id={`slide-${index}`}
                        onMouseDown={(e) => handleMouseDown(e, index)}
                        style={{
                            position: draggedIndex === index ? 'absolute' : 'relative',
                            zIndex: index === draggedIndex ? 1 : 0,
                            cursor: index === draggedIndex ? 'grabbing' : 'grab',
                            opacity: index === draggedIndex ? 0.5 : 1,
                            top: index === draggedIndex ? `${topSlide}px` : 'unset',
                            boxSizing: 'border-box',
                            padding: '10px'
                        }}
                    >
                        <Slide
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                            select={presentation.selection.selectedSlideId === slide.id}
                            className={styles.slide}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export {
    SlidesList,
}