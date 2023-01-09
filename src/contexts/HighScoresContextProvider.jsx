import React, {useState, useContext} from 'react'
import {PropTypes} from 'prop-types'
import { getHighScores } from '../api/api'

const HighScoresContext = React.createContext()

/**
 * Custom hook to use High Scores Context
 */
export function useHighScoresContext() {
  return useContext(HighScoresContext)
}
  
/**
 * Context provider component to wrap all components that need access.
 */
export function HighScoresContextProvider({ children }) {

  const [highScores, setHighScores] = useState(null)
  const [loadingScores, setLoadingScores] = useState(true)

  async function fetchHighScores() {
    try {
      if (!highScores){
        setLoadingScores(true)
        const newScores = await getHighScores()
        setHighScores(newScores)
        setLoadingScores(false)
      }
    } catch (error) {
      console.log(error)
    }

  } 

  async function refreshHighScores() {
    try {
      setLoadingScores(true)
      const newScores = await getHighScores()
      setHighScores(newScores)
      setLoadingScores(false)
    } catch (error) {
      console.log(error)
    }

    
  } 
  
  return (
    <HighScoresContext.Provider value={{ highScores, loadingScores, fetchHighScores, refreshHighScores }}>
      {children}
    </HighScoresContext.Provider>
  )
}

HighScoresContextProvider.propTypes = {
  children: PropTypes.object,
}
  