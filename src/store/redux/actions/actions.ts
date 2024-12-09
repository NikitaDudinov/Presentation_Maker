import { PositionType, PresentationType, SelectionType, SizeType, SlideType } from "../../types";

enum PresentationActionType {
    SET_PRESENTATION = 'setPresentation',
}

enum TitleActionType {
    CHANGE_PRESENTATION_TITLE = 'changePresentationTitle',
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
}

enum SelectionActionType {
    SET_SELECTION_SLIDE = 'setSelectionSlide',
    SET_SELECTION_ELEMENT = 'setSelectionElement',
    DELETE_SELECTION_ELEMENT = 'deleteSelectionElement',
}

type SetSelectionElementAction = {
    type: SelectionActionType.SET_SELECTION_ELEMENT,
    payload: string
}

type SetSelectionSlideAction = {
    type: SelectionActionType.SET_SELECTION_SLIDE,
    payload: string
}

type DeleteSelectionElementAction = {
    type: SelectionActionType.DELETE_SELECTION_ELEMENT,
}


type AddSlideAction = {
    type: SlidesActionType.ADD_SLIDE,
    payload: {selection: SelectionType}
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

type SetPresentationAction = {
    type: PresentationActionType.SET_PRESENTATION,
    payload: PresentationType,
}

type PresentationAction = SetPresentationAction

type SelectionAction = SetSelectionElementAction | SetSelectionSlideAction | DeleteSelectionElementAction

type SlidesAction = AddSlideAction | RemoveSlideAction | UpdateSlidesAction | UpdatePositionElementAction | UpdateSizeElementAction | UpdateBackgroundSlideAction | AddTextElementAction | AddImageElementAction | DeleteElementAction

export {
    PresentationActionType,
    TitleActionType,
    SelectionActionType,
    SlidesActionType,
    type SelectionAction,
    type ChangePresentationTitleAction,
    type  SlidesAction,
    type PresentationAction,
}