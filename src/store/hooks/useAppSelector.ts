import { TypedUseSelectorHook, useSelector } from "react-redux"
import { rootReducer } from "../redux/reducers/rootReducer"

type RootState = ReturnType<typeof rootReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector,
}