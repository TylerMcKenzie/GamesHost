import 'BraveEngine'

let startStateProps = {
  init: function() {
    this.spriteTest = new BraveEngine.Sprite({width:50, height: 50, x: this.game.canvas.width/2, y: this.game.canvas.height/2, context: this.game.context})

    this.width = 50
    this.height = 50

    this.vX = 100
    this.vY = 100
    console.log(this.spriteTest)
  },
  update: function(dt) {
    if(this.x+this.width > this.game.canvas.width) {
      this.vX *= -1
    }

    if(this.x < 0) {
      this.vX *= -1
    }

    if(this.y+this.height > this.game.canvas.height) {
      this.vY *= -1
    }

    if(this.y < 0) {
      this.vY *= -1
    }

    this.x += this.vX*dt
    this.y += this.vY*dt
  },
  render: function() {
    this.game.context.save()

    this.game.context.fillStyle = "black"
    this.game.context.fillRect(this.x, this.y, this.width, this.height)

    this.game.context.restore();
  }
}

let startState = new BraveEngine.State(startStateProps)



window.gameDemo = new BraveEngine.Game(600, 400, "braveengine-demo", "2d", "Demo", startState)



console.log(gameDemo)

gameDemo.start()

window.addEventListener("focus", function(e) {
  gameDemo.resume()
})
