import React, { Component, Suspense } from 'react'
// import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import Routes from './components/routes'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
class App extends Component {
  render() {
    return (
      <Suspense fallback={loading}>
        
        <Routes />
      </Suspense>
    )
  }
}

export default App
