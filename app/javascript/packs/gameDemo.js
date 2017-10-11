import 'BraveEngine'

let startStateProps = {
  init: function() {
    this.red = this.add("sprite", {
      x: (this.game.canvas.width/2),
      y: (this.game.canvas.height/2),
      width: 50,
      height: 50,
      velX: 0,
      color: "red",
      // hitbox: {type: "polygon", points: [{x: 0, y: 0}, {x: 20, y: -20}, {x: 40, y: -30}, {x: 40, y: 40}, {x: 20, y: 40}]},
      draw: function(x, y) {
        this.context.save()
        this.context.fillStyle = this.color
        this.context.beginPath()
        for(let point of this.hitbox.shape.points) {
          this.context.lineTo((x - this.hitbox.shape.x) + point.x, (y - this.hitbox.shape.y) + point.y)
        }
        this.context.closePath()
        this.context.fill()
        this.context.restore()
      }
    })

    this.red.hitbox.shape.rotate(5)

    this.blue = this.add("sprite", {
      x: (this.game.canvas.width/2),
      y: (this.game.canvas.height/2)-100,
      hitbox: {
        type: "circle",
        radius: 20
      },
      velY: -50,
      color: "blue",
      draw: function(x, y) {
        this.context.save()
        this.context.beginPath()
        this.context.fillStyle = this.color
        this.context.arc(x, y, 20, 0, Math.PI*2, false)
        this.context.closePath()
        this.context.fill()
        this.context.restore()
      }
    })

    this.blue2 = this.add("sprite", {
      x: (this.game.canvas.width/2)-150,
      y: (this.game.canvas.height/2)-100,
      hitbox: {
        type: "circle",
        radius: 15
      },
      velX: -50,
      color: "lightblue",
      draw: function(x, y) {
        this.context.save()
        this.context.beginPath()
        this.context.fillStyle = this.color
        this.context.arc(x, y, 15, 0, Math.PI*2, false)
        this.context.closePath()
        this.context.fill()
        this.context.restore()
      }
    })

    this.camera.follow(this.blue)
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

    if(this.blue.y-20 < 0) {
      this.blue.velY *= -1
    }

    if(this.blue.y+20 > this.game.canvas.height) {
      this.blue.velY *= -1
    }

    if(this.blue2.x+20 > rightBound) {
      this.blue2.velX *= -1
    }

    if(this.blue2.x-20 < 0) {
      this.blue2.velX *= -1
    }

    // console.log(this.red.collidesWith(this.blue))
    // if(this.blue.collidesWith(this.blue2)) {
    //   this.blue.velX = 0
    //   this.blue2.velX = 0
    // }

    if(this.blue.collidesWith(this.red)) {
      this.blue.velY = 0
      this.red.velX = 0
    }
  }
}

let startState = new BraveEngine.State(startStateProps)



window.gameDemo = new BraveEngine.Game(window.innerWidth, 400, "braveengine-demo", "2d", "Demo", startState)

// console.log(gameDemo)

gameDemo.start()


window.addEventListener("focus", function(e) {
  if(gameDemo.isPaused) {
    gameDemo.resume()
  }
})

