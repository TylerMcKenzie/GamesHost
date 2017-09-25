import Polygon from "./Polygon"

class Rectangle extends Polygon {
  static makeRectanglePoints(width, height) {
    let points = []

    points.push({ x: 0, y: 0 })
    points.push({ x: width, y: 0 })
    points.push({ x: width, y: height })
    points.push({ x: 0, y: height })

    return points
  }

  contructor({x, y, width = 0, height = 0, rotation}) {
    super({x, y, points: Rectangle.makeRectanglePoints(width,height) rotation})
    this.width = width
    this.height = height
  }
}

export default Rectangle
