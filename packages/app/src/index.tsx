import ReactDOM from 'react-dom/client'
import { App } from './components/app'
import { setupCookieConset } from './setup-cookies'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import './animate.css'
import './global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

window.addEventListener('load', setupCookieConset)
