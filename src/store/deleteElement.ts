import { SlideType } from "./types"

const deleteElement = (slides: SlideType[], selectedElementId: string, selectedSlideId: string | null): SlideType[] => {
    if (selectedElementId && selectedSlideId) {
        const selectedSlide = slides.find(slide => slide.id === selectedSlideId)
        if (selectedSlide) {
            const newElements = selectedSlide.elements.filter(element => element.id !== selectedElementId);
            const updatedSlides = slides.map(slide => 
                slide.id === selectedSlideId ? { ...slide, elements: newElements } : slide
            );
            return updatedSlides
        }

        return slides

    }

    return slides
}

export {
    deleteElement,
}