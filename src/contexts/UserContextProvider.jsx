import React, {useState, useContext, useEffect} from 'react'
import {PropTypes} from 'prop-types'
import  blankScores from './default-values/defaultScores'
const UserContext = React.createContext()


export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }) {

  const [username, setUsername] = useState(null)
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

    //Get an array of high scores for the level
    const existingScores = userScores[level] !== undefined ? [...Object.values(userScores[level])] : []

    //Check if the new score is higher than at least one of the previous scores
    if (existingScores[4] < newScore){
      let newScoreIndex = 0
      //Create a new object to store in state
      const newScoresObject = {}
      Object.keys(userScores).forEach((key) => {
        newScoresObject[key] = {...userScores[key]}
      })
      //Update the level array with the new top 5 scores
      for (let i = 0; i < existingScores.length; i++){
        if (existingScores[i] < newScore){
          existingScores.splice(i, 0, newScore)
          newScoreIndex = i
          break
        }
      }
      //Remove the previous lowest score
      existingScores.pop()

      existingScores.forEach((score, i) => {
        newScoresObject[level][i + 1] = score
      })
  
      //Update the scores in state and localstorage
      updateUserScores(newScoresObject)

      return {
        newScoreAchived: true,
        level,
        newScore,
        newScorePosition: newScoreIndex + 1
      }
    }

    return {
      newScoreAchived: false
    }
  }


  useEffect(() => {
    //Set the username and scores from local storage
    const localUsername = localStorage.getItem('username')
    if (!localUsername) {
      setUsername(null)
    } else {
      setUsername(localUsername)
    }

    const localUserScores = localStorage.getItem('userScores')
    if (!localUserScores) {
      updateUserScores(blankScores)
    } else {
      setUserScores(JSON.parse(localUserScores))
    }

  }, [])
  
  return (
    <UserContext.Provider value={{ username, updateUsername, userScores, updateUserScores, checkNewUserScore }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.object,
}
  