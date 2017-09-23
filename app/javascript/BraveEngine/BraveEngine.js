/*
* @author Tyler McKenzie
*/

/*
* World Building Objects
*/
import Game  from "./objects/Game.js"
import State from "./objects/State.js"
import Stage from "./objects/Stage.js"

/*
* World Elements
*/
// import Physics2D from './elements/Physics2D.js'


/*
* Game Centered Objects
*/
import Text    from "./objects/Text.js"
import Graphic from "./objects/Graphic.js"
import Sprite  from "./objects/Sprite.js"

const BraveEngine = {
  Game,
  State,
  Stage,
  Sprite,
  Text,
  Graphic
}

export default BraveEngine
