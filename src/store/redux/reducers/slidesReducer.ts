import { addSlide } from "../../addSlide";
import { SlideType } from "../../types";
import { updatePositionElement } from "../../updatePositionElement";
import { SlidesAction, SlidesActionType } from "../actions/actions";
import { defaultPresentation } from "../defaultPresentation";
import { updateSizeElement } from "../../updateSizeElement";
import { updateBackgroundSlide } from "../../updateBackgroundSlide";
import { addTextElement } from "../../addTextElement";
import { addImageElement } from "../../addImageElement";
import { deleteElement } from "../../deleteElement";

const slidesReducer = (state: SlideType[] = defaultPresentation.slides, action: SlidesAction): SlideType[] => { 
    switch (action.type) { 
        case SlidesActionType.ADD_SLIDE: 
        {
            const {selection}  = action.payload;
            return addSlide(state, selection);
        }
        case SlidesActionType.REMOVE_SLIDE: 
            return state.filter(item => item.id !== action.payload)
        case SlidesActionType.UPDATE_SLIDES: 
        {
            const {newSlides}  = action.payload;
            return newSlides;
        }
        case SlidesActionType.UPDATE_POSITION_ELEMENT:
        {
            const {selectedElementId, selectedSlideId, newPosition} = action.payload;
            return updatePositionElement(state, newPosition, selectedSlideId, selectedElementId);
        }
        case SlidesActionType.UPDATE_SIZE_ELEMENT:
            {
                const {selectedElementId, selectedSlideId, newSize} = action.payload;
                return updateSizeElement(state, newSize, selectedSlideId, selectedElementId);
            }
        case SlidesActionType.UPDATE_BACKGROUND_SLIDE:
            {
                const {selectedSlideId, newBackground, isAllSlides} = action.payload;
                return updateBackgroundSlide(state, newBackground, selectedSlideId, isAllSlides);
            }
        case SlidesActionType.ADD_TEXT_ELEMENT:
            {
                const {selectedSlideId} = action.payload;
                return addTextElement(state, selectedSlideId);
            }
        case SlidesActionType.ADD_IMAGE_ELEMENT:
            {
                const {selectedSlideId, value} = action.payload;
                return addImageElement(state, selectedSlideId, value);
            }
        case SlidesActionType.DELETE_ELEMENT:
            {
                const {selectedSlideId, selectedElementId} = action.payload;
                return deleteElement(state, selectedElementId, selectedSlideId)
            }
        default: 
            return state 
    } 
}

export {
    slidesReducer,
}