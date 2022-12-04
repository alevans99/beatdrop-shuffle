import background from '../../assets/levels/level-3/background.png'
import platform1 from '../../assets/levels/level-3/platform1.png'
import platform2 from '../../assets/levels/level-3/platform2.png'
import platform3 from '../../assets/levels/level-3/platform3.png'
import bass_trap_60_sec from '../../assets/music/bass_trap_60_sec.mp3'
import platformImpact from '../../assets/music/sfx_sounds_falling3.wav'

export default {
  levelName: 'Level 3',
  background: {name: 'background', path: background },
  platformInformation: {platform1: {path: platform1,
    size: 83,
    distance: 100,
    randomY: 100,}, platform2: {path: platform2,
    size: 40,
    distance: 100,
    randomY: 100,}, platform3: {path: platform3,
    size: 117,
    distance: 100,
    randomY: 100,}},
  platformDistance: 1000,
  platformRandomY: 300,
  objectVelocityY: -400,
  starDistance: 900,
  powerups: ['slow', 'fast', 'grow'],
  powerupDistance: 3000,
  music: {
    name: 'bass_trap_60_sec',
    path: bass_trap_60_sec,
  },
  platformSfx: {
    name: 'platform_impact',
    path: platformImpact,
  },
}