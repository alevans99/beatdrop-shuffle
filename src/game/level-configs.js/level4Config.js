import background from '../../assets/levels/level-4/background.png'
import platform1 from '../../assets/levels/level-4/platform1.png'
import platform2 from '../../assets/levels/level-4/platform2.png'
import platform3 from '../../assets/levels/level-4/platform3.png'
import boss_time_60_sec from '../../assets/music/boss_time_60_sec.mp3'
import platformImpact from '../../assets/music/sfx_sounds_falling3.wav'

export default {
  levelName: 'Level 4',
  background: {name: 'background', path: background },
  platformInformation: {platform1: {path: platform1,
    size: 260,
    distance: 100,
    randomY: 100,}, platform2: {path: platform2,
    size: 57,
    distance: 100,
    randomY: 100,}, platform3: {path: platform3,
    size: 57,
    distance: 100,
    randomY: 100,}},
  platformDistance: 200,
  platformRandomY: 100,
  objectVelocityY: -600,
  starDistance: 1200,
  powerups: ['slow', 'fast', 'grow'],
  powerupDistance: 3000,
  music: {
    name: 'boss_time_60_sec',
    path: boss_time_60_sec,
  },
  platformSfx: {
    name: 'platform_impact',
    path: platformImpact,
  },
}