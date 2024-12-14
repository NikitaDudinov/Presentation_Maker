import { useDispatch } from 'react-redux'
import  ActionCreators  from '../redux/actionCreators'
import { bindActionCreators } from 'redux'

const useAppActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}

export {
    useAppActions,
}