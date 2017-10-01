import Polygon from "./Polygon"

class Square extends Polygon {
  static generateSquareCoordinates(size) {
    let points = []

    points.push({x: 0, y: 0})
    points.push({x: size, y: 0})
    points.push({x: size, y: size})
    points.push({x: 0, y: size})

    return points
  }

  constructor({x, y, rotation, size = 0}) {
    super({x, y, points: Square.generateSquareCoordinates(size), rotation})

    this._size = size
  }

  get size() {
    return this._size
  }

  set size(value) {
    this._size = value

    let newSquarePoints = Square.generateSquareCoordinates(value)
    let newVectorPoints = Square.generateVectorPoints(newSquarePoints)

    this._points = newVectorPoints
  }
}

export default Square
