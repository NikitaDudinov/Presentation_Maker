import { PresentationType } from "../types";
import { ActionType } from "./actions";

function setPresentation(newPresentation: PresentationType) {
    return {
        type: ActionType.SET_PRESENTATION,
        payload: newPresentation,
    }
}

function changePresentationTitle(title: string) {
    return {
        type: ActionType.CHANGE_PRESENTATION_TITLE,
        payload: title,
    }
}

export {
    setPresentation,
    changePresentationTitle
}