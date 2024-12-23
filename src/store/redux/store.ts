import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import { presentationReducer } from "./presentationReducer";

const store = createStore(presentationReducer, applyMiddleware(thunk))

export {
    store
}