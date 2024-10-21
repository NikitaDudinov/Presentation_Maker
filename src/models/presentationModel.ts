import { PresentationType, SlideType, ImageElement, TextElement } from "../store/types";

function renamePresentationTypeTitle(newTitle: string, presentation: PresentationType): PresentationType {
    return {
        ...presentation,
        title: newTitle,
    }
}

function addSlides(newSlide: SlideType, presentation: PresentationType): PresentationType {
    return {
        ...presentation,
        slides: [...presentation.slides, newSlide]
    }
}

function removeSlide(slideId: string, presentation: PresentationType, ): PresentationType {
    return {
        ...presentation,
        slides: [...presentation.slides.filter(slide => slide.id !== slideId)]
    }
}

function moveSlide(newIndex: number, elementId: string, presentation: PresentationType): PresentationType {
    const slides = [...presentation.slides];
    const slideIndex = findArrayIndex(slides, elementId)
    if(slideIndex !== -1){
        const slide = slides[slideIndex];
        slides.splice(slideIndex, 1);
        slides.splice(newIndex, 0, slide)
    }
    return {
        ...presentation,
        slides: slides
    }
}

function addSlideElement(slideId: string, newElement: ImageElement | TextElement, presentation: PresentationType): PresentationType {
    const newSlides =  [...presentation.slides].map(slide => {
        if(slide.id === slideId)
            return {
                ...slide,
                elements: [...slide.elements, newElement]
            }
        return slide    
    })
    return {
        ...presentation,
        slides: newSlides
    }
}

function removeSlideElment(slideId: string, elementId: string,  presentation: PresentationType): PresentationType {
    const newSlides = [...presentation.slides].map(slide => {
        if(slide.id === slideId) {
            return {
                ...slide,
                elements: slide.elements.filter(element => element.id !== elementId)
            }
        }
        return slide
    })
    return {
        ...presentation,
        slides: newSlides
    }
}

function moveSlideElement(slideId: string, elementId: string, newPosition: { x: number, y: number }, presentation: PresentationType): PresentationType {
    const newSlides = [...presentation.slides].map(slide => {
        if (slide.id === slideId){
            const newElements = slide.elements;
            const elementIndex = findArrayIndex(newElements, elementId)
            if(elementIndex !== -1) 
                newElements[elementIndex] = { ...newElements[elementIndex], position: newPosition }
            return {
                ...slide,
                elements: newElements
            }
        }
        return slide
    })
    return {
        ...presentation,
        slides: newSlides
    }
    

}

function resizeElement(slideId: string, elementId: string, newSize: { width: number, height: number }, presentation: PresentationType): PresentationType {
    const newSlides = [...presentation.slides].map(slide => {
        if (slide.id === slideId){
            const newElements = slide.elements;
            const elementIndex = findArrayIndex(newElements, elementId)
            if(elementIndex !== -1)
                newElements[elementIndex] = { ...newElements[elementIndex], size: newSize }
            return {
                ...slide,
                elements: newElements
            }
        } 
        return slide
    })
    return {
        ...presentation,
        slides: newSlides
    }
}

function changeText(slideId: string, elementId: string, newText: string, presentation: PresentationType): PresentationType {
    const newSlides = [...presentation.slides].map(slide => {
        if (slide.id === slideId){
            const newElements = slide.elements;
            const elementIndex = findArrayIndex(newElements, elementId);
            if(elementIndex !== -1){
                let newELement = newElements[elementIndex]
                if (newELement.type === 'text')
                    newELement = {...newELement, content: newText};
                newElements[elementIndex] = newELement;
            }
            return {
                ...slide,
                elements: newElements
            }
        }
        return slide
    })
    return {
        ...presentation,
        slides: newSlides
    }
}

function changeTextSize(slideId: string, elementId: string, newSize: number, presentation: PresentationType): PresentationType {
    const newSlides = [...presentation.slides].map(slide => {
        if (slide.id === slideId){
            const newElements = slide.elements.map(element => {
                if(element.id === elementId && element.type === 'text'){
                    return {...element, font: {...element.font, size: newSize}}
                }
                return element
            })
            return {
                ...slide,
                elements: newElements
            }
        }
        return slide
    })
    return {
        ...presentation,
        slides: newSlides
    }
}

function changeTextFamily(slideId: string, elementId: string, newFamily: string, presentation: PresentationType): PresentationType {
    const newSlides = [...presentation.slides].map(slide => {
        if (slide.id === slideId){
            const newElements = slide.elements.map(element => {
                if(element.id === elementId && element.type === 'text'){
                    return {...element, font: {...element.font, family: newFamily}}
                }
                return element
            })
            return {
                ...slide,
                elements: newElements
            }
        }
        return slide
    })
    return {
        ...presentation,
        slides: newSlides
    }
}

function changeBackgroundSlide(slideId: string, newBackground: string, presentation: PresentationType): PresentationType {
    const newSlides = [...presentation.slides].map(slide => {
        if(slide.id === slideId){
            return{
                ...slide,
                background: newBackground
            }
        }
        return slide
    })
    return {
        ...presentation,
        slides: newSlides
    }
}

function findArrayIndex(arr: Array<SlideType> | Array<ImageElement | TextElement>, id: string): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1;
}

export {
    renamePresentationTypeTitle,
    addSlides,
    removeSlide,
    moveSlide,
    addSlideElement,
    removeSlideElment,
    moveSlideElement,
    resizeElement,
    changeText,
    changeTextSize,
    changeTextFamily,
    changeBackgroundSlide,
};
