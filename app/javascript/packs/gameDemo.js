import 'BraveEngine'

let startStateProps = {
  init: function() {
    this.spriteTest = new BraveEngine.Sprite({color: "red", width:50, height: 50, x: this.game.canvas.width/2, y: this.game.canvas.height/2, velX: 200, velY: 200, context: this.game.context, ttl: 100})

    console.log(this.spriteTest)
  },
  update: function(dt) {
    if(this.spriteTest.x+this.spriteTest.width > this.game.canvas.width) {
      this.spriteTest.velX *= -1
    }

    if(this.spriteTest.x < 0) {
      this.spriteTest.velX *= -1
    }

    if(this.spriteTest.y+this.spriteTest.height > this.game.canvas.height) {
      this.spriteTest.velY *= -1
    }

    if(this.spriteTest.y < 0) {
      this.spriteTest.velY *= -1
    }

    this.spriteTest.update(dt)
  },
  render: function() {
    this.spriteTest.render()
  }
}

let startState = new BraveEngine.State(startStateProps)



window.gameDemo = new BraveEngine.Game(600, 400, "braveengine-demo", "2d", "Demo", startState)



console.log(gameDemo)

gameDemo.start()

window.addEventListener("focus", function(e) {
  if(gameDemo.isPaused) {
    gameDemo.resume()
  }
})

