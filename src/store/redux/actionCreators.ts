import * as SlideActionCreators from './slideActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as PresentationActionCreators from './presentationActionCreators'

export default {
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...PresentationActionCreators,
}