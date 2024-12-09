import {SlideType} from "./types"

const updateBackgroundSlide = (
    slides: SlideType[],
    newBackground: string,
    selectedSlideId: string,
    isAllSlides: boolean,
): SlideType[] => {
    console.log('hihih')
    if(selectedSlideId){
        const newSlides = slides.map(slide => {
            if (isAllSlides || slide.id === selectedSlideId) {
                return {
                    ...slide,
                    background: newBackground === '' ? 'white' : newBackground,
                };
            }
            return slide;
        });

        return newSlides
    }   

    return slides
}

export {
    updateBackgroundSlide,
}