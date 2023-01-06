import React, { useState } from 'react'
import ModalComponent from './ModalComponent'
import {PropTypes} from 'prop-types'
import '../../styles/sub-components/UsernamePrompt.css'
import { useUserContext } from '../../contexts/UserContextProvider'
import { useNavigate } from 'react-router-dom'


function UsernamePrompt({showUsernamePrompt}) {
  const navigate = useNavigate()
  const {updateUsername} = useUserContext()
  const [usernameInput, setUsernameInput] = useState('')

  const handleUsernameInput = (e) => {
    setUsernameInput(e.target.value)
  }

  const handleFormSubmission = (e) => {
    e.preventDefault()
    updateUsername(usernameInput)
    return navigate('/menu')

  }

  return (showUsernamePrompt &&
    <div 
      id="UsernamePrompt" 
      className="UsernamePrompt">
      <ModalComponent 
        handleModalDisplayed={() => {}} 
        size={{height: '80%', width: '80%'}} 
        modalDisplayed={true}>
        <div className='name-prompt-modal-content'>
          <div className='name-prompt-header'>
            <h1 className='name-prompt-heading'>Hi There! Please enter a username</h1>
            <h5 className='name-prompt-subtitle'>This will be used to keep track of High-Scores</h5>
          </div>
          <form className='name-prompt-form' onSubmit={handleFormSubmission}>
            <input onInput={handleUsernameInput} value={usernameInput} type="text" name="usernameInput" id="username-input" className='username-input' />
            <button type='button' className='username-input-button' onClick={handleFormSubmission}>Submit</button>
          </form>
        </div>
      </ModalComponent>

    </div>
  )
}

UsernamePrompt.propTypes = {
  showUsernamePrompt: PropTypes.bool.isRequired,

}

export default UsernamePrompt