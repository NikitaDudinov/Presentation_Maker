import { TitleActionType } from "../actions"

function changePresentationTitle(title: string) {
    return {
        type: TitleActionType.CHANGE_PRESENTATION_TITLE,
        payload: title,
    }
}

export {
    changePresentationTitle
}