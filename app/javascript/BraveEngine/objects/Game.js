/*
* This is the base class for your game
*
* @class Game
*
* @constructor
* @param width { number|string } [default=800] - The number of pixels wide your canvas element will be. If string then the canvas will be the percent value given inside the parentElement.
* @param height { number|string } [default=400] - The number of pixels high your canvas element will be. If string then the canvas will be the percent value given inside the parentElement.
* @param parentElement { string|HTMLElement } [default=''] - The id of the parentElement or the parentElement node.
* @param renderingContext { string } [default='2d'] - The context in which to set the renderer in.
* @param gameName { string } [default=''] - Name of your game.
*
*/
export default class Game {
  constructor(width = 800, height = 400, parentElement, renderingContext = '2d', gameName = '') {
    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    this.canvas = canvas
    this.context = this.canvas.getContext(renderingContext)

    if(!parentElement || !parentElement.nodeType) {
      throw new Error("A valid id or parentNode is required")
    } else {
      if(parentElement.nodeType) {
        parentElement.appendChild(this.canvas)
      } else if(typeof parentElement === "string") {
        let parentNode = document.getElementById(parentElement)

        if(parentNode) {
          parentNode.appendChild(this.canvas)
        } else {
          throw new Error("Parent Element not found.")
        }
      }
    }

    this.name = gameName
    this.context.fillStyle = "black"
    this.context.fillRect(0,0,this.canvas.width, this.canvas.height)
  }
}
