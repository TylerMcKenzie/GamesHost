import Polygon from "./Polygon"

class Square extends Polygon {
  static makeSquareCoordinates(size) {
    let points = []

    points.push({x: 0, y: 0})
    points.push({x: size, y: 0})
    points.push({x: size, y: size})
    points.push({x: 0, y: size})

    return points
  }

  constructor({x, y, rotation, size = 0}) {
    super({x, y, points: Square.makeSquareCoordinates(size), rotation})

    this._size = size
  }

  get size() {
    return this._size
  }

  set size(value) {
    let newPoints = Square.makeSquareCoordinates(value)
    console.log(this.constructor)
  }
}

window.square = new Square({x: 0, y: 0, size: 10})

export default Square
