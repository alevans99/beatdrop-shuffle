import Phaser from 'phaser'
import collectStarAudio from '../assets/music/sfx_sounds_fanfare3.wav'
import starImage from '../assets/game-items/star.png'
import foxSpritesheet from '../assets/sprites/fox_spritesheet.png'
import penguinSpritesheet from '../assets/sprites/penguin_spritesheet.png'
import floorImage from '../assets/platform/floor.png'
import getLevelConfig from './game-utils/getLevelConfig'
import pauseButton from '../assets/buttons/pause-button.png'
import getPowerUpAssets from './game-utils/getPowerUpAssets'
export default class MainGameScene extends Phaser.Scene {

  constructor(levelChoice, avatar) {
    console.log('Setting up game')
    super('MainGameScene')

    //Track score
    this.score = 0
    this.scoreText = ''
    
    //Track game state
    this.gameInProgress = true
    this.gameOver = false
    this.gameEndInProgress = false

    //Game settings
    this.starGap = 500
    this.powerupGap = 1500
    this.playerVelocityX = 500
    this.objectVelocityY = -400
    this.avatar = avatar
    //Stores music assets and settings
    this.gameMusic = {}

    //This sets the key level details such as assets, platform distance and powerups
    this.levelConfig = getLevelConfig(levelChoice)
    console.log('level config ', this.levelConfig, levelChoice)
    this.lastCreatedPlatform = undefined

    this.spritesheet = this.avatar === 'fox' ? foxSpritesheet : penguinSpritesheet
    console.log('setting sprite', this.spritesheet)
  }

  /**
   * Custom Methods
   */

  /**
   * Sets up audio for the current level
   */
  loadAudio = () => {
    this.load.audio(this.levelConfig.music.name, this.levelConfig.music.path)
    this.load.audio(
      this.levelConfig.platformSfx.name,
      this.levelConfig.platformSfx.path
    )
    this.load.audio('collectStarAudio', collectStarAudio)
  }

  /**
   * Preload all images for the level
   */
  loadImages = () => {

    this.load.image('star', starImage)
    this.load.spritesheet('avatar', this.spritesheet, {
      frameWidth: 70,
      frameHeight: 86
    })
    this.load.image('floorImage', floorImage)
    this.load.image('pause-button', pauseButton)

    this.load.image(
      'background',
      this.levelConfig.background.path
    )

    for (let key in this.levelConfig.platformInformation) {
      const platformToLoad = this.levelConfig.platformInformation[key]
      this.load.image(key, platformToLoad.path)
    }

    for (let powerup of this.levelConfig.powerups) {
      this.load.image(powerup, getPowerUpAssets(powerup))
    }
  }

  startMusic = () => {
    this.gameMusic.music = this.sound.add(this.levelConfig.music.name)
    this.gameMusic.platformImpactSFX = this.sound.add(
      this.levelConfig.platformSfx.name
    )
    this.gameMusic.starCollectionSFX = this.sound.add('collectStarAudio')
    this.gameMusic.music.play()
  }

  
  /**
   * Allows touch screen/mouse click controls
   */
  addOnscreenControls = () => {
    this.zone_left = this.add
      .zone(0, 0, 300, 800)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setInteractive()
      .on(
        'pointerdown',
        () => {
          this.mouseLeft = true
        },
        this
      )
      .on(
        'pointerup',
        () => {
          this.mouseLeft = false
        },
        this
      )
      .on(
        'pointerout',
        () => {
          this.mouseLeft = false
        },
        this
      )

    this.zone_right = this.add
      .zone(300, 0, 600, 800)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setInteractive()
      .on(
        'pointerdown',
        () => {
          this.mouseRight = true
        },
        this
      )
      .on(
        'pointerup',
        () => {
          this.mouseRight = false
        },
        this
      )
      .on(
        'pointerout',
        () => {
          this.mouseRight = false
        },
        this
      )
  }

  /**
   * Sets the background to repeat, but doesn't scroll with the camera
   */
  animateBackground = () => {
    this.scrollingBackground = this.add
      .tileSprite(0, 0, 600, 800, 'background')
      .setOrigin(0, 0)

    this.scrollingBackground.setScrollFactor(0)
  }


