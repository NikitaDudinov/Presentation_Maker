import {PresentationType} from "./types.ts";

const setSelectSlide = (
    presentation: PresentationType, 
    payload: {selectedSlideId: string}
): PresentationType => {

    return {
        ...presentation,
        selection: {
            selectedSlideId: payload.selectedSlideId,
            elementsId: []
        }
    }
}

export {
    setSelectSlide,
}