import { getFromLocalStorage } from "../localStorage/getFromLocalStorage";
import { PresentationType } from "../types";
import { createNewSlide } from "./createNewSlide";

const slide = createNewSlide()
const defaultPresentation: PresentationType =  getFromLocalStorage() ||  {
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