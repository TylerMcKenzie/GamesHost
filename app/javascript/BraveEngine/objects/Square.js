import Polygon from "./Polygon"

class Square extends Polygon {
  static makeSquareCoordinates(size) {
    let points = []

    let i = 0
    while(i < 4) {
      let point = {}

      console.log(i)
      console.log(size % i | 0)

      points.push(point)
      i++
    }

    return points
  }
  constructor({x, y, size, rotation}) {
    let points = Square.makeSquareCoordinates(size)
    super({x, y, points, rotation})

  }

}

window.square = new Square({x: 0, y: 0, size: 10})

export default Square
