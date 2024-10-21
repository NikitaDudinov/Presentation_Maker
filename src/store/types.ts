type PresentationType = {
    title: string,
    select: Selection,
    slides: Array<SlideType>,
}

type SlideType = {
    id: string,
    background: string,
    elements: Array<TextElement | ImageElement>
}

type Position = {
    x: number,
    y: number
}

type Size = {
    width: number,
    height: number
}

type BaseElement = {
    id: string,
    position: Position,
    size: Size,
}

type ImageElement = BaseElement & {
    type: 'image';
    src: string;
}

type TextElement = BaseElement & {
    type: 'text';
    content: string;
    font: {
        family: string,
        size: number
    }
}

type Selection = {
    selectedSlideId: string;
    elementsId: Array<string>
}

export type{
    PresentationType,
    SlideType,
    Position,
    Size,
    BaseElement,
    ImageElement,
    TextElement,
    Selection
};