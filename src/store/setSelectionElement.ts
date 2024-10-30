import { PresentationType} from "./types"

const setSelectionElement = (
    presentation: PresentationType, 
    selectedItemId: string
): PresentationType => {

    return {
        ...presentation,
        selection: {
            ...presentation.selection,
            elementsId: [selectedItemId]
        }
    }
}

export {
    setSelectionElement,
}