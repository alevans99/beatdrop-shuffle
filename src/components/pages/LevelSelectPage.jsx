import React from 'react'
import '../../styles/pages/LevelSelectPage.css'
import level1Image from '../../assets/levelSelect/level1.png'
import level2Image from '../../assets/levelSelect/level2.png'
import level3Image from '../../assets/levelSelect/level3.png'
import level4Image from '../../assets/levelSelect/level4.png'
import level5Image from '../../assets/levelSelect/level5.png'
import LevelSelectButton from '../sub-components/LevelSelectButton'

function LevelSelectPage() {
  const levelImages = [level1Image, level2Image, level3Image, level4Image, level5Image]

  return (
    <div id="LevelSelectPage" className="LevelSelectPage">
      <div className='level-select-container'>
        {levelImages.map((levelImage, i) => {
          return (<LevelSelectButton  key={`Level-Select ${i}`} buttonText={`Level ${i + 1}`} buttonImage={levelImage} locked={true} levelNumber={i + 1}/>)
        })}
      </div>
    </div>
  )
}
export default LevelSelectPage