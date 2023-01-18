import React, { useEffect, useState, useRef } from 'react'
import { useRecordScoresContext } from '../../contexts/RecordScoresContextProvider'
import { useUserContext } from '../../contexts/UserContextProvider'
import '../../styles/pages/LeaderboardsPage.css'
import { DateTime } from 'luxon'
function LeaderboardsPage() {
  const {userScores, scoreId} = useUserContext()
  const {recordScores, loadingScores, refreshRecordScores} = useRecordScoresContext()
  const [scoreType, setScoreType] = useState('local')
  const [level, setLevel] = useState('level1')
  const [nextLevel, setNextLevel] = useState('level1')
  const scoreItemRefs = useRef([])
  const scoreItemsContainerRef = useRef()
  const personalTab = useRef()
  const recordTab = useRef()
  const levelChoice = ['level1', 'level2', 'level3', 'level4', 'level5']
  const newLevelChoice = useRef()

  const toggleType = () => {
    setScoreType((previousState) => {
      if (previousState === 'local'){
        return 'record'
      } else {
        return 'local'
      }
    })
  }

  const fadeAndChangeScoreType = (newType) => {
    if (scoreType !== newType){
      scoreItemsContainerRef.current.classList.add('tab-fade-out')
      if (newType === 'record'){
        personalTab.current.classList.add('disabled-tab')
        recordTab.current.classList.remove('disabled-tab')
      } else {
        personalTab.current.classList.remove('disabled-tab')
        recordTab.current.classList.add('disabled-tab')
      }
    }
  }


  const handleTypeFadeAnimationEnd = (t) => {
    console.log('Handing animation end' , t.animationName)
    if (t.animationName === 'tab-fade-out'){
      //Remove whole container
      scoreItemsContainerRef.current.classList.add('hide-element')
      //Update type while hidden
      toggleType()
      //Remove the fade out and add fade in
      scoreItemsContainerRef.current.classList.remove('tab-fade-out')
      scoreItemsContainerRef.current.classList.add('tab-fade-in')
      //Make visible again
      scoreItemsContainerRef.current.classList.remove('hide-element')
    } 
    if (t.animationName === 'tab-fade-in'){
      scoreItemsContainerRef.current.classList.remove('tab-fade-in')
    }

    if (t.animationName === 'level-fade-out'){
      // //hide all the level elements while the score changes
      // scoreItemRefs.current.forEach((item) => {
      //   item.classList.add('hide-element')
      // })
      scoreItemsContainerRef.current.classList.add('hide-element')
      setLevel(newLevelChoice.current)
      scoreItemsContainerRef.current.classList.remove('level-fade-out')
      scoreItemsContainerRef.current.classList.add('level-fade-in')
      scoreItemsContainerRef.current.classList.remove('hide-element')


      // scoreItemRefs.current.forEach((item) => {
      //   item.classList.remove('hide-element')

      //   item.classList.add('level-fade-in')
      //   item.classList.remove('level-fade-out')
      // })
    }
    if (t.animationName === 'level-fade-in'){
      // scoreItemRefs.current.forEach((item) => {
      //   item.classList.remove('level-fade-in')
      // })   
      scoreItemsContainerRef.current.classList.remove('level-fade-in')

    }
  }

  const handleLevelSelect = (levelChoice) => {
    setNextLevel(levelChoice)
    newLevelChoice.current = levelChoice
    fadeAndChangeLevel(levelChoice)
  }

  const fadeAndChangeLevel = (newLevel) => {
    if (level !== newLevel){
      scoreItemsContainerRef.current.classList.add('level-fade-out')
    }
  }

  useEffect(() => {
    if (!loadingScores){
      refreshRecordScores
    }
  }, [])

  return (
    <div id="LeaderboardsPage" className="LeaderboardsPage" >

      <div className='scores-main-container'>
        <div className='scores-tabs-container'>
          <div className='scores-type-container'>
            <button ref={personalTab} className='type-tab' onClick={() => {
              fadeAndChangeScoreType('local')
            }}>Personal</button>
            <button ref={recordTab} className='type-tab disabled-tab' onClick={() => {
              fadeAndChangeScoreType('record')
            }}>Worldwide</button>
          </div>
        </div>
        <div className='scores-list-container'>
          <div className='scores-headings-container'>
            <h4>Rank</h4>
            <h4>Score</h4>
            <h4>User</h4>
            <h4>Date</h4>
          </div>
          <div className='score-items-container' ref={scoreItemsContainerRef} onAnimationEnd={handleTypeFadeAnimationEnd}          
          >
            {scoreType === 'local' && userScores && Object.values(userScores[level]).map((scoreItem, i) => {
              return (
                <div className={'score-list-item'} key={`individualLocalScore${i}`}  ref={(element) => {scoreItemRefs.current[i] = element}}>
                  <h5>{i + 1}</h5>
                  <h5>{scoreItem.score}</h5>
                  <h5>{scoreItem.user}</h5>
                  <h5>{DateTime.fromISO(scoreItem.timestamp).toLocaleString(DateTime.DATETIME_FULL)}</h5>
                </div>
              )
            })}
            {scoreType === 'record' && Object.values(recordScores[level]).map((scoreItem, i) => {
              return (                  
                <div className={`score-list-item ${scoreItem.userId === scoreId ? 'user-record' : ''}`} key={`recordLocalScore${i}`} ref={(element) => {scoreItemRefs.current[i] = element}}>
                  <h5>{i + 1}</h5>
                  <h5>{scoreItem.score}</h5>
                  <h5>{scoreItem.user}</h5>
                  <h5>{DateTime.fromISO(scoreItem.timestamp).toLocaleString(DateTime.DATETIME_FULL)}</h5>
                </div>     
                
              )
            })}
          </div>
        </div>
        <div className='scores-level-container'>
          {levelChoice.map((buttonLevel, i) => {
            return ( <div onClick={() => {handleLevelSelect(`level${i+1}`)}} className={`scores-level ${levelChoice[i] === nextLevel ? 'selected-level-button' : ''}`} key={`levelButton${i}`}>{i + 1}</div>)
          })}
        </div>

      </div>

    </div>
  )
}
export default LeaderboardsPage