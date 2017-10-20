class FrameAnimation {
  constructor({spritesheet, frames, frameRate}) {
    this.spritesheet = spritesheet

    this.frames = frames

    this.frameRate = frameRate

    let { frame } = this.spritesheet
    this.width = frame.width
    this.height = frame.height
    this.margin = frame.margin || 0

    this._currentFrame = 0
    this._accumulator = 0
  }

  reset() {
    this._currentFrame = 0
    this._accumulator = 0
  }

  update(dt = 1/60) {
    dt = dt

    this._accumulator += dt

    while(this._accumulator * this.frameRate >= 1) {
      this._currentFrame = ++this._currentFrame % this.frames.length

      this._accumulator -= 1 / this.frameRate
    }
  }

  _draw(context, x, y) {
    let row = this.frames[this._currentFrame] / this.spritesheet.framesPerRow | 0;
    let col = this.frames[this._currentFrame] % this.spritesheet.framesPerRow | 0;

    context.drawImage(
      this.spritesheet.image,
      col * this.width + (col * 2 + 1) * this.margin,
      row * this.height + (row * 2 + 1) * this.margin,
      this.width, this.height,
      x, y,
      this.width, this.height
    );
  }
}

export default FrameAnimation
