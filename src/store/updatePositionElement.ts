import { PositionType, PresentationType} from "./types"

const updatePositionElement = (
    presentation: PresentationType,
    payload: { position: PositionType }
): PresentationType => {
    const selectedSlideId = presentation.selection.selectedSlideId
    const selectElementId = presentation.selection.elementsId[0]

    const newSlides = presentation.slides.map(slide => {
        if (slide.id === selectedSlideId) {
            return {
                ...slide,
                elements: slide.elements.map(element => {
                    if (element.id === selectElementId) {
                        console.log(
                            {
                            ...element,
                            position: payload.position
                        }
                        )
                        return {
                            ...element,
                            position: payload.position
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
        selection: {
            ...presentation.selection,
            elementsId: [],
        },
        slides: newSlides,
    };
}

export {
    updatePositionElement,
}