import ReactDOM from 'react-dom/client'
import {StrictMode} from 'react'

import App from './App'
import { addPresentationChangeHandler, getPresentation } from './store/presentation'

const root = ReactDOM.createRoot(document.getElementById('root')!)
function render() {
  root.render(
      <StrictMode>
          <App presentation={getPresentation()}/>
      </StrictMode>,
  )
}

addPresentationChangeHandler(render);
render()


