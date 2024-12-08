import { createRoot } from 'react-dom/client';
import {StrictMode} from 'react'
import { Provider } from 'react-redux'
import { store } from './store/redux/store.ts';
import App from './App'

const root = createRoot(document.getElementById('root')!)
root.render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)


