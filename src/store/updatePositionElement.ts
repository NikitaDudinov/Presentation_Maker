import { PositionType, PresentationType} from "./types"

const updatePositionElement = (presentation: PresentationType, newPosition: PositionType): PresentationType => {

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
                            position: newPosition
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
    updatePositionElement,
}