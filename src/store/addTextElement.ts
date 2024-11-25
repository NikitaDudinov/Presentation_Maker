import { PresentationType, TextElementType } from "./types";
import { v4 as uuidv4 } from 'uuid';


const addTextElement = (presentation: PresentationType): PresentationType => {
    const selectedSlideId = presentation.selection.selectedSlideId
    if(selectedSlideId) {
        const newSlides = presentation.slides.map(slide => {
            if (slide.id === selectedSlideId) {
                const textElement: TextElementType = {
                    id: uuidv4(),
                    position: { x: 50, y: 50 },
                    size: { width: 100, height: 50 },
                    type: "text",
                    content: "Новый текст",
                    font: { family: 'Arial', size: 20 }
                };
        
                return { ...slide, elements: [...slide.elements, textElement] };
            }
            return slide;
        });

        return {
            ...presentation,
            slides: newSlides
        }
    }

    return presentation

}

export {
    addTextElement,
}