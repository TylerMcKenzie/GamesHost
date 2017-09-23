import Stage from "./Stage"

class State {
  static isState(object) {
    return (object instanceof this) ? true : false
  }

  constructor({init, update, render, game, ...customFuncs}) {
    this.init = init
    this._update = update

    this.game = game

    this.stage = new Stage(this.game)

    for(let func in customFuncs) {
      this[func] = customFuncs[func]
    }

    if(this.game) {
      this.init()
    }
  }

  bindGameContext(game) {
    this.game = game

    this.init()
  }

  update(dt) {
    this.stage.update(dt)

    this._update(dt)
  }

  render() {
    this.stage.render()
  }
}

export default State
