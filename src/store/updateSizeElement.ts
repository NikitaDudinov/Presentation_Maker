import {SizeType, SlideType } from "./types";

const updateSizeElement = (slides: SlideType[], newSize: SizeType, selectedSlideId: string, selectedElementId: string): SlideType[] => {
    const newSlides = slides.map(slide => {
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

    return newSlides
}

export {
    updateSizeElement,
}