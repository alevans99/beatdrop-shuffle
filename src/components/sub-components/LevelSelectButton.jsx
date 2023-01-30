import React, { useState } from 'react'
import '../../styles/sub-components/LevelSelectButton.css'
import {PropTypes} from 'prop-types'
import padlock from '../../assets/padlock.png'
import { useGameContext } from '../../contexts/GameContextProvider'
import { useNavigate } from 'react-router-dom'
function LevelSelectButton({buttonText, buttonImage, locked, levelNumber}) {

  const navigate = useNavigate()
  const {selectLevel} = useGameContext()
  const [buttonHover, setButtonHover] = useState(false)

  const handleButtonHover = (hoverState) =>{
    setButtonHover(() => {
      return hoverState
    })
  } 
  return (
    <div className={`level-select-${levelNumber} LevelSelectButton`}  onClick={() => {
      selectLevel(levelNumber)
      navigate('/game')
    }}>
      <div className='button-image-container'>
        <img className={`button-image ${locked ? 'locked' : ''}` } src={buttonImage} ></img>
        <div className='button-image-overlay'
          onMouseEnter={() => {handleButtonHover(true)}}
          onMouseLeave={() => {handleButtonHover(false)}}
        > 
          <img className={`level-select-locked-image ${locked ? '' : 'hidden'}`} src={padlock}></img>
          <h2 className={`button-text ${buttonHover && !locked ? '' : 'hidden'}`}>{buttonText}</h2>

        </div>
      </div>

    </div>
  )
}

LevelSelectButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonImage: PropTypes.string.isRequired,
  locked: PropTypes.bool.isRequired,
  levelNumber: PropTypes.number.isRequired
}

export default LevelSelectButton