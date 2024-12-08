import { SelectionType } from "../types";
import { ActionType } from "./actions";

function setSelection(newSelection: SelectionType) {
    return {
        type: ActionType.SET_SELECTION,
        payload: newSelection,
    }
}

export {
    setSelection,
}