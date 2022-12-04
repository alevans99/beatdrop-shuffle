import level1Config from '../level-configs.js/level1Config'
import level2Config from '../level-configs.js/level2Config'
import level3Config from '../level-configs.js/level3Config'
import level4Config from '../level-configs.js/level4Config'
import level5Config from '../level-configs.js/level5Config'

/**
 * Returns the config object for the level requested
 */
export default (levelName) => {

  return {
    'level1': level1Config,
    'level2':level2Config,
    'level3':level3Config,
    'level4':level4Config,
    'level5':level5Config
  }[levelName]

}