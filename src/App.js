import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/pages/LandingPage'

function App() {
  return (
    <BrowserRouter>

      <div id="App" className="App">
        <Routes>
          <Route
            path='/'
            element={<LandingPage/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App