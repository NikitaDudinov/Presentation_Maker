import { PresentationType } from "./types"

const renamePresentationTitle = (
    presentation: PresentationType,
    newTitle: string
): PresentationType => {
    return {
        ...presentation,
        title: newTitle,
    }
}

export {
    renamePresentationTitle,
}