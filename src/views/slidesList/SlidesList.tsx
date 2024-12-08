import {SlideType } from "../../store/types"
import { Slide } from "../slide/Slide"
import styles from './SlidesList.module.css'
import { setSelectSlide } from "../../store/setSelectSlide"
import { useDraggableSlides } from "../../store/hooks/useDraggableSlides"
import { updateSlides } from "../../store/updateSlides"
import { useAppSelector } from "../../store/hooks/useAppSelector"
const SLIDE_PREVIEW_SCALE = 0.3

const SlidesList = () => {

    const slides = useAppSelector(state => state.slides)
    const selectSlideId = useAppSelector(state => state.selection.selectedSlideId)

    const { currentSlides, handleMouseDown, draggedIndex, topSlide, heightSlide } = useDraggableSlides(slides, (newSlides) => {
        // dispatch(updateSlides, {newSlides: newSlides})
    });

    const onSlideClick = (slideId: string) => {
        // dispatch(setSelectSlide, { selectedSlideId: slideId });
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
                            select={selectSlideId === slide.id}
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