import fast from '../../assets/powerups/fast.png'
import slow from '../../assets/powerups/slow.png'
import grow from '../../assets/powerups/grow.png'

export default (powerupName) => {
  return {fast, slow, grow}[powerupName]
}