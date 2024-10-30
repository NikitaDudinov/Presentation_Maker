import {maxPresentation} from './data.ts'
import { PresentationType } from './types'

let _presentation = maxPresentation
let _handler: Function | null = null;

function getPresentation() {
    return _presentation
}

function setPresentation(newPresentation: PresentationType) {
    _presentation = newPresentation
}

function dispatch(modifyFn: Function, payload?: Object): void {
    console.log(payload)
    const newPresentation = modifyFn(_presentation, payload)
    setPresentation(newPresentation)

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