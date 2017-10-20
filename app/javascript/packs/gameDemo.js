import 'BraveEngine'

let startStateProps = {
  boot: function() {
    // this.game.assets.load('break', 'brick_destroy.wav')
    // this.game.assets.load('screenshot', 'screenshot.png')
    this.game.assets.load('ball', 'ball_bounce_spritesheet.png')
  },
  init: function() {
    this.ball = this.add("sprite", {
      x: 0,
      y: 0,
      // velX: 400,
      spritesheet: {
        image: this.game.assets.images.ball,
        frameWidth: 400,
        frameHeight: 400,
        animations: {
          bounce: {
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10
          },
          idle: {
            frames: [3, 2, 1, 0]
          }
        }
      },
      width: 400,
      height: 400,
      color: "red"
    })
    console.log(this.ball)
    // this.red = this.add("sprite", {
    //   image: this.game.assets.images.screenshot,
    //   x: (this.game.canvas.width/2),
    //   y: (this.game.canvas.height/2),
    //   width: 50,
    //   height: 50,
    //   velX: 0,
    //   color: "red",
    //   // hitbox: {type: "polygon", points: [{x: 0, y: 0}, {x: 20, y: -20}, {x: 40, y: -30}, {x: 40, y: 40}, {x: 20, y: 40}]},
    //   draw: function(x, y) {
    //     this.context.save()
    //     this.context.fillStyle = this.color
    //     this.context.beginPath()
    //     for(let point of this.hitbox.shape.points) {
    //       this.context.lineTo((x - this.hitbox.shape.x) + point.x, (y - this.hitbox.shape.y) + point.y)
    //     }
    //     this.context.closePath()
    //     this.context.fill()
    //     this.context.restore()
    //   }
    // })

    // this.blue = this.add("sprite", {
    //   x: (this.game.canvas.width/2)+30,
    //   y: (this.game.canvas.height/2)-100,
    //   hitbox: {
    //     type: "circle",
    //     radius: 20
    //   },
    //   velY: -100,
    //   color: "blue",
    //   draw: function(x, y) {
    //     this.context.save()
    //     this.context.beginPath()
    //     this.context.fillStyle = this.color
    //     this.context.arc(x, y, 20, 0, Math.PI*2, false)
    //     this.context.closePath()
    //     this.context.fill()
    //     this.context.restore()
    //   }
    // })

    // this.blue2 = this.add("sprite", {
    //   x: (this.game.canvas.width/2)-150,
    //   y: (this.game.canvas.height/2)-100,
    //   hitbox: {
    //     type: "circle",
    //     radius: 15
    //   },
    //   velX: -150,
    //   color: "lightblue",
    //   draw: function(x, y) {
    //     this.context.save()
    //     this.context.beginPath()
    //     this.context.fillStyle = this.color
    //     this.context.arc(x, y, 15, 0, Math.PI*2, false)
    //     this.context.closePath()
    //     this.context.fill()
    //     this.context.restore()
    //   }
    // })

    // this.camera.follow(this.blue)
  },
  update: function(dt) {
    let leftBound = 0
    let rightBound = this.game.canvas.width

    if(this.ball.x < leftBound) {
      this.ball.velX *= -1
    }
    else if (this.ball.x+this.ball.width > rightBound ) {
      this.ball.velX *= -1
    }

    // if(this.red.x+this.red.width > rightBound) {
    //   this.red.velX *= -1
    // }

    // if(this.red.x < 0) {
    //   this.red.velX *= -1
    // }

    // if(this.blue.x+20 > rightBound) {
    //   this.blue.velX *= -1
    // }

    // if(this.blue.x-20 < 0) {
    //   this.blue.velX *= -1
    // }

    // if(this.blue.y-20 < 0) {
    //   this.blue.velY *= -1
    // }

    // if(this.blue.y+20 > this.game.canvas.height) {
    //   this.blue.velY *= -1
    // }

    // if(this.blue2.x+20 > rightBound) {
    //   this.blue2.velX *= -1
    // }

    // if(this.blue2.x-20 < 0) {
    //   this.blue2.velX *= -1
    // }

    // console.log(this.red.collidesWith(this.blue))
    // if(this.blue.collidesWith(this.blue2)) {
    //   this.blue.velX = 0
    //   this.blue2.velX = 0
    // }

    // if(this.blue.collidesWith(this.red)) {
    //   this.blue.velY = 0
    //   this.red.velX = 0
    // }
  }
}

let startState = new BraveEngine.State(startStateProps)

let assetsConfig = {
  audioPath: 'sounds',
  imagePath: 'images'
}

window.gameDemo = new BraveEngine.Game(800, 600, "braveengine-demo", "2d", "Demo", startStateProps, assetsConfig)

// console.log(gameDemo)

gameDemo.start()


window.addEventListener("focus", function(e) {
  if(gameDemo.isPaused) {
    gameDemo.resume()
  }
})

