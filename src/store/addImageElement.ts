import { PresentationType, ImageElementType } from "./types";
import { v4 as uuidv4 } from 'uuid';

const addImageElement = (presentation: PresentationType): PresentationType => {
    const selectedSlideId = presentation.selection.selectedSlideId;

    if (selectedSlideId) {
        const newSlides = presentation.slides.map(slide => {
            if (slide.id === selectedSlideId) {
                const newImageElement: ImageElementType = {
                    id: uuidv4(), 
                    position: {
                        x: 100,
                        y: 100,
                    },
                    size: {
                        width: 300,
                        height: 150,
                    },
                    type: "image",
                    src: "picture.avif",
                };

                return {
                    ...slide,
                    elements: [...slide.elements, newImageElement],
                };
            }
            return slide;
        });

        return {
            ...presentation,
            slides: newSlides
        };
    }

    return presentation;
};

export { addImageElement };