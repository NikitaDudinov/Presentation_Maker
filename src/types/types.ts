type TPresentation = {
    title: string,
    select: Select,
    slides: Array<TSlide>,
}

type TSlide = {
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

type Select = {
    elementsId: Array<string>
}

export type{
    TPresentation,
    TSlide,
    Position,
    Size,
    BaseElement,
    ImageElement,
    TextElement,
    Select
};