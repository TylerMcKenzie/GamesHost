import Renderable from "./Renderable"
import Vector from "./Vector"

class Text extends Renderable {
  constructor({text = "", x = 0, y = 0, context = null, font}) {
    super({x, y})
    this.text = text
    this.context = context

    let defaultFont = Object.assign({}, { fontFamily: "sans-serif", fontSize: 10, textAlign: "start", direction: "inherit", textBaseline: "alphabetic", fill: "fill", color: "black" }, font)
    this.font = defaultFont
  }

  get width() {
    const { fontSize, fontFamily } = this.font
    let width

    this.context.save()
    this.context.font = `${fontSize}px ${fontFamily}`
    width = this.context.measureText(this.text).width
    this.context.restore()

    return width
  }

  update() {

  }

  _draw(x, y) {
    let { fontSize, fontFamily, textAlign, textBaseline, direction, fill, color } = this.font
    this.context.save()
    this.context.font = `${fontSize}px ${fontFamily}`
    this.context.textAlign = textAlign
    this.context.textBaseline =  textBaseline
    this.context.direction = direction

    if(fill === "fill") {
      this.context.fillStyle = color
      this.context.fillText(this.text, x, y)
    } else if(fill === "stroke") {
      this.context.strokeStyle = color
      this.context.strokeText(this.text, x, y)
    }

    this._width = this.context.measureText(this.text).width

    this.context.restore()
  }
}

export default Text
