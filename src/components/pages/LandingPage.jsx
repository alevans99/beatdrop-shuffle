import React, {useState } from 'react'
import '../../styles/pages/LandingPage.css'
import leftImage from '../../assets/char_select_fox.png'
import rightImage from '../../assets/char_select_penguin_flipped.png'
import { useNavigate } from 'react-router-dom'
import UsernamePrompt from '../sub-components/UsernamePrompt'
import { useUserContext } from '../../contexts/UserContextProvider'

function LandingPage() {
  const navigate = useNavigate()
  const {username} = useUserContext()
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false)

  const handleLandingButtonClick = () => {
    if (username === null){
      setShowUsernamePrompt(true)
    } else {
      return navigate('/menu')
    }

  }
  //Check if user has profile on first load
  // useEffect(() => {
  //   if (username === null){
  //     setShowUsernamePrompt(true)
  //   }
  // }, [username])

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
        <button onClick={() => {
          handleLandingButtonClick()
        }} className='landing-start-button'>START</button>
      </div>
      <UsernamePrompt showUsernamePrompt={showUsernamePrompt}></UsernamePrompt>
    </div>
  )
}
export default LandingPage