  /**
   * Adds the platforms as a physics group and applies the level settings to 
   * them.
   */
  createPlatforms = () => {
    this.platformGroup = this.physics.add.group()

    //Create 20 randomised platforms based on the level config
    for (let i = 0; i < 20; i++) {

      const numberOfPlatformsAvailable = Object.keys(
        this.levelConfig.platformInformation
      ).length

      const randomPlatformName = Object.keys(
        this.levelConfig.platformInformation
      )[Phaser.Math.RND.between(0, numberOfPlatformsAvailable - 1)]

      const platformToAddName = randomPlatformName
      const platformToAdd =
        this.levelConfig.platformInformation[platformToAddName]

      //Get the position of the last platform we created so we can place the new one below it.
      const lastPlatformY =
        this.lastCreatedPlatform !== undefined
          ? this.lastCreatedPlatform.y
          : 800

      //Set the position of the platform based on the last platform and the platform data from the config
      const platform = this.platformGroup
        .create(
          Phaser.Math.RND.between(0, 600 - platformToAdd.size),
          lastPlatformY +
            platformToAdd.distance +
            Phaser.Math.RND.between(0, platformToAdd.randomY),
          platformToAddName
        )
        .setOrigin(0, 0)

      //Keep a reference to the platform so we can place the next one below it.
      this.lastCreatedPlatform = platform
    }

    //Set the platform to move upwards
    this.platformGroup.getChildren().forEach((item) => {
      item.setVelocityY(this.objectVelocityY)
    })
  }


  /**
  * Move any stars that overlap a platform
  */  
  checkForStarOverlaps= () => {
    this.physics.world.overlap(
      this.starsGroup.getChildren(),
      this.platformGroup.getChildren(),
      (star, platform) => {
        star.body.reset(star.body.x, platform.body.y + 200)
      }
    )
  }
  /**
  * Move any powerups that overlap a platform
  */
  checkForPowerupOverlaps= () => {
    this.physics.world.overlap(
      this.powerupsGroup.getChildren(),
      this.platformGroup.getChildren(),
      (powerup, platform) => {
        powerup.body.reset(powerup.body.x, platform.body.y + 200)
      }
    )
  }
  

  /**
   * Adds a new physics groups for stars. Adds stars at random coords based on
   * last star placed and level config.
   */
  createStars = () => {
    this.starsGroup = this.physics.add.group()

    for (let i = 0; i < 10; i++) {
      const lastStarY =
        this.lastCreatedStar !== undefined ? this.lastCreatedStar.y : 1000

      const star = this.starsGroup
        .create(
          Phaser.Math.RND.between(0, 576),
          lastStarY +
            this.levelConfig.starDistance +
            Phaser.Math.RND.between(0, 100),
          'star'
        )
        .setOrigin(0, 0)

      this.lastCreatedStar = star
    }

    //Move overlapping stars
    this.checkForStarOverlaps()

    this.starsGroup.getChildren().forEach((item) => {
      item.setVelocityY(this.objectVelocityY)
    })
  }

  /**
   * Adds a new physics groups for powerups. Adds powerups at random coords based on
   * last powerup placed and level config.
   */
  createPowerups = () => {
    this.powerupsGroup = this.physics.add.group()

    for (let i = 0; i < 10; i++) {
      const lastPowerupY =
        this.lastCreatedPowerup !== undefined
          ? this.lastCreatedPowerup.y
          : 2000

      const powerup = this.powerupsGroup
        .create(
          Phaser.Math.RND.between(0, 550),
          lastPowerupY +
            this.levelConfig.powerupDistance +
            Phaser.Math.RND.between(0, 100),
          this.levelConfig.powerups[Math.floor(Math.random() * 3)]
        )
        .setOrigin(0, 0)
      this.lastCreatedPowerup = powerup
    }
    this.physics.world.step(0)
    //   Move overlapping powerups
    this.checkForPowerupOverlaps()

    this.powerupsGroup.getChildren().forEach((item) => {
      item.setVelocityY(this.objectVelocityY)
    })
  }
  
