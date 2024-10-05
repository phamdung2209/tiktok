import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './components/GlobalStyles'
import { UserProvider } from '~/hooks/userContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <UserProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </UserProvider>
    </React.StrictMode>,
)

reportWebVitals()
