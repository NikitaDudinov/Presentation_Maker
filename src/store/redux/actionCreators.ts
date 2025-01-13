import { PresentationActionType} from "./actions"
import { SlideType, PositionType, SizeType, PresentationType } from "../types"

function addSlide() {
    return {
        type: PresentationActionType.ADD_SLIDE,
    }
}

function removeSlide(slideId: string) {
    return {
        type: PresentationActionType.REMOVE_SLIDE,
        payload: slideId,
    }
}

function updateSlides(newSlides: SlideType[]){
    return {
        type: PresentationActionType.UPDATE_SLIDES,
        payload: newSlides,
    }
}

function updatePositionElement(newPosition: PositionType){
    return {
        type: PresentationActionType.UPDATE_POSITION_ELEMENT,
        payload: newPosition,
    }
}

function updateSizeElement(newSize: SizeType){
    return {
        type: PresentationActionType.UPDATE_SIZE_ELEMENT,
        payload: newSize,
    }
}

function updateBackgroundSlide(newBackground: string, isAllSlides: boolean){
    return {
        type: PresentationActionType.UPDATE_BACKGROUND_SLIDE,
        payload: {newBackground, isAllSlides},
    }
}

function addTextElement(newText: string){
    return {
        type: PresentationActionType.ADD_TEXT_ELEMENT,
        payload: newText,
    }
}

function addImageElement(value?: string){
    return {
        type: PresentationActionType.ADD_IMAGE_ELEMENT,
        payload: value,
    }
}

function deleteElement(){
    return {
        type: PresentationActionType.DELETE_ELEMENT,
    }
}

function changePresentationTitle(title: string) {
    return {
        type: PresentationActionType.CHANGE_PRESENTATION_TITLE,
        payload: title,
    }
}

function setSelectionElement(newSelection: string) {
    return {
        type: PresentationActionType.SET_SELECTION_ELEMENT,
        payload: newSelection,
    }
}

function setSelectionSlide(newSelection: string) {
    return {
        type: PresentationActionType.SET_SELECTION_SLIDE,
        payload: newSelection,
    }
}

function deleteSelectionElement() {
    return {
        type: PresentationActionType.DELETE_SELECTION_ELEMENT,
    }
}

function setPresentation(newPresentation: PresentationType) {
    return {
        type: PresentationActionType.SET_PRESENTATION,
        payload: newPresentation,
    }
}

function updateContentText(newContent: string){
    return {
        type: PresentationActionType.UPDATE_CONTENT_TEXT,
        payload: newContent,
    }
}

export default {
    addSlide,
    removeSlide,
    updateSlides,
    updatePositionElement,
    updateSizeElement,
    updateBackgroundSlide,
    addTextElement,
    addImageElement,
    deleteElement,
    changePresentationTitle,
    setSelectionElement,
    setSelectionSlide,
    deleteSelectionElement,
    setPresentation,
    updateContentText,
}