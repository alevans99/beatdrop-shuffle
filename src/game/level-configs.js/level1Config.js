import background from '../../assets/levels/level-1/background.png'
import platform1 from '../../assets/levels/level-1/platform1.png'
import lets_go_60_sec from '../../assets/music/lets_go_60_sec.mp3'
import platformImpact from '../../assets/music/sfx_sounds_falling3.wav'
export default {
  levelName: 'Level 1',
  background: {name: 'background', path: background },
  platformInformation: {platform1: {path: platform1,
    size: 260,
    distance: 900,
    randomY: 100,}},
  platformDistance: 1000,
  platformRandomY: 300,
  objectVelocityY: -400,
  starDistance: 900,
  powerups: ['slow', 'fast', 'grow'],
  powerupDistance: 3000,
  music: {
    name: 'lets_go_60_sec',
    path: lets_go_60_sec,
  },
  platformSfx: {
    name: 'platform_impact',
    path: platformImpact,
  },
}