import Renderable from "./Renderable"
import ShapeManager from "./ShapeManager"
import Vector from "./Vector"

class Graphic extends Renderable{
  constructor({x = 0, y = 0, color = "black", shape, context = null, update = (dt) => {}}) {
    super({x, y})
    this.color = color

    shape.x = this.x
    shape.y = this.y

    this.shape = ShapeManager.shape(shape)
    this._shapeType = shape.type

    this.update = (dt) => {
      update(dt)

      this._update(dt)
    }

    this.context = context
  }

  _update() {
    this.shape.x = this.x
    this.shape.y = this.y
  }

  _draw(x, y) {
    this.context.save()
    this.context.beginPath()
    this.context.fillStyle = this.color

    if(this._shapeType === "circle") {
      this.context.arc(x, y, this.shape.radius, 0, Math.PI*2, false)
    } else {
      this.shape.points.map((point) => {
        this.context.lineTo(point.x, point.y)
      })
    }

    this.context.closePath()
    this.context.fill()
    this.context.restore()
  }
}

export default Graphic
