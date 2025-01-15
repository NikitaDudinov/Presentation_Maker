import { Store } from "redux";
import { PresentationType } from "../store/types";
import { saveToLocalStorage } from "../store/localStorage/saveToLocalStorage";

type HistoryType = {
    undo: () => PresentationType | undefined,
    redo: () => PresentationType | undefined,
}

function getLastItem(stack: Array<PresentationType>): PresentationType {
    return stack[stack.length - 1]
} 

function initHistory(store: Store<PresentationType>): HistoryType {
    const undoStack: Array<PresentationType> = []
    let redoStack: Array<PresentationType> = []

    let previousEditor = store.getState()

    store.subscribe(() => {
        const editor = store.getState()
        saveToLocalStorage(editor)
        if (!undoStack.length || previousEditor !== editor) {
            if (editor == getLastItem(undoStack)) {
                undoStack.pop()
                redoStack.push(previousEditor)
            } else if (editor == getLastItem(redoStack)) {
                redoStack.pop()
                undoStack.push(previousEditor)
            } else {
                undoStack.push(previousEditor)
                redoStack = []
            }
        }
        previousEditor = editor
    })

    function undo() {
        return getLastItem(undoStack)
    }

    function redo() {
        return getLastItem(redoStack)
    }

    return {
        undo,
        redo,
    }
}

export {
    type HistoryType,
    initHistory
}