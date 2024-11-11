import {maxPresentation} from './data.ts'
import { getFromLocalStorage } from './localStorage/getFromLocalStorage.ts';
import { saveToLocalStorage } from './localStorage/saveToLocalStorage.ts';
import { PresentationType } from './types'


let _presentation = getFromLocalStorage() ? getFromLocalStorage() :  maxPresentation
let _handler: Function | null = null;

function getPresentation() {
    return _presentation
}

function setPresentation(newPresentation: PresentationType) {
    _presentation = newPresentation
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newPresentation = modifyFn(_presentation, payload)
    setPresentation(newPresentation)
    saveToLocalStorage(newPresentation)
    if (_handler) {
        _handler()
    }
}

function addPresentationChangeHandler(handler: Function): void {
    _handler = handler
}

export {
    getPresentation,
    dispatch,
    addPresentationChangeHandler,
}