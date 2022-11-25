import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/pages/LandingPage'
import cityBackground from './assets/city-background'

function App() {
  return (
    <BrowserRouter>

      <div id="App" className="App" style={{ backgroundImage: `url(${cityBackground})`, height: '100vh'}}>
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