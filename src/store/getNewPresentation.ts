import { PresentationType } from "./types"

const getNewPresentation = (
    presentation: PresentationType,
    payload: { newPresentation: PresentationType }
): PresentationType => {
    if(payload.newPresentation !== null){
        return payload.newPresentation
    }
    return presentation
}

export {
    getNewPresentation,
}