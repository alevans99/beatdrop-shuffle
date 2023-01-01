import React, {useState, useContext, useEffect} from 'react'
import {PropTypes} from 'prop-types'

const UserContext = React.createContext()


export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }) {

  const [username, setUsername] = useState(null)

  function updateUsername(newUsername) {
    localStorage.setItem('username', newUsername)
    setUsername(newUsername)
  }


  useEffect(() => {
    const localUsername = localStorage.getItem('username')
    if (!localUsername) {
      setUsername(null)
    } else {
      setUsername(localUsername)
    }
  }, [])
  
  return (
    <UserContext.Provider value={{ username, updateUsername }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.object,
}
  