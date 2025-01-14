import { PresentationType } from "./types";

function updateTextStyle(presentation: PresentationType, style: string, value: string | number): PresentationType {
    const selectedSlideId = presentation.selection.selectedSlideId;
    const selectedElementId = presentation.selection.elementsId[0];

    console.log(style, value);

    if (selectedSlideId && selectedElementId) {
        const newSlides = presentation.slides.map(slide => {
            if (slide.id === selectedSlideId) {
                const newElements = slide.elements.map(element => {
                    if (element.id === selectedElementId) {
                        return {
                            ...element,
                            [style]: value
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
    updateTextStyle,
};
