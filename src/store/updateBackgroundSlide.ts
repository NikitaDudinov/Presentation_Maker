import {PresentationType} from "./types"

const updateBackgroundSlide = (
    presentation: PresentationType,
    newBackground: string,
    isAllSlides: boolean,
): PresentationType => {

    const selectedSlideId = presentation.selection.selectedSlideId;
    console.log(newBackground)
    if(selectedSlideId){
        const newSlides = presentation.slides.map(slide => {
            if (isAllSlides || slide.id === selectedSlideId) {
                return {
                    ...slide,
                    background: newBackground === '' ? 'white' : newBackground,
                };
            }
            return slide;
        });

        return {
            ...presentation,
            theme: isAllSlides ? newBackground : null,
            slides: newSlides,
        }
    }   

    return presentation
}

export {
    updateBackgroundSlide,
}