import State from "./State"

export default class StateManager {
  constructor(game) {
    this.states = {}
    this._current = null
    this._gameBinding = game
  }

  add(key, object, autoStart) {
    if(typeof key !== "string") {
      throw new Error(`State key needs to be a string. Got ${typeof key} instead.`);
    }

    if(typeof object !== "object" && !State.isState(object)) {
      throw new Error(`State object needs to be an object or instance of BraveEnginge.State. Got ${typeof key} instead.`);
    } else {
      if(State.isState(object)) {
        object.bindGameContext(this._gameBinding)

        this.states[key] = object
      } else {
        if(!object.init) {
          throw new Error(`State requires an init function`)
        }

        if(!object.update) {
          throw new Error(`State requires an update function`)
        }

        // if(!object.render) {
          // throw new Error(`State requires a render function`)
        // }

        object.game = this._gameBinding

        let state = new State(object)

        this.states[key] = state
      }

      if(autoStart !== undefined && autoStart) {
        this._current = this.states[key]
      }

    }
  }

  remove(key) {
    if(this.states[key]) {
      delete this.states[key]
    } else {
      throw new Error(`State ${key} not found.`)
    }
  }

  get current() {
    return this._current
  }

  setCurrent(key) {
    if(this.states[key]) {
      this._current = this.states[key]
    } else {
      throw new Error(`State '${key}' not found.`)
    }
  }

  update(step) {
    this.current.update(step)
  }

  render() {
    this.current.render()
  }
}
