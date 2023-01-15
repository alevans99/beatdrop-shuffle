import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/pages/LandingPage'
import cityBackground from './assets/city-background'
import MenuPage from './components/pages/MenuPage'
import LevelSelectPage from './components/pages/LevelSelectPage'
import GamePage from './components/pages/GamePage'
import { GameContextProvider } from './contexts/GameContextProvider'
import { UserContextProvider } from './contexts/UserContextProvider'
import { RecordScoresContextProvider } from './contexts/RecordScoresContextProvider'
import LeaderboardsPage from './components/pages/LeaderboardsPage'
function App() {

  return (
    <UserContextProvider>
      <GameContextProvider>
        <RecordScoresContextProvider>
          <BrowserRouter>
            <div id="App" className="App" style={{ backgroundImage: `url(${cityBackground})`, height: '100vh'}}>
              <Routes>
                <Route
                  path='/'
                  element={<LandingPage/>}
                />
                <Route
                  path='/menu'
                  element={<MenuPage/>}
                />

                <Route
                  path='/level-select'
                  element={<LevelSelectPage/>}
                />

                <Route
                  path='/game'
                  element={<GamePage/>}
                />

                <Route
                  path='/leaderboards'
                  element={<LeaderboardsPage/>}
                />
              </Routes>
              
            </div>
          </BrowserRouter>
        </RecordScoresContextProvider>
      </GameContextProvider>
    </UserContextProvider>
  )
}
export default App