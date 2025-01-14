import { v4 as uuidv4 } from 'uuid';
import { SlideType } from '../types';

function createNewSlide(theme: string | null): SlideType {
    console.log('hihihi')
    console.log(theme);
    return {
        id: uuidv4(),
        elements: [],
        background: theme == null ? 'white' : theme
    }
}

export {
    createNewSlide,
}