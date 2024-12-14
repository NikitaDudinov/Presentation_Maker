import { Store } from "redux";
import { PresentationType } from "../store/types";

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

    let previousPresentation = store.getState()

    store.subscribe(() => {
        const presentation = store.getState()
        if (!undoStack.length || presentation != presentation) {
            if (presentation == getLastItem(undoStack)) {
                undoStack.pop()
                redoStack.push(previousPresentation)
            } else if (presentation == getLastItem(redoStack)) {
                redoStack.pop()
                undoStack.push(previousPresentation)
            } else {
                undoStack.push(previousPresentation)
                redoStack = []
            }
        }
        previousPresentation = presentation
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