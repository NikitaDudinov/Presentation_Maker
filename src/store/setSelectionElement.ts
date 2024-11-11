import { PresentationType} from "./types"

const setSelectionElement = (
    presentation: PresentationType, 
    payload: { selectedItemId: string }
): PresentationType => {
    const isAlreadySelect = presentation.selection.elementsId.find(item => item === payload.selectedItemId)
    return {
        ...presentation,
        selection: {
            ...presentation.selection,
            elementsId: isAlreadySelect ? [] : [payload.selectedItemId]
        }
    }
}

export {
    setSelectionElement,
}