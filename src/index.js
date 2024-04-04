import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './views/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>,
  </BrowserRouter>
    </ErrorBoundary>
)
reportWebVitals()
