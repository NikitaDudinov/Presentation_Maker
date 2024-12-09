import { ChangePresentationTitleAction, TitleActionType } from "../actions/actions";
import { defaultPresentation } from "../defaultPresentation";


const titleReducer = (state: string = defaultPresentation.title, action: ChangePresentationTitleAction): string => {
    if (action.type === TitleActionType.CHANGE_PRESENTATION_TITLE) { 
        return action.payload 
    } else { 
        return state 
    } 
}

export {
    titleReducer,
}