import { 
    SlideType, 
    SizeType, 
    TextElementType, 
    ImageElementType, 
    SelectionType, 
    PresentationType, 
    PositionType,
    BaseElementType,
    FigureElementType,
} from "../types";

const isValidPosition = (position: PositionType): position is PositionType => {
    return (
        typeof position === 'object' &&
        position !== null &&
        typeof position.x === 'number' &&
        typeof position.y === 'number'
    );
};

const isValidSize = (size: SizeType): size is SizeType => {
    return (
        typeof size === 'object' &&
        size !== null &&
        typeof size.width === 'number' &&
        typeof size.height === 'number'
    );
};

const validateBaseElement = (element: BaseElementType): element is BaseElementType => {
    return (
        typeof element.id === 'string' &&
        isValidPosition(element.position) &&
        isValidSize(element.size)
    );
};

const validateImageElement = (element: ImageElementType): element is ImageElementType => {
    return (
        validateBaseElement(element) &&
        element.type === 'image' &&
        typeof element.src === 'string'
    );
};

const validateTextElement = (element: TextElementType): element is TextElementType => {
    return (
        validateBaseElement(element) &&
        element.type === 'text' &&
        typeof element.content === 'string' &&
        typeof element.fontFamily === 'string' &&
        typeof element.fontSize === 'number' &&
        ['normal', 'bold'].includes(element.weight) &&
        ['normal', 'italic'].includes(element.style) &&
        ['none', 'uppercase', 'lowercase'].includes(element.transform) &&
        typeof element.color === 'string' &&
        ['none', 'underline'].includes(element.decoration)
    );
};

const validateFigureElement = (element: FigureElementType): element is FigureElementType => {
    return (
        validateBaseElement(element) &&
        element.type === 'figure' &&
        ['rectangle', 'circle', 'triangle', 'line'].includes(element.figureType) &&
        typeof element.fill === 'string'
    );
};

const validateElement = (element: any): element is ImageElementType | TextElementType | FigureElementType => {
    if (!element || typeof element.id !== 'string') {
        return false;
    }

    switch (element.type) {
        case 'image':
            return validateImageElement(element);
        case 'text':
            return validateTextElement(element);
        case 'figure':
            return validateFigureElement(element);
        default:
            return false;
    }
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
        selection.elementsId.every((id: any) => typeof id === 'string')
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
};
