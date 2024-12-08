import { PresentationType } from "../types";
import { createNewSlide } from "./createNewSlide";

const slide = createNewSlide()
const defaultPresentation: PresentationType = {
    title: 'Название презентации',
    slides: [
        slide,
    ],
    selection: {
        selectedSlideId: slide.id,
        elementsId: [],
    }
}

export {
    defaultPresentation,
}