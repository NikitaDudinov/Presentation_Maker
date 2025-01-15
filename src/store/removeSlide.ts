import { PresentationType } from "./types"

const removeSlide = (presentation: PresentationType, removeSlideId: string): PresentationType => {

    if (removeSlideId){
        const newSlides = presentation.slides.filter(slide => slide.id != removeSlideId)

        let newSelectedSlideId = null;
        const removeSlideIndex = presentation.slides.findIndex(slide => slide.id == removeSlideId)
        
        if (newSlides.length > 0) {
            const index = Math.min(removeSlideIndex, newSlides.length - 1)
            newSelectedSlideId = newSlides[index].id
        }

        return {
            ...presentation,
            slides: newSlides,
            selection: {
                ...presentation.selection,
                selectedSlideId: newSelectedSlideId,
            }
        }
    }

    return presentation
}

export {
    removeSlide,
}