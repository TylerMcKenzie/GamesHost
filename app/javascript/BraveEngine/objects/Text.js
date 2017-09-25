import Vector from "./Vector"

class Text {
  constructor({text = "", x = 0, y = 0, context = null, font}) {
    this.position = new Vector(x, y)
    this.text = text
    this.context = context
    let defaultFont = Object.assign({}, { fontFamily: "sans-serif", fontSize: 10, textAlign: "start", direction: "inherit", textBaseline: "alphabetic", fill: "fill", color: "black" }, font)
    this.font = defaultFont
  }

  get x() {
    return this.position.x
  }

  get y() {
    return this.position.y
  }

  get width() {
    return this.context.measureText(this.text).width
  }

  set x(value) {
    this.position.x = value
  }

  set y(value) {
    this.position.y = value
  }

  update() {

  }

  draw() {
    let { fontSize, fontFamily, textAlign, textBaseline, direction, fill, color } = this.font
    this.context.save()
    this.context.font = `${fontSize}px ${fontFamily}`
    this.context.textAlign = textAlign
    this.context.textBaseline =  textBaseline
    this.context.direction = direction

    if(fill === "fill") {
      this.context.fillStyle = color
      this.context.fillText(this.text, this.x, this.y)
    } else if(fill === "stroke") {
      this.context.strokeStyle = color
      this.context.strokeText(this.text, this.x, this.y)
    }

    this.context.restore()
  }

  render() {
    this.draw()
  }
}

export default Text
