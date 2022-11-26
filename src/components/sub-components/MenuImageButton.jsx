import React, { useState } from 'react'
import '../../styles/sub-components/MenuImageButton.css'
import {PropTypes} from 'prop-types'
function MenuImageButton({buttonText, buttonImage}) {
  const [buttonHover, setButtonHover] = useState(false)

  const handleButtonHover = (hoverState) =>{
    setButtonHover(() => {
      console.log('setting hover state' , hoverState)
      return hoverState
    })
  } 

  return (
    <div id="MenuImageButton" className="MenuImageButton" >
      <div className='button-image-container'>
        <img className='button-image' src={buttonImage}></img>
        <div className='button-image-overlay'
          onMouseEnter={() => {handleButtonHover(true)}}
          onMouseLeave={() => {handleButtonHover(false)}}
        >  
          <h2 className={`button-text ${buttonHover ? '' : 'hidden'}`}>{buttonText}</h2>
        </div>
      </div>

    </div>
  )
}

MenuImageButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonImage: PropTypes.string.isRequired,
}

export default MenuImageButton