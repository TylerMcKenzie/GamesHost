import Vector from "./Vector"

class Shape {
  constructor({x = 0, y = 0, rotation = 0}) {
    this.position = new Vector(x, y)
    this.rotation = rotation
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

  rotate(angle) {
    this.rotation += angle
    let rad = angle*Math.PI/180
    let cos = Math.cos(rad)
    let sin = Math.sin(rad)

    this.x = (this.x*cos - this.y*sin)
    this.y = (this.y*sin - this.x*cos)
  }
}

export default Shape
