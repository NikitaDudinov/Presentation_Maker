import {PresentationType, SelectionType} from "./types.ts";

const setSelectSlide = (
    presentation: PresentationType, 
    newSelection: SelectionType
): PresentationType => {

    return {
        ...presentation,
        selection: newSelection
    }
}

export {
    setSelectSlide,
}