import React, {useState, useContext, useEffect} from 'react'
import {PropTypes} from 'prop-types'
import { getRecordScores, postNewRecordScore } from '../api/api'

const RecordScoresContext = React.createContext()

/**
 * Custom hook to use Record Scores Context
 */
export function useRecordScoresContext() {
  return useContext(RecordScoresContext)
}
  
/**
 * Context provider component to wrap all components that need access.
 */
export function RecordScoresContextProvider({ children }) {

  const [recordScores, setRecordScores] = useState(null)
  const [loadingScores, setLoadingScores] = useState(true)

  async function fetchRecordScores() {
    try {
      if (!recordScores){
        setLoadingScores(true)
        const newScores = await getRecordScores()
        setRecordScores(newScores)
        setLoadingScores(false)
      }
    } catch (error) {
      console.log(error)
    }

  } 

  async function refreshRecordScores() {
    try {
      setLoadingScores(true)
      const newScores = await getRecordScores()
      setRecordScores(newScores)
      setLoadingScores(false)
    } catch (error) {
      console.log(error)
    }
  }

  function localCheckForRecordScore(newScore, level){
    if (recordScores && recordScores[level] !== undefined){
      if (recordScores[level][5].score < newScore){
        return  {newWorldRecord: true}
      } 
      return  {newWorldRecord: false}
      
    }
    return {newWorldRecord: false}
  }


  async function postARecordScore(newScore, level){
    if (recordScores){
      try {
        if (recordScores[level][5].score < newScore.score){

          const updatedScores = await postNewRecordScore(newScore, level)
          setRecordScores(updatedScores)
          return true
        } 
      } catch (error) {
        console.log(error, ' Error submitting new record score')
        return false
      }
    } 
    return false
  }


  //Get record scores on first load
  useEffect(() => { 
    fetchRecordScores()
  }, [])
  
  return (
    <RecordScoresContext.Provider value={{ recordScores, loadingScores, fetchRecordScores, refreshRecordScores, localCheckForRecordScore, postARecordScore}}>
      {children}
    </RecordScoresContext.Provider>
  )
}

RecordScoresContextProvider.propTypes = {
  children: PropTypes.object,
}
  