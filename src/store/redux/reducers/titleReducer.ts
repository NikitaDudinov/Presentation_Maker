import { TitleAction, TitleActionType } from "../actions/actions";
import { defaultPresentation } from "../defaultPresentation";


const titleReducer = (state: string = defaultPresentation.title, action: TitleAction): string => {
    switch(action.type) {
        case TitleActionType.CHANGE_PRESENTATION_TITLE: 
            return action.payload 
        case TitleActionType.SET_PRESENTATION_TITLE: 
            return action.payload 
        default: 
            return state;
        
    }
}

export {
    titleReducer,
}