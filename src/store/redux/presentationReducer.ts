import { addSlide } from "../addSlide";
import { PresentationType } from "../types";
import { PresentationActionType, PresentationAction } from "./actions";
import { defaultPresentation } from "./defaultPresentation";
import { updatePositionElement } from "../updatePositionElement";
import { updateSizeElement } from "../updateSizeElement";
import { updateBackgroundSlide } from "../updateBackgroundSlide";
import { addTextElement } from "../addTextElement";
import { addImageElement } from "../addImageElement";
import { deleteElement } from "../deleteElement";
import { updateContentText } from "./updateContentText";
import { updateTextStyle } from "../updateTextStyle";
import { addFigureElement } from "../addFigureElement";
import { updateFillElement } from "../updateFillElement";
import { removeSlide } from "../removeSlide";

const presentationReducer = (state: PresentationType = defaultPresentation, action: PresentationAction): PresentationType => {
    switch (action.type) {
        case PresentationActionType.ADD_SLIDE:  
            return addSlide(state)
        case PresentationActionType.REMOVE_SLIDE:
            return removeSlide(state, action.payload)
        case PresentationActionType.UPDATE_SLIDES:
            return {
                ...state,
                slides: action.payload
            }
        case PresentationActionType.UPDATE_POSITION_ELEMENT:
            return updatePositionElement(state, action.payload);
        case PresentationActionType.UPDATE_SIZE_ELEMENT:
            return updateSizeElement(state, action.payload);
        case PresentationActionType.UPDATE_BACKGROUND_SLIDE:
            {
                const {newBackground, isAllSlides} = action.payload;
                return updateBackgroundSlide(state, newBackground, isAllSlides);
            }
        case PresentationActionType.ADD_TEXT_ELEMENT:
            return addTextElement(state, action.payload);
        case PresentationActionType.ADD_IMAGE_ELEMENT:
            return addImageElement(state, action.payload);
        case PresentationActionType.DELETE_ELEMENT:
            return deleteElement(state)
        case PresentationActionType.CHANGE_PRESENTATION_TITLE:
            return {
                ...state,
                title: action.payload 
            }
        case PresentationActionType.SET_SELECTION_ELEMENT:
            return {
                ...state,
                selection: {
                    ...state.selection,
                    elementsId: [action.payload]
                }
            }
        case PresentationActionType.SET_SELECTION_SLIDE:
            return {
                ...state,
                selection: {
                    selectedSlideId: action.payload, 
                    elementsId: [] 
                }
            }
        case PresentationActionType.DELETE_SELECTION_ELEMENT:
            return {
                ...state,
                selection: {
                    ...state.selection,
                    elementsId: []
                }
            }
        case PresentationActionType.SET_PRESENTATION:
            return action.payload
        case PresentationActionType.UPDATE_CONTENT_TEXT:
            return updateContentText(state, action.payload)
        case PresentationActionType.UPDATE_TEXT_STYLE:
            return updateTextStyle(state, action.payload.style, action.payload.value)
        case PresentationActionType.ADD_FIGURE_ELEMENT:
            return addFigureElement(state, action.payload)
        case PresentationActionType.UPDATE_FILL_ELEMENT:
            return updateFillElement(state, action.payload)
        default:
            return state
    }
}

export {
    presentationReducer,
}