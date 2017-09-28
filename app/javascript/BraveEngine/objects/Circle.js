import Shape from "./Shape"

class Circle extends Shape {
  constructor({x, y, rotation, radius = 0}) {
    super({x, y, rotation})

    this._radius = radius
  }

  get radius() {
    return this._radius
  }

  set radius(value) {
    this._radius = value
  }

  hasPoint({x, y}) {
    let dx = x - this.x
    let dy = y - this.y

    let distance = Math.sqrt(dx*dx + dy*dy)

    if(distance < this._radius) {
      return true
    }

    return false
  }

  scale(scale) {
    this._radius *= scale
  }
}

let circle = new Circle({x: 0, y: 0, radius: 10})

window.circle = circle

export default Circle
