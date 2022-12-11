import Phaser from 'phaser'
import bronzeMedal from '../assets/medals/bronzeMedal.png'
import silverMedal from '../assets/medals/silverMedal.png'
import goldMedal from '../assets/medals/goldMedal.png'
import menuButton from '../assets/buttons/menu.png'
import retryButton from '../assets/buttons/retry.png'
import quitButton from '../assets/buttons/quit.png'

export default class EndScene extends Phaser.Scene {
  constructor(destroyGame) {
    super('EndScene')
    this.destroyGame = destroyGame
    this.scoreCounter = 0
    this.badgesCreated = false
    this.sceneText = {
    }
    this.score = null
    this.quitButton = null
    
  }


  /**
   * Custom Methods
   */


  /**
   * Initialises the End Scene by providing game information. Called by the 
   * scene manager when the scene starts.
   * @param data - Provides end game data including score
   */
  init = (data) => {
    this.score = data.score
  }

  /**
   * Preload all images needed
   */
  loadImages = () => {
    this.load.image('bronzeMedal', bronzeMedal)
    this.load.image('silverMedal', silverMedal)
    this.load.image('goldMedal', goldMedal)
    this.load.image('menuButton', menuButton)
    this.load.image('retryButton', retryButton)
    this.load.image('quitButton', quitButton)
  }


  /**
   * Creates text and applies settings provided before adding it to the game variables.
   * @param {*} xPosition - Horizontal position for the text
   * @param {*} yPosition - Vertical position for the text
   * @param {*} textName - Name for the text object created
   * @param {*} value - Text content value
   * @param {*} fontSize - Size for the text (Default 48px)
   * @param {*} color - Text color (Defaults to level text color)
   * @param {*} strokeText - Bool to set text outline
   */
  createText = (
    xPosition,
    yPosition,
    textName,
    value,
    fontSize = '48px',
    color = this.game.textColor,
    strokeText = true
  ) => {
    this.sceneText[textName] = this.add
      .text(xPosition, yPosition, value, {
        fontSize: fontSize,
        align: 'center',
        fontFamily: '\'Press Start 2P\'',
        color: color,
      })
      .setOrigin(0.5, 0.5)
      .setShadow(4, 4, '#333333', 4, false, true)

    if (strokeText) {
      this.sceneText[textName].setStroke('black', 4)
    }
  }

  /**
   * Creates the end of game medal sprites based on the score
   */
  createBadges = () => {
    this.badgeSpriteBronze = this.add
      .sprite(150, 450, 'bronzeMedal')
      .setTint(0x666666)
      .setAlpha(0.5)
    this.badgeSpriteSilver = this.add
      .sprite(300, 450, 'silverMedal')
      .setTint(0x666666)
      .setAlpha(0.5)
    this.badgeSpriteGold = this.add
      .sprite(450, 450, 'goldMedal')
      .setTint(0x666666)
      .setAlpha(0.5)

    if (this.score > 60000) this.badgeSpriteBronze.clearAlpha().clearTint()
    if (this.score > 80000) this.badgeSpriteSilver.clearAlpha().clearTint()
    if (this.score > 90000) this.badgeSpriteGold.clearAlpha().clearTint()
    this.badgesCreated = true
  }

  /**
   * Creates buttons needed for the scene
   */
  createButtons = () => {
    this.quitButton = this.add
      .image(300, 600, 'quit-button')
      .setInteractive()
      .on('pointerdown', () => {
        this.destroyGame()
      })
  }

  /**
   * Phaser Methods
   */

  preload = () => {
    this.loadImages()
  }

  create = () => {

    //Display user score in stages
    this.createText(300, 160, 'playerText', this.game.username)

    this.time.delayedCall(
      500,
      this.createText,
      [300, 230, 'youScoredText', 'you scored'],
      this
    )

    this.time.delayedCall(
      1000,
      this.createText,
      [300, 350, 'scoreText', 0],
      this
    )

  }

  update = () => {
    //Increase the displayed score gradually until score displayed
    if (this.sceneText.scoreText?.text < this.score) {
      if (this.score > 10000) this.scoreCounter += 1000
      else if (this.score > 1000) this.scoreCounter += 100
      else if (this.score > 100) this.scoreCounter += 10
      else this.scoreCounter += 10
      this.sceneText.scoreText.setText(this.scoreCounter)
    } else if (this.scoreText) {
      this.scoreCounter = this.score
      this.sceneText.scoreText.setText(this.scoreCounter)
    }

    if (this.scoreCounter === this.score) {
      this.time.delayedCall(500, this.createBadges, [], this)
    }

    if (this.badgesCreated) {
      this.time.delayedCall(1000, this.createButtons, [], this)
    }
  }
}
