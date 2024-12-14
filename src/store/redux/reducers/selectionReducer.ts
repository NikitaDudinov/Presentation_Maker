import { SelectionType } from "../../types";
import {SelectionActionType, SelectionAction } from "../actions/actions";
import { defaultPresentation } from "../defaultPresentation";

const selectionReducer = (state: SelectionType = defaultPresentation.selection, action: SelectionAction): SelectionType => {
    switch (action.type) { 
        case SelectionActionType.SET_SELECTION_ELEMENT: 
            return {
                ...state,
                elementsId: [action.payload]
            }
        case SelectionActionType.SET_SELECTION_SLIDE: 
            return { 
                selectedSlideId: action.payload, 
                elementsId: [] 
            }
        case SelectionActionType.DELETE_SELECTION_ELEMENT: 
            return { 
                ...state,
                elementsId: [],
            }
        case SelectionActionType.SET_SELECTION: 
            return action.payload
        default: 
            return state 
    } 
}

export {
    selectionReducer,
}