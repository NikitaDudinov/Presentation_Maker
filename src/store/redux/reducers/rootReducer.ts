import { combineReducers } from "redux"
import { slidesReducer } from "./slidesReducer"
import { titleReducer } from "./titleReducer"
import { selectionReducer } from "./selectionReducer"

const rootReducer = combineReducers({ 
    title: titleReducer, 
    slides: slidesReducer, 
    selection: selectionReducer,
})

export {
    rootReducer,
}
