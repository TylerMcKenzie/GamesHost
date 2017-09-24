import Vector from "./Vector"

class Sprite {
  constructor({width = 0, height = 0, color = "black", x = 0, y = 0, z, velX = 0, velY = 0, accX = 0, accY = 0, ttl = 0, update = this._update, render = this._render, draw = this._draw, context = null, image = null}) {
    this.position = new Vector(x, y)
    this.velocity = new Vector(velX, velY)
    this.acceleration = new Vector(accX, accY)
    this.zIndex = z
    this.ttl = ttl
    this.context = context

    this.width = width
    this.height = height

    this.color = color

    this.update = update
    this.render = render
    this.draw = draw

    this._image = image
  }

  get x() {
    return this.position.x
  }

  get y() {
    return this.position.y
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

  set x(value) {
    this.position.x = value
  }

  set y(value) {
    this.position.y = value
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
    this._advance(dt)
  }

  _render() {
    this.draw()
  }

  _draw() {
    this.context.save()
    this.context.fillStyle = this.color
    this.context.fillRect(this.x, this.y, this.width, this.height)
    this.context.restore()
  }

  _advance(dt) {
    this.velocity.add(this.acceleration, dt)
    this.position.add(this.velocity, dt)

    this.ttl--
  }
}

export default Sprite
