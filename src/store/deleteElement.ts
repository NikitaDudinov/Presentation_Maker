import { PresentationType } from "./types"

const deleteElement = (presentation: PresentationType): PresentationType => {

    const selectedElementId = presentation.selection.elementsId[0];
    const selectedSlideId = presentation.selection.selectedSlideId;


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
            }
        }

        return presentation

    }

    return presentation
}

export {
    deleteElement,
}