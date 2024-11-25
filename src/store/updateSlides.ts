import { PresentationType, SlideType } from "./types";

const updateSlides = (
    presentation: PresentationType,
    payload: { newSlides: SlideType[] }
): PresentationType => {
    return {
        ...presentation,
        slides: payload.newSlides,
    };
}

export {
    updateSlides,
}