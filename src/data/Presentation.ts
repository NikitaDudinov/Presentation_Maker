import { TPresentation } from "../types/types"

const minPresentation: TPresentation = {
    title: '',
    select: {
        elementsId: []
    },
    slides: []
}

const maxPresentation: TPresentation = {
    title: 'Презентация с данными', 
    select: {
        elementsId: ['1','2','3']
    },
    slides: [
        {
            id: '1',
            background: '#FFFFFF',
            elements: [
                {
                    id: '1',
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
                    id: '2',
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
            id: '2',
            background: '#FF3F44',
            elements: [
                {
                    id: '1',
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
                    id: '2',
                    position: {
                        x: 500,
                        y: 250,
                    },
                    size: {
                        width: 300,
                        height: 150
                    },
                    type: "image",
                    src: "picture.avif",
                },
                {
                    id: '3',
                    position: {
                        x: 100,
                        y: 250,
                    },
                    size: {
                        width: 300,
                        height: 150
                    },
                    type: "image",
                    src: "picture.avif",
                },
            ]
        },
        {
            id: '3',
            background: 'green',
            elements: [
                {
                    id: '1',
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
                    id: '2',
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
            id: '4',
            background: '#FF3F44',
            elements: [
                {
                    id: '1',
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
                    id: '2',
                    position: {
                        x: 500,
                        y: 250,
                    },
                    size: {
                        width: 300,
                        height: 150
                    },
                    type: "image",
                    src: "picture.avif",
                },
                {
                    id: '3',
                    position: {
                        x: 100,
                        y: 250,
                    },
                    size: {
                        width: 300,
                        height: 150
                    },
                    type: "image",
                    src: "picture.avif",
                },
            ]
        },
        {
            id: '5',
            background: 'yellow',
            elements: [
                {
                    id: '1',
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
                    id: '2',
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
            id: '6',
            background: '#FF3F44',
            elements: [
                {
                    id: '1',
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
                    id: '2',
                    position: {
                        x: 500,
                        y: 250,
                    },
                    size: {
                        width: 300,
                        height: 150
                    },
                    type: "image",
                    src: "picture.avif",
                },
                {
                    id: '3',
                    position: {
                        x: 100,
                        y: 250,
                    },
                    size: {
                        width: 300,
                        height: 150
                    },
                    type: "image",
                    src: "picture.avif",
                },
            ]
        },
        {
            id: '7',
            background: '#FFFFFF',
            elements: [
                {
                    id: '1',
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
                    id: '2',
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
            id: '8',
            background: '#FF3F44',
            elements: [
                {
                    id: '1',
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
                    id: '2',
                    position: {
                        x: 500,
                        y: 250,
                    },
                    size: {
                        width: 300,
                        height: 150
                    },
                    type: "image",
                    src: "picture.avif",
                },
                {
                    id: '3',
                    position: {
                        x: 100,
                        y: 250,
                    },
                    size: {
                        width: 300,
                        height: 150
                    },
                    type: "image",
                    src: "picture.avif",
                },
            ]
        },
    ]
}

export {
    minPresentation,
    maxPresentation
}