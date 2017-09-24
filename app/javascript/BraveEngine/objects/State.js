import Stage from "./Stage"
import Text from "./Text"
import Sprite from "./Sprite"
import Graphic from "./Graphic"

class State {
  static isState(object) {
    return (object instanceof this) ? true : false
  }

  constructor({init, update, game, ...customProps}) {
    this._init = init
    this._updateCallback = update

    this.game = game

    this.stage = new Stage()

    for(let prop in customProps) {
      this[prop] = customProps[prop]
    }

    if(this.game) {
      this._init()
    }
  }

  bindGameContext(game) {
    this.game = game

    this._init()
  }

  add(object) {



    this.stage.add(object)
  }

  update(dt) {
    this.stage.update(dt)

    this._updateCallback(dt)
  }

  render() {
    this.stage.render()
  }
}

export default State
