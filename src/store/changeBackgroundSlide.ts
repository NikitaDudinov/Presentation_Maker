import { PresentationType} from "./types"

const changeBackgroundSlide = (
    presentation: PresentationType,
    payload: { background: string; all: boolean }
): PresentationType => {
    const selectedSlideId = presentation.selection.selectedSlideId
    
    if(selectedSlideId){
        const newSlides = presentation.slides.map(slide => {
            if (payload.all || slide.id === selectedSlideId) {
                return {
                    ...slide,
                    background: payload.background,
                };
            }
            return slide;
        });

        return {
            ...presentation,
            slides: newSlides,
        }
    }   

    return presentation
}

export {
    changeBackgroundSlide,
}