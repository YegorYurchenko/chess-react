import { createRoot } from 'react-dom/client'
import App from './components/app/app'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './styles/app.scss'

const container = document.getElementById('root')

if (container) {
    const root = createRoot(container)
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    )
}
