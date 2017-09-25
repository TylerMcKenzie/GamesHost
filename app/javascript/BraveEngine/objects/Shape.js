import Vector from "./Vector"

class Shape {
  constructor({x = 0, y = 0, width = 0, height = 0, rotation = 0, color = "black"}) {
    this.position = new Vector(x, y)
    this.width = width
    this.height = height
    this.rotation = rotation
    this.color = color
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
}

export default Shape
