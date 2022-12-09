import Phaser from 'phaser'
import EndScene from './EndScene'
import MainGameScene from './MainGameScene'
import PauseScene from './PauseScene'

/**
 * The NewGame class sets up the main game config, creates each game scene class 
 * and then starts the game.
 */
export default class NewGame extends Phaser.Game {

  constructor(levelChoice, width, height, destroyGame) {

    /**
     * Config setup - Determines entry point, size options
     */
    const config = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width: width,
      height: height,
      scale: {
        zoom: 2,
        mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
      },
      physics: {
        default: 'arcade',
      },
    }

    super(config)

    this.textColor = () => {
      switch (levelChoice) {
      case 'level1':
        return '#5dc416'
      case 'level2':
        return '#bdbb8c'
      case 'level3':
        return '#848461'
      case 'level4':
        return '#c33c16'
      case 'level5':
        return '#e6d678'
      default:
        return '#5dc416'
      }
    }

    /**
     * Variables from constructors
     */
      
    // this.avatar = avatar
    // this.username = username
    this.levelChoice = levelChoice

    //Function to end game from component.
    this.destroyGame = destroyGame

    /**
     * Creates game scenes and passes key variables
     */

    this.pauseScene = new PauseScene(destroyGame)
    this.endScene = new EndScene(destroyGame)
    this.mainGameScene = new MainGameScene(levelChoice)
    console.log('Finished creating scenes')
    /**
     * Add game scenes
     */
    this.scene.add('MainGameScene', this.mainGameScene)
    this.scene.add('PauseScene', this.pauseScene)
    this.scene.add('EndScene', this.endScene)
    console.log('finished adding scenes')
    /**
     * Start game
     */
    this.scene.start('MainGameScene')
  }

}
  