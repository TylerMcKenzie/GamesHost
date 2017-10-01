/*
* @author Tyler McKenzie
*/

/*
* World Building Objects
*/
import Game  from "./objects/Game.js"
import State from "./objects/State.js"

/*
* World Elements
*/
// import Physics2D from './elements/Physics2D.js'


/*
* Game Centered Objects
*/
import Sprite  from "./objects/Sprite.js"
import Text    from "./objects/Text.js"
import Graphic from "./objects/Graphic.js"

const BraveEngine = {
  Game,
  State,
  Sprite,
  Text,
  Graphic
}

export default BraveEngine
