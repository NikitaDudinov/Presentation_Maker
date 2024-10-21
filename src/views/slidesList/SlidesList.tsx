import { Selection, SlideType } from "../../store/types"
import { Slide } from "../slide/Slide"
import styles from './SlidesList.module.css'

const SLIDE_PREVIEW_SCALE = 0.2

type SlidesListPros = {
    slides: Array<SlideType>,
    selection: Selection,
}

function SlidesList({slides, selection}: SlidesListPros) {
    function onSlideClick(slideId: string) {
        // dispatch(setSelection, {
        //     selectedSlideId: slideId,
        // })
    }
    return (
        <div className={styles.slidesList}>
            {slides.map(slide =>
                <div key={slide.id} onClick={() => onSlideClick(slide.id)}>
                    <Slide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        isSelected={slide.id == selection.selectedSlideId}
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