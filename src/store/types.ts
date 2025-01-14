type PresentationType = {
    title: string,
    theme: string | null, 
    selection: SelectionType,
    slides: SlideType[],
}

type SlideType = {
    id: string,
    background: string,
    elements: (ImageElementType | TextElementType | FigureElementType)[],
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

type FigureType = 'rectangle' | 'circle' | 'triangle' | 'line';

type FigureElementType = BaseElementType & {
    type: 'figure',
    figureType: FigureType,
    fill: string,
}

type ImageElementType = BaseElementType & {
    type: 'image',
    src: string,
}

type TextElementType = BaseElementType & {
    type: 'text',
    content: string,
    fontFamily: string,
    fontSize: number,
    weight: 'normal' | 'bold',
    style: 'normal' | 'italic',
    transform: 'none' | 'uppercase' | 'lowercase',
    color: string,
    decoration: 'none' | 'underline',
}

type SelectionType = {
    selectedSlideId: string | null,
    elementsId: string[],
}

type UpdateSizeType = 
    | 'horizontal-right' 
    | 'horizontal-left' 
    | 'diagonal-right-bottom' 
    | 'diagonal-right-top' 
    | 'diagonal-left-bottom' 
    | 'diagonal-left-top' 
    | 'vertical-top' 
    | 'vertical-bottom';

export type {
    PresentationType,
    SlideType,
    PositionType,
    SizeType,
    BaseElementType,
    ImageElementType,
    TextElementType,
    SelectionType,
    UpdateSizeType,
    FigureElementType,
    FigureType,
};