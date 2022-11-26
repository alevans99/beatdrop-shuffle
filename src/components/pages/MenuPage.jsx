import React from 'react'
import '../../styles/pages/MenuPage.css'
import MenuImageButton from '../sub-components/MenuImageButton'
import PlayImage from '../../assets/menu-images/play.png'
import ProgressImage from '../../assets/menu-images/progress.png'

function MenuPage() {
  return (
    <div id="MenuPage" className="MenuPage" >
      <div className='menu-container'>
        <div className='menu-play-container'>
          <MenuImageButton buttonText={'Play'} buttonImage={PlayImage}/>
        </div>
        <div className='menu-leaderboards-container'>
          <MenuImageButton buttonText={'Leaderboard'} buttonImage={ProgressImage}/>
        </div>
        <div className='menu-progress-container'>
          <MenuImageButton buttonText={'Progress'} buttonImage={ProgressImage}/>
        </div>
        <div className='menu-help-container'>
          <MenuImageButton buttonText={'Guide'} buttonImage={ProgressImage}/>
        </div>

      </div>
    </div>
  )
}
export default MenuPage