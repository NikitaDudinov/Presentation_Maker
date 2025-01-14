import { FigureType, PositionType, PresentationType, SizeType, SlideType } from "../types";

enum PresentationActionType {
    CHANGE_PRESENTATION_TITLE = 'changePresentationTitle',

    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    UPDATE_SLIDES = 'updateSlides',
    UPDATE_POSITION_ELEMENT = 'updatePositionElement',
    UPDATE_SIZE_ELEMENT = 'updateSizeElement',
    UPDATE_BACKGROUND_SLIDE = 'updateBackgroundSlide',
    ADD_TEXT_ELEMENT = 'addTextElement',
    ADD_IMAGE_ELEMENT = 'addImageElement',
    ADD_FIGURE_ELEMENT = 'addFigureElement',
    DELETE_ELEMENT = 'deleteElement',
    UPDATE_FILL_ELEMENT = 'updateFillElement',

    SET_SELECTION_SLIDE = 'setSelectionSlide',
    SET_SELECTION_ELEMENT = 'setSelectionElement',
    DELETE_SELECTION_ELEMENT = 'deleteSelectionElement',

    UPDATE_CONTENT_TEXT = 'updateContentText',
    UPDATE_TEXT_STYLE = 'updateTextStyle',

    SET_PRESENTATION = 'setPresentation',
}

type SetPresentationAction = {
    type: PresentationActionType.SET_PRESENTATION,
    payload: PresentationType,
}

type AddSlideAction = {
    type: PresentationActionType.ADD_SLIDE,
}

type RemoveSlideAction = {
    type: PresentationActionType.REMOVE_SLIDE,
    payload: string,
}

type UpdateSlidesAction = {
    type: PresentationActionType.UPDATE_SLIDES,
    payload: SlideType[],
}

type UpdatePositionElementAction = {
    type: PresentationActionType.UPDATE_POSITION_ELEMENT,
    payload: PositionType,
}

type UpdateSizeElementAction = {
    type: PresentationActionType.UPDATE_SIZE_ELEMENT,
    payload: SizeType;
}

type UpdateBackgroundSlideAction = {
    type: PresentationActionType.UPDATE_BACKGROUND_SLIDE,
    payload: {newBackground: string, isAllSlides: boolean}
}

type AddTextElementAction = {
    type: PresentationActionType.ADD_TEXT_ELEMENT,
    payload: string,
}

type AddImageElementAction = {
    type: PresentationActionType.ADD_IMAGE_ELEMENT,
    payload?: string;
}

type DeleteElementAction = {
    type: PresentationActionType.DELETE_ELEMENT,
}

type ChangePresentationTitleAction = {
    type: PresentationActionType.CHANGE_PRESENTATION_TITLE,
    payload: string,
}

type SetSelectionElementAction = {
    type: PresentationActionType.SET_SELECTION_ELEMENT,
    payload: string,
}

type SetSelectionSlideAction = {
    type: PresentationActionType.SET_SELECTION_SLIDE,
    payload: string,
}

type DeleteSelectionElementAction = {
    type: PresentationActionType.DELETE_SELECTION_ELEMENT,
}

type UpdateTextContentAction = {
    type: PresentationActionType.UPDATE_CONTENT_TEXT
    payload: string,
}

type UpdateTextStyleAction = {
    type: PresentationActionType.UPDATE_TEXT_STYLE,
    payload: {style: string, value: string | number},
}

type AddFigureElementAction = {
    type: PresentationActionType.ADD_FIGURE_ELEMENT,
    payload: FigureType,
}

type UpdateFillElementAction = {
    type: PresentationActionType.UPDATE_FILL_ELEMENT,
    payload: string,
}

type PresentationAction = ChangePresentationTitleAction |
                          SetSelectionElementAction |
                          SetSelectionSlideAction |
                          DeleteSelectionElementAction | 
                          AddSlideAction | 
                          RemoveSlideAction | 
                          UpdateSlidesAction | 
                          UpdatePositionElementAction | 
                          UpdateSizeElementAction | 
                          UpdateBackgroundSlideAction | 
                          AddTextElementAction | 
                          AddImageElementAction | 
                          DeleteElementAction | 
                          SetPresentationAction |
                          UpdateTextContentAction | 
                          UpdateTextStyleAction | 
                          AddFigureElementAction |
                          UpdateFillElementAction

export {
    PresentationActionType,
    type PresentationAction,
}