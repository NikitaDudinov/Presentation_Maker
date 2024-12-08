import { PresentationType } from "../types"

function changePresentationTitle(presentation: PresentationType, newTitle: string): PresentationType {
    return {
        ...presentation,
        title: newTitle
    }
}

export {
    changePresentationTitle,
}