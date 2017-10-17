import Stage from "./Stage"
import Text from "./Text"
import Sprite from "./Sprite"
import Graphic from "./Graphic"
import Camera from "./Camera"

class State {
  static isState(object) {
    return (object instanceof this) ? true : false
  }

  constructor({boot = () => {}, init, update, game, ...customProps}) {
    this.boot = boot
    this.isBooted = false

    this._init = init

    this._updateCallback = update

    this.game = game

    this.stage = new Stage()

    for(let prop in customProps) {
      this[prop] = customProps[prop]
    }

    if(this.game) {
      this.camera = new Camera({xView: 0, yView: 0, width: this.game.canvas.width, height: this.game.canvas.height})

      this._boot().then(() => {
        this.isBooted = true
        this._init()
      })
    }
  }

  bindGameContext(game) {
    this.game = game

    this.camera = new Camera({xView: 0, yView: 0, width: this.game.canvas.width, height: this.game.canvas.height})

    this._boot().then(() => {
      this.isBooted = true
      this._init()
    })
  }

  add(type, object) {
    let builder, asset

    if(!object.context) {
      object.context = this.game.context
    }

    switch(type) {
      case "sprite":
        builder = Sprite
        break
      case "graphic":
        builder = Graphic
        break
      case "text":
        builder = Text
        break
      default:
        throw new Error("Game object not supported.")
    }

    asset = new builder(object)

    this.stage.add(asset)

    return asset
  }

  _boot() {
    this.boot()

    return this.game.assets.startLoad()
  }

  update(dt) {
    this.camera.update()
    this.stage.update(dt)

    this._updateCallback(dt)
  }

  render() {
    this.stage.render(this.camera.xView, this.camera.yView)
  }
}

export default State
