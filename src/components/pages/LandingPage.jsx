import React from 'react'
import '../../styles/LandingPage.css'
import leftImage from '../../assets/char_select_fox.png'
import rightImage from '../../assets/char_select_penguin_flipped.png'
function LandingPage() {
  return (
    <div id="LandingPage" className="LandingPage" >
      <div className='landing-container'>
        <div className='landing-image-container-left'>
          <img className='landing-image-left' src={leftImage}></img>
        </div>
        <div className='landing-title-container'>
          <h1 id='main-title-1'>{'Beat'}</h1>
          <h1 id='main-title-2'>{'Drop'}</h1>
        </div>
        <div className='landing-image-container-right'>
          <img className='landing-image-right' src={rightImage}></img>
        </div>

      </div>
      <div className='landing-button-container'>
        <button className='landing-start-button'>START</button>
      </div>
    </div>
  )
}
export default LandingPage