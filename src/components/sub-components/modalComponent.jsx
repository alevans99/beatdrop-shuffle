import React, { useRef } from 'react'
import '../../styles/sub-components/ModalComponent.css'
import {PropTypes} from 'prop-types'
function ModalComponent({children, size, handleModalDisplayed, modalDisplayed}) {
  const modalRef = useRef()
  return (
    <div 
      id="ModalComponent" 
      className={
        `ModalComponent ${modalDisplayed ? 'fade-in' : 'fade-out'}`}
      onAnimationEnd={(t) => {
        if (t.animationName === 'fade-out'){
          modalRef.current.classList.add('hide-modal')
        }
      }}
      onAnimationStart={(t) => {
        if (t.animationName === 'fade-in'){
          modalRef.current.classList.remove('hide-modal')
          console.log('Starting fade in')
        }
      }}
      ref={modalRef}
    >
      <div className={'modal-content-container'}  style={{height: size.height, width: size.width}}>
        {children}
      </div>
    </div>
  )
}

ModalComponent.propTypes = {
  children: PropTypes.object.isRequired,
  size: PropTypes.object.isRequired,
  handleModalDisplayed: PropTypes.func.isRequired,
  modalDisplayed: PropTypes.bool.isRequired,
}

export default ModalComponent