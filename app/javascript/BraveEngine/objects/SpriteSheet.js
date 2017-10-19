import FrameAnimation from "./FrameAnimation"

class SpriteSheet {
  constructor({spritesheet, animations = {}, image, frameWidth, frameHeight, frameMargin}) {
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
  }
}

export default SpriteSheet
