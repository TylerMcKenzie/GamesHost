import Vector from "./Vector"

class Renderable {
  constructor({x = 0, y = 0}) {
    this.position = new Vector(x, y)
  }

  get x() {
    return this.position.x
  }

  get y() {
    return this.position.y
  }

  set x(value) {
    this.position.x = value
  }

  set y(value) {
    this.position.y = value
  }

  _draw(x, y) {}

  _render(x = this.x, y = this.y, offX = 0, offY = 0) {
    this._draw(x - offX, y - offY)
  }

}

export default Renderable
