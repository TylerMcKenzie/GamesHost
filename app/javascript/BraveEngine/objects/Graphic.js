class Graphic {
  constructor({x = 0, y = 0, color = "black", shape = "rect", context = null, draw = this._draw, update = this._update}) {
    this._shape = shape

    this.color = color
    this.draw = draw
    this.update = update

    this.context = context
  }

  _update() {

  }

  _draw() {
    this.context.save()

    this.context.restore()
  }

  render() {
    this.draw
  }
}

export default Graphic
