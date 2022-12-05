import Phaser from 'phaser'
import lightBlueBackground from '../assets/menu-images/lightblue-background.png'
import greyBackground from '../assets/menu-images/grey-background3.png'
import retryButton from '../assets/buttons/retry.png'
import quitButton from '../assets/buttons/quit.png'
import resumeButton from '../assets/buttons/resume.png'
import muteButton from '../assets/buttons/mute.png'
import unmuteButton from '../assets/buttons/unmute.png'

export default class PauseScene extends Phaser.Scene {
  constructor(destroyPhaserGame) {
    super('PauseScene')
    this.isMuted = false
    this.destroyPhaserGame = destroyPhaserGame
  }

  createText = (
    xPosition,
    yPosition,
    propName,
    value,
    fontSize = '36px',
    color = this.game.textColor,
    strokeText = true
  ) => {
    this[propName] = this.add
      .text(xPosition, yPosition, value, {
        fontSize: fontSize,
        align: 'center',
        fontFamily: '\'Press Start 2P\'',
        color: color,
      })
      .setOrigin(0.5, 0.5)
      .setShadow(4, 4, '#333333', 4, false, true)
      .setScrollFactor(0)

    if (strokeText) this[propName].setStroke('black', 4)
  }

  preload() {
    this.load.image('lightBlueBackground', lightBlueBackground)
    this.load.image('greyBackground', greyBackground)

    this.load.image('retry-button', retryButton)
    this.load.image('quit-button', quitButton)

    this.load.image('resume-button', resumeButton)
    this.load.image('mute-button', muteButton)
    this.load.image('unmute-button', unmuteButton)
  }

  create() {
    this.background = this.add.image(300, 400, 'lightBlueBackground')
    this.background.alpha = 0.5

    this.menuBackground = this.add.image(300, 400, 'greyBackground')
    this.menuBackground.alpha = 0.5

    this.resumeButton = this.add
      .image(300, 250, 'resume-button')
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.resumeAll()
        this.scene.stop().resume('MainGameScene')
      })

    this.quitButton = this.add
      .image(300, 400, 'quit-button')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.destroyPhaserGame()
      })

    this.unMuteButton = this.add
      .image(300, 550, 'unmute-button')
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.mute = false
        this.unMuteButton.setVisible(false)
        this.muteButton.setVisible(true)
      })

    this.muteButton = this.add
      .image(300, 550, 'mute-button')
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.mute = true
        this.muteButton.setVisible(false)
        this.unMuteButton.setVisible(true)
      })

    this.sound.mute
      ? this.muteButton.setVisible(false)
      : this.unMuteButton.setVisible(false)
  }
}
