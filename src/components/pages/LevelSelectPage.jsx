import React, { useState } from 'react'
import '../../styles/pages/LevelSelectPage.css'
import level1Image from '../../assets/levelSelect/level1.png'
import level2Image from '../../assets/levelSelect/level2.png'
import level3Image from '../../assets/levelSelect/level3.png'
import level4Image from '../../assets/levelSelect/level4.png'
import level5Image from '../../assets/levelSelect/level5.png'
import LevelSelectCarousel from '../sub-components/LevelSelectCarousel'

function LevelSelectPage() {
  const levelImages = [level1Image, level2Image, level3Image, level4Image, level5Image]
  const [levelSelected, setLevelSelected] = useState(0)

  const handleLevelChange = (increase) => {
    setLevelSelected((previousState) => {
      if (increase && previousState === levelImages.length - 1){
        return 0
      } else if (!increase && previousState === 0) {
        return levelImages.length - 1
      }
      return increase ? previousState + 1 : previousState - 1
    })
    
  }
  return (
    <div id="LevelSelectPage" className="LevelSelectPage">
      <LevelSelectCarousel levelImage={levelImages[levelSelected]} handleLevelChange={handleLevelChange}/>
    </div>
  )
}
export default LevelSelectPage