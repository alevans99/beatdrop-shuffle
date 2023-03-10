import React from 'react'
import '../../styles/pages/MenuPage.css'
import MenuImageButton from '../sub-components/MenuImageButton'
import PlayImage from '../../assets/menu-images/play.png'
import ProgressImage from '../../assets/menu-images/progress.png'
import { useNavigate } from 'react-router-dom'
function MenuPage() {

  const navigate = useNavigate()

  return (
    <div id="MenuPage" className="MenuPage" >
      <div className='menu-container'>
        <div className='menu-play-container' onClick={() => {
          navigate('/level-select')
        }} >
          <MenuImageButton buttonText={'Play'} buttonImage={PlayImage} />
        </div>
        <div className='menu-leaderboards-container' onClick={() => {
          navigate('/leaderboards')
        }}>
          <MenuImageButton buttonText={'Leaderboard'} buttonImage={ProgressImage}/>
        </div>


      </div>
    </div>
  )
}
export default MenuPage