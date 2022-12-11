import React, {useState, useContext} from 'react'
import {PropTypes} from 'prop-types'

const GameContext = React.createContext()

/**
 * Custom hook to use Game Context
 */
export function useGameContext() {
  return useContext(GameContext)
}
  
/**
 * Context provider component to wrap all components that need access.
 */
export function GameContextProvider({ children }) {

  const [levelSelected, setLevelSelected] = useState(null)
  function selectLevel(newLevel) {
    setLevelSelected(newLevel)
  } 
  
  return (
    <GameContext.Provider value={{ levelSelected, selectLevel }}>
      {children}
    </GameContext.Provider>
  )
}

GameContextProvider.propTypes = {
  children: PropTypes.object,
}
  