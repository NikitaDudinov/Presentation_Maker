import { PositionType, SelectionType, SizeType, SlideType } from "../../types";

enum TitleActionType {
    CHANGE_PRESENTATION_TITLE = 'changePresentationTitle',
    SET_PRESENTATION_TITLE = 'setPresentationTitle'
}

enum SlidesActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    UPDATE_SLIDES = 'updateSlides',
    UPDATE_POSITION_ELEMENT = 'updatePositionElement',
    UPDATE_SIZE_ELEMENT = 'updateSizeElement',
    UPDATE_BACKGROUND_SLIDE = 'updateBackgroundSlide',
    ADD_TEXT_ELEMENT = 'addTextElement',
    ADD_IMAGE_ELEMENT = 'addImageElement',
    DELETE_ELEMENT = 'deleteElement',
    SET_SLIDES = 'setSlides',
}

enum SelectionActionType {
    SET_SELECTION_SLIDE = 'setSelectionSlide',
    SET_SELECTION_ELEMENT = 'setSelectionElement',
    DELETE_SELECTION_ELEMENT = 'deleteSelectionElement',
    SET_SELECTION = 'setSelection',
}

type SetSelectionElementAction = {
    type: SelectionActionType.SET_SELECTION_ELEMENT,
    payload: string,
}

type SetSelectionAction = {
    type: SelectionActionType.SET_SELECTION,
    payload: SelectionType,
}


type SetSelectionSlideAction = {
    type: SelectionActionType.SET_SELECTION_SLIDE,
    payload: string,
}

type DeleteSelectionElementAction = {
    type: SelectionActionType.DELETE_SELECTION_ELEMENT,
}


type AddSlideAction = {
    type: SlidesActionType.ADD_SLIDE,
    payload: {selection: SelectionType}
}

type SetSlidesAction = {
    type: SlidesActionType.SET_SLIDES,
    payload: SlideType[],
}

type DeleteElementAction = {
    type: SlidesActionType.DELETE_ELEMENT,
    payload: {selectedElementId: string, selectedSlideId: string | null}
}

type UpdatePositionElementAction = {
    type: SlidesActionType.UPDATE_POSITION_ELEMENT,
    payload: {selectedElementId: string, selectedSlideId: string, newPosition: PositionType}
}

type UpdateSizeElementAction = {
    type: SlidesActionType.UPDATE_SIZE_ELEMENT,
    payload: {selectedElementId: string, selectedSlideId: string, newSize: SizeType}
}

type UpdateBackgroundSlideAction = {
    type: SlidesActionType.UPDATE_BACKGROUND_SLIDE,
    payload: {selectedSlideId: string, newBackground: string, isAllSlides: boolean}
}

type RemoveSlideAction = {
    type: SlidesActionType.REMOVE_SLIDE,
    payload: string,
}

type UpdateSlidesAction = {
    type: SlidesActionType.UPDATE_SLIDES,
    payload: {newSlides: SlideType[]},
}

type AddTextElementAction = {
    type: SlidesActionType.ADD_TEXT_ELEMENT,
    payload: {selectedSlideId: string}
}

type AddImageElementAction = {
    type: SlidesActionType.ADD_IMAGE_ELEMENT,
    payload: {selectedSlideId: string, value?: string}
}



type ChangePresentationTitleAction = {
    type: TitleActionType.CHANGE_PRESENTATION_TITLE,
    payload: string,
}

type SetPresentationTitleAction = {
    type: TitleActionType.SET_PRESENTATION_TITLE,
    payload: string,
}

type TitleAction = SetPresentationTitleAction | ChangePresentationTitleAction

type SelectionAction = SetSelectionElementAction | SetSelectionSlideAction | DeleteSelectionElementAction | SetSelectionAction

type SlidesAction = AddSlideAction | RemoveSlideAction | UpdateSlidesAction | UpdatePositionElementAction | UpdateSizeElementAction | UpdateBackgroundSlideAction | AddTextElementAction | AddImageElementAction | DeleteElementAction | SetSlidesAction

export {
    TitleActionType,
    SelectionActionType,
    SlidesActionType,
    type SelectionAction,
    type TitleAction,
    type  SlidesAction,
}