  /**
  * Load player sprite
  */
  createPlayer = () => {
    this.player = this.physics.add.sprite(300, 400, 'avatar')
    this.player.setCollideWorldBounds(true)
    this.player.body.setBounceY(0.1)

    // Player input
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  /**
   * Creates and returns custom text object
   * @param {*} xPosition - Text Position on screen - x
   * @param {*} yPosition - Text Position on screen - y
   * @param {*} value 
   * @param {*} fontSize 
   * @param {*} color 
   * @param {*} strokeText 
   */
  createText = (
    xPosition,
    yPosition,
    value,
    fontSize = '48px',
    color = this.game.textColor,
    strokeText = true
  ) => {
    let textObject = this.add
      .text(xPosition, yPosition, value, {
        fontSize: fontSize,
        align: 'center',
        fontFamily: '\'Press Start 2P\'',
        color: color,
      })
      .setOrigin(0.5, 0.5)
      .setShadow(4, 4, '#333333', 4, false, true)
      .setScrollFactor(0)

    if (strokeText) textObject.setStroke('black', 4)
    return textObject

  }

  /**
   * Controls fall speed and sets platform collision action.
   */
  setPlayerPhysics = () => {
    this.player.body.setGravityY(50)
    this.player.body.setMaxVelocityY(70)
    this.player.setBounce(0.1)

    this.physics.add.overlap(
      this.player,
      this.platformGroup,
      this.detectPlatformCollisions,
      null,
      this
    )
  }

  /**
   * Creates animations for player movement.
   */
  setPlayerAnimation = () => {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('avatar', {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'avatar', frames: 8 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('avatar', {
        start: 9,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    })
  }



  /**
   * Triggers on platform collision. Animates avatar, adds
   * SFX and pauses game and reduces score.
   * @param {*} platform 
   * @returns 
   */
  detectPlatformCollisions = (player, platform) => {
    if (this.gameInProgress) {
      this.gameMusic.platformImpactSFX.play()
      this.tweens.add({
        targets: this.player,
        alpha: 0,
        ease: 'Cubic.easeOut',
        duration: 100,
        repeat: 2,
        yoyo: true,
      })
      this.cameras.main.shake(500, 0.004)
      this.gameInProgress = false
      this.player.body.setVelocity(0)
      this.physics.pause()
      this.updateScore(-2000)

      if (!this.gameEndInProgress) {
        //Get the asset name so we can load the correct distances from the level config
        const platformName = platform.texture.key
        const platformObject =
          this.levelConfig.platformInformation[platformName]

        this.platformGroup.killAndHide(platform)

        //Work out the new Y position for the new platform based on the distance and random Y provided
        //in the levelConfig.
        const newY =
          this.lastCreatedPlatform.y +
          platformObject['distance'] +
          Phaser.Math.RND.between(0, platformObject['randomY'])

        //Create the new platform placed anywhere on the X (minus its width) and at the Y position worked
        //out above.
        const newPlatform = this.platformGroup.get(
          Phaser.Math.RND.between(0, 600 - platformObject['size']),
          newY
        )

        if (!newPlatform) {
          return
        }
        //Activate and store reference to the last platform so we can place the next on below
        //it.
        newPlatform.setActive(true)
        newPlatform.setVisible(true)
        this.lastCreatedPlatform = newPlatform
      } else {
        this.platformGroup.killAndHide(platform)

        platform.destroy()
      }
      //Restart the game after delay
      this.time.addEvent({
        delay: 1500,
        loop: false,
        callback: () => {
          this.gameInProgress = true
          this.physics.resume()
        },
      })
    }
  }

  /**
   * Triggers action on star/avatar collisions
   */
  setupUserStarInteraction = () => {
    this.physics.add.collider(this.starsGroup)
    this.physics.add.overlap(
      this.player,
      this.starsGroup,
      this.detectStarCollisions,
      null,
      this
    )
  }

  /**
   * Triggers action on powerup/avatar collisions
   */
  setupUserPowerupInteraction = () => {
    this.physics.add.collider(this.powerupsGroup)
    this.physics.add.overlap(
      this.player,
      this.powerupsGroup,
      this.detectPowerupCollisions,
      null,
      this
    )
  }

  /**
   * Triggers action on powerup/avatar collisions
   */
  detectStarCollisions = (player, star) => {
    this.starsGroup.killAndHide(star)
    const newStarY =
      this.lastCreatedStar.y +
      +this.levelConfig.starDistance +
      Phaser.Math.RND.between(0, 100)

    const newStar = this.starsGroup.get(
      Phaser.Math.RND.between(0, 576),
      newStarY
    )
    this.lastStar = newStarY
    this.hitStarAddScore()
    if (!newStar) {
      return
    }
    newStar.setActive(true)
    newStar.setVisible(true)
    this.lastCreatedStar = newStar
  }

  /**
   * On powerup collision, triggers action and reloads
   * powerup at random point.
   * @param {*} player 
   * @param {*} powerup 
   * @returns 
   */
  detectPowerupCollisions = (player, powerup) => {
    this.powerupsGroup.killAndHide(powerup)
    const newPowerupY =
      this.lastCreatedPowerup.y +
      this.levelConfig.powerupDistance +
      Phaser.Math.RND.between(0, 100)
    const newPowerup = this.powerupsGroup.get(
      Phaser.Math.RND.between(0, 550),
      newPowerupY
    )
    this.lastPowerup = newPowerupY
    this.applyPowerupEffect(powerup.texture.key)
    if (!newPowerup) {
      return
    }
    newPowerup.setActive(true)
    newPowerup.setVisible(true)
    this.lastCreatedPowerup = newPowerup
  }

  applyPowerupEffect = (powerupName) => {
    if (powerupName === 'grow') {
      this.powerupGrow()
    } else if (powerupName === 'slow') {
      this.powerupSlow()
    } else if (powerupName === 'fast') {
      this.powerupFast()
    }
  }

  powerupGrow = () => {
    this.player.setScale(2)
    this.time.addEvent({
      delay: 5000,
      loop: false,
      callback: () => {
        this.player.setScale(1)
      },
    })
  }

  powerupSlow = () => {
    this.playerVelocityX -= 200
    this.time.addEvent({
      delay: 5000,
      loop: false,
      callback: () => {
        this.playerVelocityX += 200
      },
    })
  }

  powerupFast = () => {
    this.playerVelocityX += 200
    this.time.addEvent({
      delay: 5000,
      loop: false,
      callback: () => {
        this.playerVelocityX -= 200
      },
    })
  }

  startEndGame = () => {
    this.gameTimer = this.time.addEvent({
      delay: 54000,
      callbackScope: this,
      loop: false,
      callback: this.endGame,
    })
  }

  createPauseMenu = () => {
    this.button = this.add
      .image(560, 36, 'pause-button')
      .setScrollFactor(0)
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.pauseAll()
        this.scene.pause('MainGameScene').launch('PauseScene')
      })
  }

  endGame = () => {
    this.gameEndInProgress = true
    const playerPosition = this.player.body.y
    const newWorldBounds = playerPosition + 1000

    this.physics.world.setBounds(0, 0, 600, newWorldBounds)
    this.cameras.main.setBounds(0, 0, 600, newWorldBounds)
    this.floor = this.physics.add
      .image(300, newWorldBounds - 28.5, 'floorImage')
      .setImmovable()
    this.physics.add.collider(
      this.player,
      this.floor,
      this.endLevel,
      null,
      this
    )

    this.player.setGravityY(300)
    this.player.setMaxVelocity(300)
    this.player.setVelocityY(300)
  }

  endLevel = () => {
    if (!this.gameOver) {
      this.gameOver = true
      this.physics.pause()
    }

    this.sound.pauseAll()
    this.scene.pause('MainGameScene')

    this.scoreText.setVisible(false)
    this.button.setVisible(false)

    this.scene.launch('EndScene', { score: this.score })
  }

  updateScore(updateAmount) {
    const color = updateAmount < 0 ? '#d40000' : this.game.textColor()

    this.score += updateAmount
    this.scoreText.setText(`Score: ${this.score}`)
    this.scoreText.setFill(color)
  }

  hitStarAddScore = () => {
    // Increment score
    this.updateScore(5000)
    this.gameMusic.starCollectionSFX.play()
  }

  createScoreText = () => {
    this.scoreText = this.createText(300, 46, 'Score: 0', '28px')
  }

  recyclePowerups = () => {
    if (!this.gameEndInProgress) {
      this.powerupsGroup.children.iterate((powerup) => {
        if (powerup !== undefined && powerup.y < this.player.y - 800) {
          this.powerupsGroup.killAndHide(powerup)

          const newPowerupY =
            this.lastCreatedPowerup.y +
            this.levelConfig.powerupDistance +
            Phaser.Math.RND.between(0, 100)
          const newPowerup = this.powerupsGroup.get(
            Phaser.Math.RND.between(0, 550),
            newPowerupY
          )

          if (!newPowerup) {
            return
          }
          newPowerup.setActive(true)
          newPowerup.setVisible(true)
          this.lastCreatedPowerup = newPowerup
        }
      })
    } else {
      this.powerupsGroup.children.iterate((powerup) => {
        if (!powerup) {
          return
        }
        if (
          powerup.y > this.player.body.y + 400 ||
          powerup.y < this.player.body.y - 800
        ) {
          powerup.destroy()
        }
      })
    }
  }

  listenForInput = () => {
    if (this.cursors.left.isDown || this.mouseLeft) {
      this.movePlayerLeft()
    } else if (this.cursors.right.isDown || this.mouseRight) {
      this.movePlayerRight()
    } else {
      this.stopMovingPlayer()
    }
  }

  movePlayerLeft = () => {
    this.player.setVelocityX(0 - this.playerVelocityX)
    this.player.anims.play('left', true)
  }

  movePlayerRight = () => {
    this.player.setVelocityX(this.playerVelocityX)
    this.player.anims.play('right', true)
  }

  stopMovingPlayer = () => {
    this.player.setVelocityX(0)
    this.player.anims.play('turn')
  }

  listenForResume = () => {
    this.events.on('resume', () => {
      this.button.setFill('#5dc416')
    })
  }

  preload() {
    console.log('preloading things')
    this.loadImages()
    this.loadAudio()
  }

  create() {
    this.startMusic()
    this.animateBackground()
    this.physics.world.step(0)

    this.cameras.main.setViewport(0, 0, 600, 800)

    //Sets the size of the whole world, first two are the top corner of the word and then
    //we set height and width
    this.physics.world.setBounds(0, 0, 600, 100000)

    this.createPlatforms()
    this.createStars()
    this.createPowerups()
    this.createPlayer()

    //Set how much of the screen the camera sees
    this.cameras.main.setBounds(0, 0, 600, 100000)

    //Set the camera to follow the player
    this.cameras.main.startFollow(this.player)

    this.setPlayerPhysics()

    this.startEndGame()
    this.setupUserStarInteraction()
    this.setupUserPowerupInteraction()

    this.setPlayerAnimation()

    this.addOnscreenControls()
    this.createPauseMenu()
    this.createScoreText()
  }

  recyclePlatforms() {
    //Only recycle platforms when the game isn't ending

    if (!this.gameEndInProgress) {
      this.platformGroup.children.iterate((platform) => {
        //Check if the platform is 800px above the player (off the screen)
        if (platform !== undefined && platform.y < this.player.y - 800) {
          //Get the asset name so we can load the correct distances from the level config
          const platformName = platform.texture.key
          const platformObject =
            this.levelConfig.platformInformation[platformName]

          this.platformGroup.killAndHide(platform)

          //Work out the new Y position for the new platform based on the distance and random Y provided
          //in the levelConfig.
          const newY =
            this.lastCreatedPlatform.y +
            platformObject['distance'] +
            Phaser.Math.RND.between(0, platformObject['randomY'])

          //Create the new platform placed anywhere on the X (minus its width) and at the Y position worked
          //out above.
          const newPlatform = this.platformGroup.get(
            Phaser.Math.RND.between(0, 600 - platformObject['size']),
            newY
          )

          if (!newPlatform) {
            return
          }
          //Activate and store reference to the last platform so we can place the next on below
          //it.

          newPlatform.setActive(true)
          newPlatform.setVisible(true)
          this.lastCreatedPlatform = newPlatform

          this.checkForStarOverlaps()
          this.checkForPowerupOverlaps()
        }
      })
    } else {
      //If we are ending the game, destroy all platforms that are 'off screen'
      //above and below the player.
      this.platformGroup.children.iterate((platform) => {
        if (!platform) {
          return
        }
        if (
          platform.y > this.player.body.y + 400 ||
          platform.y < this.player.body.y - 800
        ) {
          platform.destroy()
        }
      })
    }
  }

  update() {
    if (this.player.body.velocity.y > 10 && this.player.y > 0) {
      this.scrollingBackground.tilePositionY += 10
      // this.score += 10
      // this.scoreText.setText(`score: ${this.score}`)
      this.updateScore(10)
    }

    this.listenForInput()

    // Platform random generation
    this.recyclePlatforms()

    if (!this.gameEndInProgress) {
      this.starsGroup.children.iterate((star) => {
        if (star !== undefined && star.y < this.player.y - 800) {
          this.starsGroup.killAndHide(star)

          if (!this.gameEndInProgress) {
            // Iterate through, get biggest Y
            const newStarY =
              this.lastCreatedStar.y +
              this.levelConfig.starDistance +
              Phaser.Math.RND.between(0, 100)
            const newStar = this.starsGroup.get(
              Phaser.Math.RND.between(0, 574),
              newStarY
            )

            if (!newStar) {
              return
            }
            newStar.setActive(true)
            newStar.setVisible(true)
            this.lastCreatedStar = newStar
          }
        }
      })
    } else {
      this.starsGroup.children.iterate((star) => {
        if (!star) {
          return
        }
        if (
          star.y > this.player.body.y + 400 ||
          star.y < this.player.body.y - 800
        ) {
          star.destroy()
        }
      })
    }
    this.recyclePowerups()
  }
}
