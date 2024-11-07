import {SlideType } from "../../store/types"
import { Slide } from "../slide/Slide"
import styles from './SlidesList.module.css'
import { dispatch } from "../../store/presentation"
import { setSelectSlide } from "../../store/setSelectSlide"
const SLIDE_PREVIEW_SCALE = 0.2

type SlidesListPros = {
    slides: SlideType[],
    selectSlideId: string | null,
}

function SlidesList({slides, selectSlideId}: SlidesListPros) {
    function onSlideClick(slideId: string) {
        dispatch(setSelectSlide, {
            selectedSlideId: slideId,
        })
    }
    return (
        <div className={styles.slidesList}>
            {slides.map(slide =>
                <div key={slide.id} onClick={() => onSlideClick(slide.id)}>
                    <Slide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        select={selectSlideId === slide.id}
                        className={styles.slide}
                    />
                </div>
            )}
        </div>
    )
}

export {
    SlidesList,
}