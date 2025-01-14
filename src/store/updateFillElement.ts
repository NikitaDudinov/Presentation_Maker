import { PresentationType } from "./types";

export const updateFillElement = (state: PresentationType, color: string): PresentationType => {
    const { selection, slides } = state;
    
    return {
        ...state,
        slides: slides.map(slide => ({
            ...slide,
            elements: slide.elements.map(element => 
                selection.elementsId.includes(element.id) 
                    ? { ...element, fill: color }
                    : element
            )
        }))
    };
}; 