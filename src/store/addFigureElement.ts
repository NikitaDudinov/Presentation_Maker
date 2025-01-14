import { FigureElementType, FigureType, PresentationType } from "./types";
import { v4 as uuidv4 } from 'uuid';

const addFigureElement = (presentation: PresentationType, figure: FigureType): PresentationType => {

    const selectedSlideId = presentation.selection.selectedSlideId;

    if(selectedSlideId) {
        const newSlides = presentation.slides.map(slide => {
            if (slide.id === selectedSlideId) {
                const newFigureElement : FigureElementType = {
                    id: uuidv4(),
                    position: {
                        x: 100,
                        y: 100,
                    },
                    size: {
                        width: 150,
                        height: 150,
                    },
                    type: "figure",
                    figureType: figure,
                    fill: '#000000',
                };
        
                return { ...slide, elements: [...slide.elements, newFigureElement] };
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

export { addFigureElement };