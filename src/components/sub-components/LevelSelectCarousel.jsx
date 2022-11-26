import React from 'react'
import '../../styles/sub-components/LevelSelectCarousel.css'
import {PropTypes} from 'prop-types'
 
function LevelSelectCarousel({levelImage, handleLevelChange}) {

  const [touchStart, setTouchStart] = React.useState(0)
  const [touchEnd, setTouchEnd] = React.useState(0)

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX)
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  function handleTouchEnd() {
    //Swipe Left
    if (touchStart - touchEnd > 150) {
      handleLevelChange(true)
    }

    if (touchStart - touchEnd < -150) {
    //Swipe Right
      handleLevelChange(false)
    }
  }
  return (
    <div id="LevelSelectCarousel" className="LevelSelectCarousel" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <img className='level-select-image' src={levelImage}></img>
    </div>
  )
}


LevelSelectCarousel.propTypes = {
  levelImage: PropTypes.string.isRequired,
  handleLevelChange: PropTypes.func.isRequired
}
  
export default LevelSelectCarousel