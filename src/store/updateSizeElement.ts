import { PresentationType, SizeType } from "./types";

const updateSizeElement = (
    presentation: PresentationType,
    payload: { size: SizeType }
): PresentationType => {
    const selectedSlideId = presentation.selection.selectedSlideId
    const selectElementId = presentation.selection.elementsId[0]
    const newSlides = presentation.slides.map(slide => {
        if (slide.id === selectedSlideId) {
            return {
                ...slide,
                elements: slide.elements.map(element => {
                    if (element.id === selectElementId) {
                        return {
                            ...element,
                            size: payload.size
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
    updateSizeElement,
}