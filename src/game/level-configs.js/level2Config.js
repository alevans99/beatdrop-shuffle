import background from '../../assets/levels/level-2/background.png'
import platform1 from '../../assets/levels/level-2/platform1.png'
import platform2 from '../../assets/levels/level-2/platform2.png'
import platform3 from '../../assets/levels/level-2/platform3.png'
import partying_in_russia_60_sec from '../../assets/music/partying_in_russia_60_sec.mp3'
import platformImpact from '../../assets/music/sfx_sounds_falling3.wav'

export default {
  levelName: 'Level 2',
  background: {name: 'background', path: background },
  platformInformation: {platform1: {path: platform1,
    size: 57,
    distance: 300,
    randomY: 100,}, platform2: {path: platform2,
    size: 57,
    distance: 100,
    randomY: 100,}, platform3: {path: platform3,
    size: 57,
    distance: 200,
    randomY: 100,}},
  platformDistance: 1000,
  platformRandomY: 300,
  objectVelocityY: -400,
  starDistance: 1000,
  powerups: ['slow', 'fast', 'grow'],
  powerupDistance: 3000,
  music: {
    name: 'partying_in_russia_60_sec',
    path: partying_in_russia_60_sec,
  },
  platformSfx: {
    name: 'platform_impact',
    path: platformImpact,
  },
}
