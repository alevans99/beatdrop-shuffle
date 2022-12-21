import React, { useState } from 'react'
import ModalComponent from '../sub-components/modalComponent'
import {PropTypes} from 'prop-types'

function UsernamePrompt({showUsernamePrompt}) {

  const [modalDisplayed, setModalDisplayed] = useState(true)
  const handleModalDisplayed = () => {
    setModalDisplayed((previousState) => {
      return !previousState
    })
  }
  return (showUsernamePrompt &&
    <div 
      id="UsernamePrompt" 
      className="UsernamePrompt">
      <ModalComponent 
        handleModalDisplayed={handleModalDisplayed} 
        size={{height: '80%', width: '80%'}} 
        modalDisplayed={modalDisplayed}>
        <p>Hello There Mr Modal</p>
      </ModalComponent>

    </div>
  )
}

UsernamePrompt.propTypes = {
  showUsernamePrompt: PropTypes.bool.isRequired,

}

export default UsernamePrompt