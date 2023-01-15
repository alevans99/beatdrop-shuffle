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
  const localScoresRef = useRef()
  const recordScoresRef = useRef()
  const scoreItemsContainerRef = useRef()


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
    }
  }

  const handleFadeAnimationEnd = (t) => {
    if (t.animationName === 'tab-fade-out'){
      //Remove whole container
      scoreItemsContainerRef.current.classList.add('hide-score-container')
      //Update type while hidden
      toggleType()
      //Remove the fade out and add fade in
      scoreItemsContainerRef.current.classList.remove('tab-fade-out')
      scoreItemsContainerRef.current.classList.add('tab-fade-in')
      //Make visible again
      scoreItemsContainerRef.current.classList.remove('hide-score-container')
    } 
    if (t.animationName === 'tab-fade-in'){
      scoreItemsContainerRef.current.classList.remove('tab-fade-in')
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
        <div className='scores-buttons-container'>
          <div className='scores-type-container'>
            <button onClick={() => {
              fadeAndChangeScoreType('local')
            }}>Personal</button>
            <button onClick={() => {
              fadeAndChangeScoreType('record')
            }}>Worldwide</button>
          </div>
          <div className='scores-level-container'></div>
        </div>
        <div className='scores-list-container'>
          <div className='scores-headings-container'>
            <h4>Rank</h4>
            <h4>Score</h4>
            <h4>User</h4>
            <h4>Date</h4>
          </div>
          <div className='score-items-container' ref={scoreItemsContainerRef} onAnimationEnd={handleFadeAnimationEnd}          
          >
            {scoreType === 'local' && userScores && Object.values(userScores[level]).map((scoreItem, i) => {
              return (<div className='score-list-item glowing-gold' key={`individualLocalScore${i}`} ref={localScoresRef}>
                <h5>{i + 1}</h5>
                <h5>{scoreItem.score}</h5>
                <h5>{scoreItem.user}</h5>
                <h5>{DateTime.fromISO(scoreItem.timestamp).toLocaleString(DateTime.DATETIME_FULL)}</h5>
              </div>)
            })}
            {scoreType === 'record' && Object.values(recordScores[level]).map((scoreItem, i) => {
              return (<div className={`score-list-item ${scoreItem.userId === scoreId ? 'user-record' : ''}`} key={`recordLocalScore${i}`} ref={recordScoresRef}>
                <h5>{i + 1}</h5>
                <h5>{scoreItem.score}</h5>
                <h5>{scoreItem.user}</h5>
                <h5>{DateTime.fromISO(scoreItem.timestamp).toLocaleString(DateTime.DATETIME_FULL)}</h5>
              </div>)
            })}
          </div>
        </div>


      </div>
    </div>
  )
}
export default LeaderboardsPage