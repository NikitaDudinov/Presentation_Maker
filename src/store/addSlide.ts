import { PresentationType, SlideType } from "./types";
import { createNewSlide } from "./redux/createNewSlide";

const addSlide = (presentation: PresentationType): PresentationType => {

    const newSlide = createNewSlide(presentation.theme);
    const newSlides: SlideType[] = [];
    if (presentation.selection) {
        for (const slide of presentation.slides) {
            newSlides.push(slide);
            if (slide.id === presentation.selection.selectedSlideId) {
                newSlides.push(newSlide);
            }
        }
    } else {
        newSlides.push(newSlide);
    }
    return {
        ...presentation,
        slides: newSlides,
    };
}


export {
    addSlide,
}