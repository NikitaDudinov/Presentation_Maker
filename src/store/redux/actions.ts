import { PresentationType, SelectionType } from "../types";

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',

    SET_SELECTION = 'setSelection',

    SET_PRESENTATION = 'setPresentation',
    CHANGE_PRESENTATION_TITLE = 'changePresentationTitle',
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE,
}

type SetSelectionAction = {
    type: ActionType.SET_SELECTION
    payload: SelectionType,
}

type ChangePresentationTitleAction = {
    type: ActionType.CHANGE_PRESENTATION_TITLE,
    payload: string,
}

type SetPresentationAction = {
    type: ActionType.SET_PRESENTATION,
    payload: PresentationType,
}

type PresentationAction = AddSlideAction | RemoveSlideAction | SetSelectionAction | SetPresentationAction | ChangePresentationTitleAction

export {
    ActionType,
    type SetSelectionAction,
    type PresentationAction,
}