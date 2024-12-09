import { PresentationType } from "../../../types";
import { PresentationActionType } from "../actions";

function setPresentation(newPresentation: PresentationType) {
    return {
        type: PresentationActionType.SET_PRESENTATION,
        payload: newPresentation,
    }
}

export {
    setPresentation,
}