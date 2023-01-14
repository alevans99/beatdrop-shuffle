import React from 'react'
import {  useEffect } from 'react'
import '../../styles/pages/GamePage.css'
import NewGame from '../../game/NewGame'
import { useGameContext } from '../../contexts/GameContextProvider'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../contexts/UserContextProvider'
import { useRecordScoresContext } from '../../contexts/RecordScoresContextProvider'
import { DateTime } from 'luxon'
function GamePage() {
  const navigate = useNavigate()
  const {checkNewUserScore, username, scoreId} = useUserContext()
  const {localCheckForRecordScore, postARecordScore} = useRecordScoresContext()
  const {levelSelected} = useGameContext()
  const destroyGame = () => {
    document.game.destroy(true)
  }



  const checkScore = (newScore, level) => {
    const localCheckResult = checkNewUserScore(newScore, level)
    if (localCheckResult.newScoreAchieved){
      const localRecordCheck = localCheckForRecordScore(newScore, level)
      return localRecordCheck
    }
    return localCheckResult
  }

  const postNewRecord = async (newScore, level) => {
    const newHighScore = {score: newScore, user: username, userId: scoreId, timestamp: DateTime.now().toISO()}
    postARecordScore(newHighScore, level)
  }


  useEffect(() => {
    if (!levelSelected){
      navigate('/level-select')
    } else {
      const height = 800
      const width = 600
      const levelToPlay = `level${levelSelected}`
      document.game = new NewGame(levelToPlay, width, height, destroyGame, checkScore, postNewRecord)
    }


    return () => {
      if (document.game){
        document.game.destroy(true)
      }

    }
  }, [])

  return (
    <div className="GamePage">
      {/* Entry Point for Phaser.js */}
      <div id="game-container" className={'game-container'}></div>
    </div>
  )


}

  

export default GamePage
