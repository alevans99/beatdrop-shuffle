import React from 'react'
import {  useEffect } from 'react'
import '../../styles/pages/GamePage.css'
import NewGame from '../../game/NewGame'
function GamePage() {

  const destroyPhaserGame = () => {
    document.game.destroy(true)
  }

  useEffect(() => {
    const height = 800
    const width = 600
    document.game = new NewGame('level3', width, height, destroyPhaserGame)
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
