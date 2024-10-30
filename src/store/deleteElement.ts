import { PresentationType } from "./types"

const deleteElement = (presentation: PresentationType): PresentationType => {
    const selectedSlideId = presentation.selection.selectedSlideId
    const selectedElementId = presentation.selection.elementsId[0]

    if (selectedElementId && selectedSlideId) {
        const selectedSlide = presentation.slides.find(slide => slide.id === selectedSlideId)
        if (selectedSlide) {
            const newElements = selectedSlide.elements.filter(element => element.id !== selectedElementId);
            const updatedSlides = presentation.slides.map(slide => 
                slide.id === selectedSlideId ? { ...slide, elements: newElements } : slide
            );
            return {
                ...presentation,
                slides: updatedSlides,
                selection: {
                    ...presentation.selection,
                    elementsId: [],
                },
            };
        }

        return presentation

    }

    return presentation
}

export {
    deleteElement,
}