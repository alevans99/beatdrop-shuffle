import React, {useState, useContext, useEffect} from 'react'
import {PropTypes} from 'prop-types'
import  blankScores from './default-values/defaultScores'
const UserContext = React.createContext()
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }) {

  const [username, setUsername] = useState(null)
  const [scoreId, setScoreId] = useState(null)
  const [userScores, setUserScores] = useState(null)

  function updateUsername(newUsername) {
    localStorage.setItem('username', newUsername)
    setUsername(newUsername)
  }

  function updateUserScores(newScores) {
    localStorage.setItem('userScores', JSON.stringify(newScores))
    setUserScores(newScores)
  }

  /**
   * Checks to see if the user has a new high score
   * @param {*} newScore - The newly achived score from the game
   * @param {*} level - The level the user was playing
   * @returns - An object informing if there is a new high score and its details
   */
  function checkNewUserScore(newScore, level) {
    //Check if the previous lowest score is lower than the new score
    if (userScores[level]['5'].score < newScore){
      //If so, save all level score objects to a new array
      const scoreArrayToSort = [...Object.values(userScores[level])]
      //add the new high score
      scoreArrayToSort.push({score: newScore, user: username, userId: scoreId, timestamp: DateTime.now().toISO()})
      //Sort the array and remove the lowest

      const sortedArray = scoreArrayToSort.sort((a, b) => {
        return b.score - a.score
      })
      sortedArray.pop()
      //create a copy of the existing score object so we can edit
      const newScoresObject = {}
      Object.keys(userScores).forEach((key) => {
        newScoresObject[key] = {...userScores[key]}
      })

      //Update the level to use the new scores
      sortedArray.forEach((score, i) => {
        newScoresObject[level][i + 1] = {...score}
      })

      //Update the scores in state and localstorage
      updateUserScores(newScoresObject)

      return {
        newScoreAchieved: true,
        level,
        newScore
      }
    }
    return {
      newScoreAchieved: false
    }
  }

  useEffect(() => {
    //Set chosen username if present in local storage
    const localUsername = localStorage.getItem('username')
    if (!localUsername) {
      setUsername(null)
    } else {
      setUsername(localUsername)
    }

    //Set or create score Id to track score ownership
    const localScoreId = localStorage.getItem('scoreId')
    if (!localScoreId){
      const newScoreId = uuidv4() + DateTime.now().toUnixInteger()
      localStorage.setItem('scoreId', newScoreId)
      setScoreId(newScoreId)
    } else {
      setScoreId(localScoreId)
    }

    //Populate local scores from storage or create new blank set
    const localUserScores = localStorage.getItem('userScores')
    if (!localUserScores) {
      updateUserScores(blankScores)
    } else {
      setUserScores(JSON.parse(localUserScores))
    }

  }, [])
  
  return (
    <UserContext.Provider value={{ username, updateUsername, userScores, updateUserScores, checkNewUserScore, scoreId}}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.object,
}
  