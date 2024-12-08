import { PresentationType, SlideType } from "./types";
import { createNewSlide } from "./redux/createNewSlide";

function addSlide(presentation: PresentationType): PresentationType {
    const selection = presentation.selection
    const newSlide = createNewSlide()
    const slides: SlideType[] = []
    if (selection) {
        for (const slide of presentation.slides) {
            slides.push(slide)
            if (slide.id === selection.selectedSlideId) {
                slides.push(newSlide)
            }
        }
    }
    else {
        slides.push(newSlide)
    }
    return {
        ...presentation,
        slides: slides,
        selection: {
            ...selection,
            selectedSlideId: newSlide.id,
        }
    }
}

export {
    addSlide,
}