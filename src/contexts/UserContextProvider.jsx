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
    <UserContext.Provider value={{ username, updateUsername, userScores, updateUserScores }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.object,
}
  