import background from '../../assets/levels/level-5/background.png'
import platform1 from '../../assets/levels/level-5/platform1.png'
import platform2 from '../../assets/levels/level-5/platform2.png'
import platform3 from '../../assets/levels/level-5/platform3.png'
import platform4 from '../../assets/levels/level-5/platform4.png'
import funny_bit_60_sec_edit from '../../assets/music/funny_bit_60_sec_edit.mp3'
import platformImpact from '../../assets/music/sfx_sounds_falling3.wav'

export default {
  levelName: 'Level 5',
  background: {name: 'background', path: background },
  platformInformation: {platform1: {path: platform1,
    size: 57,
    distance: 75,
    randomY: 50,}, platform2: {path: platform2,
    size: 57,
    distance: 100,
    randomY: 75,}, platform3: {path: platform3,
    size: 57,
    distance: 200,
    randomY: 50,}, platform4: {path: platform4,
    size: 57,
    distance: 100,
    randomY: 50,}},
  platformDistance: 100,
  platformRandomY: 100,
  objectVelocityY: -400,
  starDistance: 900,
  powerups: ['slow', 'fast', 'grow'],
  powerupDistance: 3000,
  music: {
    name: 'funny_bit_60_sec_edit',
    path: funny_bit_60_sec_edit,
  },
  platformSfx: {
    name: 'platform_impact',
    path: platformImpact,
  },
}