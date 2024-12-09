import { PositionType, SlideType} from "./types"

const updatePositionElement = (slides: SlideType[], newPosition: PositionType, selectedSlideId: string, selectedElementId: string): SlideType[] => {

    const newSlides = slides.map(slide => {
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

    return newSlides
}

export {
    updatePositionElement,
}