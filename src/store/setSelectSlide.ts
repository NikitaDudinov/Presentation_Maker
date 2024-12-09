import {SelectionType} from "./types.ts";

const setSelectSlide = (selectedSlideId: string): SelectionType => (
    {
        selectedSlideId: selectedSlideId,
        elementsId: []
    }
)

export {
    setSelectSlide,
}