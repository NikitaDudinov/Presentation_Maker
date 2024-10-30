type PresentationType = {
    title: string,
    selection: SelectionType,
    slides: SlideType[],
}

type SlideType = {
    id: string,
    background: string,
    elements: (ImageElementType | TextElementType)[],
}

type PositionType = {
    x: number,
    y: number,
}

type SizeType = {
    width: number,
    height: number,
}

type BaseElementType = {
    id: string,
    position: PositionType,
    size: SizeType,
}

type ImageElementType = BaseElementType & {
    type: 'image',
    src: string,
}

type TextElementType = BaseElementType & {
    type: 'text',
    content: string,
    font: {
        family: string,
        size: number,
    }
}

type SelectionType = {
    selectedSlideId: string | null,
    elementsId: string[],
}

export type {
    PresentationType,
    SlideType,
    PositionType,
    SizeType,
    BaseElementType,
    ImageElementType,
    TextElementType,
    SelectionType
};