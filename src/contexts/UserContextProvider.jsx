import React, {useState, useContext} from 'react'
import {PropTypes} from 'prop-types'

const UserContext = React.createContext()


export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }) {

  const [username, setUsername] = useState(null)

  function updateUsername(newUsername) {
    setUsername(newUsername)
  } 
  
  return (
    <UserContext.Provider value={{ username, updateUsername }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.object,
}
  