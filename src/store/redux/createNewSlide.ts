import { v4 as uuidv4 } from 'uuid';
import { SlideType } from '../types';

function createNewSlide(): SlideType {
    return {
        id: uuidv4(),
        elements: [],
        background: '#ffffff',
    }
}

export {
    createNewSlide,
}