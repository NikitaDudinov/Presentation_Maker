import { SelectionActionType } from "../actions";

function setSelectionElement(newSelection: string) {
    return {
        type: SelectionActionType.SET_SELECTION_ELEMENT,
        payload: newSelection,
    }
}

function setSelectionSlide(newSelection: string) {
    return {
        type: SelectionActionType.SET_SELECTION_SLIDE,
        payload: newSelection,
    }
}

function deleteSelectionElement() {
    return {
        type: SelectionActionType.DELETE_SELECTION_ELEMENT,
    }
}

export {
    setSelectionElement,
    setSelectionSlide,
    deleteSelectionElement,
}