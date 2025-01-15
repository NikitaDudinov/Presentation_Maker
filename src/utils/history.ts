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
        if(!deepEqual(editor, previousEditor)){
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
        }
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

function deepEqual<T>(obj1: T, obj2: T): boolean {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
    }
    const keys1 = Object.keys(obj1) as Array<keyof T>;
    const keys2 = Object.keys(obj2) as Array<keyof T>;
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}

export {
    type HistoryType,
    initHistory
}