import { PresentationType } from "../store/types"
import { v4 as uuidv4 } from 'uuid';
const minPresentation: PresentationType = {
    title: 'Минимальная презентация',
    selection: {
        selectedSlideId: '',
        elementsId: []
    },
    slides: []
}

const maxPresentation: PresentationType = {
    title: 'Презентация с данными', 
    selection: {
        selectedSlideId: 'slide-1',
        elementsId: []
    },
    slides: [
        {
            id: 'slide-1',
            background: '#FFFFFF',
            elements: [
                {
                    id: 'text-1',
                    position: {
                        x: 300,
                        y: 10
                    },
                    size: {
                        width: 40,
                        height: 40
                    },
                    type: "text",
                    content: "Текст слайда",
                    font: {
                        family: 'Arial',
                        size: 20
                    }  
                },
                {
                    id: 'text-2',
                    position: {
                        x: 600,
                        y: 300,
                    },
                    size: {
                        width: 48,
                        height: 60
                    },
                    type: "text",
                    content: "Текст второго элемента",
                    font: {
                        family: 'Calibri',
                        size: 14
                    }  
                },
            ]
        },
        {
            id: 'slide-2',
            background: '#FF3F44',
            elements: [
                {
                    id: 'text-3',
                    position: {
                        x: 300,
                        y: 100
                    },
                    size: {
                        width: 10,
                        height: 30
                    },
                    type: "text",
                    content: "Текст слайда",
                    font: {
                        family: 'Arial',
                        size: 20
                    }  
                },
                {
                    id: 'image-1',
                    position: {
                        x: 500,
                        y: 250,
                    },
                    size: {
                        width: 300,
                        height: 150
                    },
                    type: "image",
                    src: "/images/picture.avif",
                },
                {
                    id: 'image-2',
                    position: {
                        x: 100,
                        y: 250,
                    },
                    size: {
                        width: 300,
                        height: 150
                    },
                    type: "image",
                    src: "/images/picture.avif",
                },
            ]
        },
        {
            id: 'slide-3',
            background: 'green',
            elements: [
                {
                    id: 'text-4',
                    position: {
                        x: 300,
                        y: 10
                    },
                    size: {
                        width: 10,
                        height: 30
                    },
                    type: "text",
                    content: "Текст слайда",
                    font: {
                        family: 'Arial',
                        size: 20
                    }  
                },
                {
                    id: 'text-5',
                    position: {
                        x: 600,
                        y: 300,
                    },
                    size: {
                        width: 48,
                        height: 60
                    },
                    type: "text",
                    content: "Текст второго элемента",
                    font: {
                        family: 'Calibri',
                        size: 14
                    }  
                },
            ]
        },
    ]
}

export {
    minPresentation,
    maxPresentation
}