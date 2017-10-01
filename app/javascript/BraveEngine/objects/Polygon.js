import Shape from "./Shape"
import Vector from "./Vector"

class Polygon extends Shape {
  static generateVectorPoints(vectorArray) {
    return vectorArray.map((point) => new Vector(point.x, point.y))
  }

  constructor({x, y, rotation, points = []}) {
    super({x, y, rotation})

    this._points = Polygon.generateVectorPoints(points)
  }

  get points() {
    return this._points.map((point) => {
      let {x, y} = point
      x += this.x
      y += this.y

      return {x, y}
    })
  }

  hasPoint({x, y}) {
    let hasPoint = false

    for(let i = 0, j = this._points.length-1; i < this._points.length; i++) {
      let { x: px1, y: py1 } = this._points[i]
      let { x: px2, y: py2 } = this._points[j]

      let x1 = px1 + this.x
      let y1 = py1 + this.y
      let x2 = px2 + this.x
      let y2 = py2 + this.y

      if((y1 > y != y2 > y) && (x < (x2-x1)*(y-y1) / (y2 - y1)+x1)) {
        hasPoint = !hasPoint
      }

      j = i
    }

    return hasPoint
  }

  scale(scale) {
    this._points = this._points.map((point) => {
      point.x *= scale
      point.y *= scale

      return point
    })
  }

  rotate(angle) {
    let rad = angle*Math.PI/180
    let cos = Math.cos(rad)
    let sin = Math.sin(rad)

    this._points = this._points.map((point) => {
      let { x, y } = point

      point.x = (x*cos - y*sin)
      point.y = (x*sin + y*cos)

      return point
    })

    this.rotation += angle
  }
}

export default Polygon
