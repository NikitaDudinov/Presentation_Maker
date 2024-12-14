import * as SlideActionCreators from './slideActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as TitleActionCreators from './titleActionCreators'

export default {
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...TitleActionCreators,
}