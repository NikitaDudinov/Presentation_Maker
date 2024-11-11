import { PresentationType} from "./types"

const deleteSelectionElement = (
    presentation: PresentationType, 
): PresentationType => {
    
    return {
        ...presentation,
        selection: {
            ...presentation.selection,
            elementsId: []
        }
    }
}

export {
    deleteSelectionElement,
}