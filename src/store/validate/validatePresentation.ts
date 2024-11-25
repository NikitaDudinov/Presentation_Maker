import { 
    SlideType, 
    SizeType, 
    TextElementType, 
    ImageElementType, 
    SelectionType, 
    PresentationType, 
    PositionType,
} from "../types";

const isValidPosition = (position: any): position is PositionType => {
    return (
        position &&
        typeof position.x === 'number' &&
        typeof position.y === 'number'
    );
};

const isValidSize = (size: any): size is SizeType => {
    return (
        size &&
        typeof size.width === 'number' &&
        typeof size.height === 'number'
    );
};

const validateElement = (element: any): element is ImageElementType | TextElementType => {
    if (!element || typeof element.id !== 'string' || !isValidPosition(element.position) || !isValidSize(element.size)) {
        return false;
    }

    if (element.type === 'image') {
        return typeof element.src === 'string';
    }

    if (element.type === 'text') {
        return (
            typeof element.content === 'string' &&
            element.font &&
            typeof element.font.family === 'string' &&
            typeof element.font.size === 'number'
        );
    }

    return false;
};

const validateSlide = (slide: any): slide is SlideType => {
    return (
        slide &&
        typeof slide.id === 'string' &&
        typeof slide.background === 'string' &&
        Array.isArray(slide.elements) &&
        slide.elements.every(validateElement)
    );
};

const validateSelection = (selection: any): selection is SelectionType => {
    return (
        selection &&
        (selection.selectedSlideId === null || typeof selection.selectedSlideId === 'string') &&
        Array.isArray(selection.elementsId) &&
        selection.elementsId.every((id: string) => typeof id === 'string') // Указываем тип для id
    );
};

const validatePresentation = (presentation: any): presentation is PresentationType => {
    return (
        presentation &&
        typeof presentation.title === 'string' &&
        validateSelection(presentation.selection) &&
        Array.isArray(presentation.slides) &&
        presentation.slides.every(validateSlide)
    );
};

export {
    validatePresentation
}