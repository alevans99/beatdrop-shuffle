import React from 'react'
import {  useEffect } from 'react'
import '../../styles/pages/GamePage.css'
import NewGame from '../../game/NewGame'
import { useGameContext } from '../../contexts/GameContextProvider'
function GamePage() {

  const {levelSelected} = useGameContext()
  console.log(levelSelected, ' Used context')
  const destroyGame = () => {
    document.game.destroy(true)
  }

  useEffect(() => {
    const height = 800
    const width = 600
    const levelToPlay = `level${levelSelected}`
    document.game = new NewGame(levelToPlay, width, height, destroyGame)
    return () => {
      document.game.destroy(true)
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
