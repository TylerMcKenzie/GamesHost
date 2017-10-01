import Polygon from "./Polygon"

class Rectangle extends Polygon {
  static generateRectanglePoints(width, height) {
    let points = []

    points.push({ x: 0, y: 0 })
    points.push({ x: width, y: 0 })
    points.push({ x: width, y: height })
    points.push({ x: 0, y: height })

    return points
  }

  constructor({x, y, width = 0, height = 0, rotation}) {
    super({x, y, points: Rectangle.generateRectanglePoints(width, height), rotation})
    this._width = width
    this._height = height
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  set width(value) {
    this._width = value

    let newRectanglePoints = Rectangle.generateRectanglePoints(value, this._height)
    let newVectorPoints = Rectangle.generateVectorPoints(newRectanglePoints)

    this._points = newVectorPoints
  }

  set height(value) {
    this._height = value

    let newRectanglePoints = Rectangle.generateRectanglePoints(this._width, value)
    let newVectorPoints = Rectangle.generateVectorPoints(newRectanglePoints)

    this._points = newVectorPoints
  }
}

export default Rectangle
