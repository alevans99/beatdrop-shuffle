import React from 'react'
import ModalComponent from './ModalComponent'
import {PropTypes} from 'prop-types'
import '../../styles/sub-components/UsernamePrompt.css'


function UsernamePrompt({showUsernamePrompt}) {

  return (showUsernamePrompt &&
    <div 
      id="UsernamePrompt" 
      className="UsernamePrompt">
      <ModalComponent 
        handleModalDisplayed={() => {}} 
        size={{height: '80%', width: '80%'}} 
        modalDisplayed={true}>
        <div className='name-prompt-modal-content'>
          <h1 className='name-prompt-heading'>Hi There! Please enter a username</h1>
          <h5 className='name-prompt-subtitle'>This will be used to keep track of High-Scores</h5>
        </div>
      </ModalComponent>

    </div>
  )
}

UsernamePrompt.propTypes = {
  showUsernamePrompt: PropTypes.bool.isRequired,

}

export default UsernamePrompt