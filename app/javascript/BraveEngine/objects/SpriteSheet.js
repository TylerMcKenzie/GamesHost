import FrameAnimation from "./FrameAnimation"

class SpriteSheet {
  constructor({animations = {}, image, frameWidth, frameHeight, frameMargin = 0}) {
    if(!image) {
      throw new Error(`An image must be provided for the SpriteSheet, got ${image}`)
    }

    this.image = image

    this.animations = animations

    this.frame = {
      width: frameWidth,
      height: frameHeight,
      margin: frameMargin
    }

    this.framesPerRow = this.image.width / this.frame.width || 0

    this.currentAnimation = null

    this.generateAnimations(this.animations)
  }

  playAnimation(name) {
    this.currentAnimation.reset()

    this.currentAnimation = this.animations[name]
  }

  generateAnimations(animations) {
    for(let name in animations) {
      let { frames, frameRate } = animations[name]

      this.animations[name] = new FrameAnimation({ spritesheet: this, frames: frames, frameRate: frameRate })

      if(!this.currentAnimation) {
        this.currentAnimation = this.animations[name]
      }
    }
  }
}

export default SpriteSheet
