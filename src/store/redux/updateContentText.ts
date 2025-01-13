import { PresentationType } from "../types";

function updateContentText(presentation: PresentationType, newContent: string): PresentationType {
    const selectedSlideId = presentation.selection.selectedSlideId;
    const selectedElementId = presentation.selection.elementsId[0];

    if (selectedSlideId && selectedElementId) {
        const newSlides = presentation.slides.map(slide => {
            if (slide.id === selectedSlideId) {
                const newElements = slide.elements.map(element => {
                    if (element.id === selectedElementId) {
                        return {
                            ...element,
                            content: newContent
                        };
                    }
                    return element;
                });

                return {
                    ...slide,
                    elements: newElements
                };
            }
            return slide;
        });

        return {
            ...presentation,
            slides: newSlides,
        };
    }

    return presentation;
}

export {
    updateContentText,
};
