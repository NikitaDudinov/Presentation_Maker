import { TypedUseSelectorHook, useSelector } from "react-redux"
import { presentationReducer } from "../redux/presentationReducer"

type RootState = ReturnType<typeof presentationReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector,
}