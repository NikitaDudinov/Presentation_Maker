import { PresentationType} from "./types"

const changePropertyTextElement = (
    presentation: PresentationType,
    payload: { property: string; value: string }
): PresentationType => {

    console.log(payload)

    const selectedSlideId = presentation.selection.selectedSlideId
    const selectElementId = presentation.selection.elementsId[0]
    
    const newSlides = presentation.slides.map(slide => {
        if (slide.id === selectedSlideId) {
            return {
                ...slide,
                elements: slide.elements.map(element => {
                    if (element.id === selectElementId && element.type !== 'image') {
                        console.log('her', payload.property, payload.value)
                        return {
                            ...element,
                            font: {
                                ...element.font,
                                [payload.property]: payload.value,
                            }
                        };
                    }
                    return element;
                }),
            };
        }
        return slide; 
    });

    return {
        ...presentation,
        slides: newSlides,
    };
}

export {
    changePropertyTextElement,
}