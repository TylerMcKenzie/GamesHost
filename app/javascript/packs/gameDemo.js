import 'BraveEngine'

let startStateProps = {
  init: function() {
    this.red = this.add("sprite", {x: (this.game.canvas.width/2)-50, y: this.game.canvas.height/2, width: 50, height: 50, velX: 50, color: "red"})

    this.blue = this.add("sprite", {
      x: (this.game.canvas.width/2)+50,
      y: (this.game.canvas.height/2)+20,
      hitbox: {type: "circle", radius: 20},
      velX: -50,
      color: "blue",
      draw: function() {
        this.context.save()
        this.context.beginPath()
        this.context.fillStyle = this.color
        this.context.arc(this.x, this.y, 20, 0, Math.PI*2, false)
        this.context.closePath()
        this.context.fill()
        this.context.restore()
      }
    })
  },
  update: function(dt) {
    let leftBound = 0
    let rightBound = this.game.canvas.width

    if(this.red.x+this.red.width > rightBound) {
      this.red.velX *= -1
    }

    if(this.red.x < 0) {
      this.red.velX *= -1
    }

    if(this.blue.x+20 > rightBound) {
      this.blue.velX *= -1
    }

    if(this.blue.x-20 < 0) {
      this.blue.velX *= -1
    }

    // console.log(this.red.collidesWith(this.blue))
    if(this.red.collidesWith(this.blue)) {
      this.red.velX = 0
      this.blue.velX = 0
    }

    this.red.update(dt)
    this.blue.update(dt)
  }
}

let startState = new BraveEngine.State(startStateProps)



window.gameDemo = new BraveEngine.Game(600, 400, "braveengine-demo", "2d", "Demo", startState)

// console.log(gameDemo)

gameDemo.start()


window.addEventListener("focus", function(e) {
  if(gameDemo.isPaused) {
    gameDemo.resume()
  }
})

