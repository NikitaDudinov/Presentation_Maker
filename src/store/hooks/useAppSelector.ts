import { TypedUseSelectorHook, useSelector } from "react-redux"
import { presentationReducer } from "../../store/redux/presentationReducer"

// Выведение типа `RootState` из хранилища
type RootState = ReturnType<typeof presentationReducer>

// Используйте во всем приложении вместо `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector,
}