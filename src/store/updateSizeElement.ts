import {PresentationType, SizeType} from "./types";

const updateSizeElement = (presentation: PresentationType, newSize: SizeType): PresentationType => {

    const selectedElementId = presentation.selection.elementsId[0];
    const selectedSlideId = presentation.selection.selectedSlideId;

    const newSlides = presentation.slides.map(slide => {
        if (slide.id === selectedSlideId) {
            return {
                ...slide,
                elements: slide.elements.map(element => {
                    if (element.id === selectedElementId) {
                        return {
                            ...element,
                            size: newSize
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
    }
}

export {
    updateSizeElement,
}