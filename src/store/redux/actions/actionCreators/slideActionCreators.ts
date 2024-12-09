import { PositionType, SelectionType, SizeType, SlideType} from "../../../types"
import { SlidesActionType } from "../actions"

function addSlide(selection: SelectionType) {
    return {
        type: SlidesActionType.ADD_SLIDE,
        payload: {selection}
    }
}

function removeSlide(slideId: string) {
    return {
        type: SlidesActionType.REMOVE_SLIDE,
        payload: slideId,
    }
}

function updateSlides(newSlides: SlideType[]){
    return {
        type: SlidesActionType.UPDATE_SLIDES,
        payload: {newSlides},
    }
}

function updatePositionElement(selectedElementId: string, selectedSlideId: string, newPosition: PositionType){
    return {
        type: SlidesActionType.UPDATE_POSITION_ELEMENT,
        payload: {selectedElementId, selectedSlideId, newPosition},
    }
}

function updateSizeElement(selectedElementId: string, selectedSlideId: string, newSize: SizeType){
    return {
        type: SlidesActionType.UPDATE_SIZE_ELEMENT,
        payload: {selectedElementId, selectedSlideId, newSize},
    }
}

function updateBackgroundSlide(selectedSlideId: string, newBackground: string, isAllSlides: boolean){
    return {
        type: SlidesActionType.UPDATE_BACKGROUND_SLIDE,
        payload: {selectedSlideId, newBackground, isAllSlides},
    }
}

function addTextElement(selectedSlideId: string){
    return {
        type: SlidesActionType.ADD_TEXT_ELEMENT,
        payload: {selectedSlideId},
    }
}

function addImageElement(selectedSlideId: string, value?: string){
    return {
        type: SlidesActionType.ADD_IMAGE_ELEMENT,
        payload: {selectedSlideId, value},
    }
}

function deleteElement(selectedElementId: string, selectedSlideId: string | null){
    return {
        type: SlidesActionType.DELETE_ELEMENT,
        payload: {selectedElementId, selectedSlideId}
    }
}

export {
    addSlide,
    removeSlide,
    updateSlides,
    updatePositionElement,
    updateSizeElement,
    updateBackgroundSlide,
    addTextElement,
    addImageElement,
    deleteElement
}