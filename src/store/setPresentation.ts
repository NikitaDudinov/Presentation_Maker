
import { PresentationType} from "./types"

const setPresentation = (
    presentation: PresentationType, 
    payload: { newPresentation: PresentationType }
): PresentationType => {
    console.log(payload.newPresentation)
    return payload.newPresentation
}

export {
    setPresentation,
}