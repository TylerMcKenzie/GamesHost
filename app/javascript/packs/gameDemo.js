import 'BraveEngine'

let startStateProps = {
  init: function() {
    this.spriteTest1 = this.add("sprite", {color: "red", width: 50, height: 50, x: this.game.canvas.width/2, y: this.game.canvas.height/2, velX: 200, velY: 200, ttl: 100})

    this.spriteTest2 = this.add("sprite", {color: "blue", width: 50, height: 50, x: this.game.canvas.width/2, y: this.game.canvas.height/2, velX: 100, velY: 200, ttl: 50})

    this.text1 = this.add("text", { text: "Hello Text1.", x: this.game.canvas.width/2, y: this.game.canvas.height/2, font: { fontSize: 50, color: "green", textAlign: "center" }})
  },
  update: function(dt) {
    if(this.spriteTest1.x+this.spriteTest1.width > this.game.canvas.width) {
      this.spriteTest1.velX *= -1
    }

    if(this.spriteTest1.x < 0) {
      this.spriteTest1.velX *= -1
    }

    if(this.spriteTest1.y+this.spriteTest1.height > this.game.canvas.height) {
      this.spriteTest1.velY *= -1
    }

    if(this.spriteTest1.y < 0) {
      this.spriteTest1.velY *= -1
    }

    if(this.spriteTest2.x+this.spriteTest2.width > this.game.canvas.width) {
      this.spriteTest2.velX *= -1
    }

    if(this.spriteTest2.x < 0) {
      this.spriteTest2.velX *= -1
    }

    if(this.spriteTest2.y+this.spriteTest2.height > this.game.canvas.height) {
      this.spriteTest2.velY *= -1
    }

    if(this.spriteTest2.y < 0) {
      this.spriteTest2.velY *= -1
    }
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

