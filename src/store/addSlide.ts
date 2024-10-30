import { PresentationType } from "./types";
import { v4 as uuidv4 } from 'uuid';

const addSlide = (presentation: PresentationType): PresentationType => {
    const slideId = uuidv4();
    
    return {
        ...presentation,
        slides: [
            ...presentation.slides,
            {
                id: slideId,
                background: '#FFFFFF',
                elements: []
            }
        ],
        selection: {
            ...presentation.selection,
            selectedSlideId: presentation.slides.length === 0 
            ? slideId 
            : presentation.selection.selectedSlideId
        }
    };
}

export { 
    addSlide,
}