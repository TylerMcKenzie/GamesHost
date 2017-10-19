class FrameAnimation {
  constructor({spritesheet, frames, frameRate}) {
    this.spritesheet = spritesheet

    this.frames = frames

    this.frameRate = frameRate

    let { frame } = this.spritesheet
    this.width = frame.width
    this.height = frame.height
    this.margin = frame.margin || 0

    this._current_frame = 0
    this._accumulator = 0
  }

  update(dt = 1/60) {
    dt = dt

    this._accumulator += dt

    while(this._accumulator * this.frameRate >= 1) {
      this._current_frame = ++this._frame % this.frames.length

      this._accumulator -= 1 / this.frameRate 
    }
  }

  render() {

  }
}

export default FrameAnimation
