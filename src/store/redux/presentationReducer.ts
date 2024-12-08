import { addSlide } from "../addSlide";
import { ActionType, PresentationAction } from "./actions";
import { defaultPresentation } from "./defaultPresentation";
import { removeSlide } from "../removeSlide";
import { PresentationType } from "../types";
import { changePresentationTitle } from "./changePresentationTitle";

function presentationReducer(presentation: PresentationType = defaultPresentation, action: PresentationAction): PresentationType {
    switch (action.type) {
        case ActionType.ADD_SLIDE: 
            return addSlide(presentation)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(presentation)
        case ActionType.SET_PRESENTATION:
            return action.payload
        case ActionType.CHANGE_PRESENTATION_TITLE:
            return changePresentationTitle(presentation, action.payload)    
        default:
            return presentation
    }
}

export {
    presentationReducer,
}