import Phaser from 'phaser'
import bronzeMedal from '../assets/medals/bronzeMedal-100px.png'
import silverMedal from '../assets/medals/silverMedal-100px.png'
import goldMedal from '../assets/medals/goldMedal-100px.png'
import menuButton from '../assets/buttons/menu.png'
import retryButton from '../assets/buttons/retry.png'
import quitButton from '../assets/buttons/quit.png'
import restart from '../assets/buttons/restart.png'
export default class EndScene extends Phaser.Scene {
  constructor(destroyGame) {
    super('EndScene')
    this.destroyGame = destroyGame
    this.scoreCounter = 0
    this.badgesCreated = false
    this.score = null
    this.quitButton = null
    this.sceneText = {}
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
    this.load.image('restart', restart)

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
    fontSize = '68px',
    color = this.game.textColor,
    strokeText = true
  ) => {
    this.sceneText[textName] = this.add
      .text(xPosition, yPosition, value, {
        fontSize: fontSize,
        align: 'center',
        fontFamily: '\'Sarpanch\'',
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
      .sprite(150, 400, 'bronzeMedal')
      .setTint(0x666666)
      .setAlpha(0.5)
      .setScale(1, 1)
    this.badgeSpriteSilver = this.add
      .sprite(300, 400, 'silverMedal')
      .setTint(0x666666)
      .setAlpha(0.5)
      .setScale(1, 1)

    this.badgeSpriteGold = this.add
      .sprite(450, 400, 'goldMedal')
      .setTint(0x666666)
      .setAlpha(0.5)
      .setScale(1, 1)

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
      .image(150, 600, 'quitButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.destroyGame()
      })

    this.restart = this.add
      .image(450, 600, 'restart')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.restartGame()
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
    this.createText(300, 100, 'playerText', this.game.username)

    const scoreCheckResult = this.game.checkGameScore(this.score, this.game.levelChoice)
    if (scoreCheckResult.newScoreAchieved){
      this.time.delayedCall(
        500,
        this.createText,
        [300, 60, 'newLocalHighScore', 'New High Score!', 50, this.game.textColor, true],
        this
      )
    } else if (scoreCheckResult.newWorldRecord){
      this.game.postNewRecord(this.score, this.game.levelChoice)

      this.time.delayedCall(
        500,
        this.createText,
        [300, 60, 'newWorldRecordScore', 'New World Record!', 50, this.game.textColor, true],
        this
      )
    }


    this.time.delayedCall(
      500,
      this.createText,
      [300, 150, 'youScoredText', 'You Scored:'],
      this
    )

    this.time.delayedCall(
      1000,
      this.createText,
      [300, 250, 'scoreText', 0],
      this
    )

  }

  update = () => {
    //Gradually increase the score text until it matches the score
    if (this.sceneText.scoreText !== undefined && this.score !== null) {
      if (this.score > 1000 && ((this.score - this.scoreCounter) > 1000)) {
        this.scoreCounter += 1000
        this.sceneText.scoreText.setText(this.scoreCounter)
      } else {
        this.scoreCounter = this.score
        this.sceneText.scoreText.setText(this.score)
      }
    }

    if (this.scoreCounter === this.score) {
      this.time.delayedCall(500, this.createBadges, [], this)
    }

    if (this.badgesCreated) {
      this.time.delayedCall(1000, this.createButtons, [], this)
    }
  }
}
