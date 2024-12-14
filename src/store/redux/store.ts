import { legacy_createStore as createStore } from "redux";
import { presentationReducer } from "./presentationReducer";

const store = createStore(presentationReducer)

export {
    store
}