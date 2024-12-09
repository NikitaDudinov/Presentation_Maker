import { ImageElementType,SlideType } from "./types";
import { v4 as uuidv4 } from 'uuid';


const addImageElement = (slides: SlideType[], selectedSlideId: string, value?: string): SlideType[] => {
    if(selectedSlideId) {
        const newSlides = slides.map(slide => {
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
                    src: value ? value : "/images/picture.avif",
                };
        
                return { ...slide, elements: [...slide.elements, newImageElement] };
            }
            return slide;
        });

        return newSlides
    }

    return slides
}

export { addImageElement };