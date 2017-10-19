import Vector from "./Vector"
import Hitbox from "./Hitbox"
import Renderable from "./Renderable"
import SpriteSheet from "./SpriteSheet"

class Sprite extends Renderable {
  constructor({width = 0, height = 0, color = "black", x = 0, y = 0, z, velX = 0, velY = 0, accX = 0, accY = 0, ttl = 0, update, advance, render, draw, context = null, image = null, spritesheet, origin = "top-left", hitbox}) {
    super({x, y})

    this.z = z

    this.velocity = new Vector(velX, velY)
    this.acceleration = new Vector(accX, accY)

    this.ttl = ttl

    this.context = context

    this.width = width
    this.height = height

    if(hitbox) {
      this.hitbox = new Hitbox(hitbox)
      this.hitbox.x = this.x
      this.hitbox.y = this.y

    }
    else {
      this.hitbox = new Hitbox({type: "rectangle", x: this.x, y: this.y, rotation: 0, width: this.width, height: this.height})
    }

    this.color = color

    this.advance = advance || this._advance

    this.update = function(dt) {
      this._update(dt)

      this.hitbox.x = this.x
      this.hitbox.y = this.y
    }

    this.render = render || this._render


    this._draw = draw || this._draw

    if(image) {
      this._image = image
      this._draw = this._drawImg
    }
    else if(spritesheet) {
      this.spritesheet = new SpriteSheet(spritesheet)

      this._draw = this._drawAnimation
      this.advance = this._advanceAnimation
    }

    this._originLocation = origin
  }

  get velX() {
    return this.velocity.x
  }

  get velY() {
    return this.velocity.y
  }

  get accX() {
    return this.acceleration.x
  }

  get accY() {
    return this.acceleration.y
  }

  get origin() {
    let { x, y } = this.position,
        width = this.width,
        height = this.height

    switch(this._originLocation) {
      case "top-left":
        return { x, y }
        break
      case "top-right":
        return { x: x+width, y: y }
        break
      case "bottom-right":
        return { x: x+width, y: y+height }
        break
      case "bottom-left":
        return { x: x, y: y+height }
        break
      case "top-center":
        return { x: x+(width/2), y: y }
        break
      case "right-center":
        return { x: x+width, y: y+(height/2) }
        break
      case "bottom-center":
        return { x: x+(width/2), y: y+(height) }
        break
      case "left-center":
        return { x: x, y: y+(height/2) }
        break
      case "center":
        return { x: x+(width/2), y: y+(height/2) }
        break
    }
  }

  set velX(value) {
    this.velocity.x = value
  }

  set velY(value) {
    this.velocity.y = value
  }

  set accX(value) {
    this.acceleration.x = value
  }

  set accY(value) {
    this.acceleration.y = value
  }


  _update(dt) {
    this.advance(dt)
  }

  _draw(x, y) {
    this.context.save()
    this.context.fillStyle = this.color
    this.context.fillRect(x, y, this.width, this.height)
    this.context.restore()
  }

  _drawImg(x, y) {
    this.context.save()
    this.context.drawImage(this._image, x, y)
    this.context.restore()
  }

  _drawAnimation(x, y) {
    this.context.save()
    this.spritesheet.currentAnimation._draw(this.context, x, y)
    this.context.restore()
  }

  _advance(dt) {
    this.velocity.add(this.acceleration, dt)
    this.position.add(this.velocity, dt)


    this.ttl--
  }

  _advanceAnimation(dt) {
    this._advance(dt)
    this.spritesheet.currentAnimation.update(dt)
  }

  isAlive() {
    return this.ttl > 0
  }

  collidesWith(object) {
    return this.hitbox.testCollision(object.hitbox)
  }
}

export default Sprite
