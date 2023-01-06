import React from 'react'
import {  useEffect } from 'react'
import '../../styles/pages/GamePage.css'
import NewGame from '../../game/NewGame'
import { useGameContext } from '../../contexts/GameContextProvider'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../contexts/UserContextProvider'
function GamePage() {
  const navigate = useNavigate()

  const {checkNewUserScore} = useUserContext()
  const {levelSelected} = useGameContext()
  const destroyGame = () => {
    document.game.destroy(true)
  }


  useEffect(() => {
    if (!levelSelected){
      navigate('/level-select')
    } else {
      const height = 800
      const width = 600
      const levelToPlay = `level${levelSelected}`
      document.game = new NewGame(levelToPlay, width, height, destroyGame, checkNewUserScore)
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
