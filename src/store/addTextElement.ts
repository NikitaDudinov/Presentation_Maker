import { PresentationType, TextElementType } from "./types";
import { v4 as uuidv4 } from 'uuid';


const addTextElement = (presenattion: PresentationType, newText: string): PresentationType => {
    
    const selectedSlideId = presenattion.selection.selectedSlideId

    if(selectedSlideId) {
        const newSlides = presenattion.slides.map(slide => {
            if (slide.id === selectedSlideId) {
                const textElement: TextElementType = {
                    id: uuidv4(),
                    position: { x: 50, y: 50 },
                    size: { width: 100, height: 50 },
                    type: "text",
                    content: newText,
                    font: { family: 'Arial', size: 20 }
                };
        
                return { ...slide, elements: [...slide.elements, textElement] };
            }
            return slide;
        });

        return {
            ...presenattion,
            slides: newSlides,
        }
    }

    return presenattion
}

export {
    addTextElement,
}