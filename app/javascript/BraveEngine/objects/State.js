class State {
  static isState(object) {
    return (object instanceof this) ? true : false
  }

  constructor({init, update, render, game, ...customFuncs}) {
    this.init = init
    this.update = update
    this.render = render

    this.game = game

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
}

export default State
