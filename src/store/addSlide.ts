import { SelectionType, SlideType } from "./types";
import { createNewSlide } from "./redux/createNewSlide";

const addSlide = (slides: SlideType[], selection: SelectionType): SlideType[] => {
    const newSlide = createNewSlide();
    const newSlides: SlideType[] = [];
    if (selection) {
        for (const slide of slides) {
            newSlides.push(slide);
            if (slide.id === selection.selectedSlideId) {
                newSlides.push(newSlide);
            }
        }
    } else {
        newSlides.push(newSlide);
    }
    console.log(newSlides)
    return newSlides;
}


export {
    addSlide,
}