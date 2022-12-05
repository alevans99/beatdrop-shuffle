import React from 'react'
import '../../styles/pages/LevelSelectPage.css'
import level1Image from '../../assets/level-select/level1Crop.png'
import level2Image from '../../assets/level-select/level2Crop.png'
import level3Image from '../../assets/level-select/level3Crop.png'
import level4Image from '../../assets/level-select/level4Crop.png'
import level5Image from '../../assets/level-select/level5Crop.png'
import LevelSelectButton from '../sub-components/LevelSelectButton'

function LevelSelectPage() {
  const levelImages = [level1Image, level2Image, level3Image, level4Image, level5Image]

  return (
    <div id="LevelSelectPage" className="LevelSelectPage">
      <div className='level-select-container'>
        {levelImages.map((levelImage, i) => {
          return (<LevelSelectButton  key={`Level-Select ${i}`} buttonText={`Level ${i + 1}`} buttonImage={levelImage} locked={false} levelNumber={i + 1}/>)
        })}
      </div>
    </div>
  )
}
export default LevelSelectPage