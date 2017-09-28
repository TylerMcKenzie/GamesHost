class Graphic {
  constructor({x = 0, y = 0, color = "black", context = null, shape = {type: "square", size: 0}, draw = this._draw, update = this._update, render = this._render}) {
    this.color = color

    this.shape = shape

    this.draw = draw
    this.update = update
    this.render = render

    this.context = context
  }

  _update() {

  }

  _draw() {
    this.context.save()

    this.context.restore()
  }

  _render() {
    this.draw()
  }
}

export default Graphic
