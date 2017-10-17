/*
* This is the base class for your game
*
* @class Game
*
* @constructor
* @param width { number|string } - The number of pixels wide your canvas element will be. If string then the canvas will be the percent value given inside the parentElement.
* @param height { number|string } - The number of pixels high your canvas element will be. If string then the canvas will be the percent value given inside the parentElement.
* @param parentElement { string|HTMLElement } [default=''] - The id of the parentElement or the parentElement node.
* @param renderingContext { string } [default='2d'] - The context in which to set the renderer in.
* @param gameName { string } [default=''] - Name of your game.
*
*/
import StateManager from "./StateManager"
import AssetManager from "./AssetManager"

class Game {
  constructor(width, height, parentElement, renderingContext, gameName = "", startState, assetsConfig = {}) {
    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    this.canvas = canvas
    this.context = this.canvas.getContext(renderingContext)

    if(!parentElement.nodeType && typeof parentElement !== "string") {
      throw new Error("A valid id or parentNode is required")
    }
    else {
      if(parentElement.nodeType) {
        parentElement.appendChild(this.canvas)
      }
      else if(typeof parentElement === "string") {
        let parentNode = document.getElementById(parentElement)

        if(parentNode) {
          parentNode.appendChild(this.canvas)
        }
        else {
          throw new Error("Parent Element not found.")
        }
      }
    }

    this.name = gameName

    this.state = new StateManager(this)

    this.assets = new AssetManager(assetsConfig)

    /*
    * Private Variables for class @Game
    */
    this._isPaused = false

    if(startState) {
      this.state.add('Default', startState, true)
    }
  }

  start() {
    if(!this.state.current) {
      throw new Error("Default State has not been set.")
    }

    let rAF,
        now,
        last = window.performance.now(),
        dt = 0,
        step = 1/60,
        delta = 1E3/60,
        accumulator = delta

    let frame = () => {
      now = window.performance.now()
      dt = now - last
      last = now

      if(dt > 1E3) {
        this.pause()
        return
      }

      accumulator += dt

      while(accumulator >= delta) {
        if(this.state.current.isBooted) {
          this.state.current.update(step)
        }

        accumulator -= delta
      }

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

      if(this.state.current.isBooted) {
        this.state.current.render()
      }

      if(!this.isPaused) {
        rAF = window.requestAnimationFrame(frame)
      }
      else {
        window.cancelAnimationFrame(rAF)
      }
    }

    window.requestAnimationFrame(frame)
  }

  get isPaused() {
    return this._isPaused
  }

  pause() {
    this._isPaused = true
  }

  resume() {
    this._isPaused = false

    this.start()
  }
}

export default Game
