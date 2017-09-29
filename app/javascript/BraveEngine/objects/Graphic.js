import ShapeManager from "./ShapeManager"

class Graphic {
  constructor({x = 0, y = 0, color = "black", shape, context = null, update = (dt) => {}}) {
    this.x = x
    this.y = y

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

  _draw() {
    this.context.save()
    this.context.beginPath()
    this.context.fillStyle = this.color

    if(this._shapeType === "circle") {
      this.context.arc(this.x, this.y, this.shape.radius, 0, Math.PI*2, false)
    } else {
      this.shape.points.map((point) => {
        this.context.lineTo(this.shape.x+point.x, this.shape.y+point.y)
      })
    }

    this.context.closePath()
    this.context.fill()
    this.context.restore()
  }

  render() {
    this._draw()
  }
}

export default Graphic
