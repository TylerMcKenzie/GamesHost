import 'BraveEngine'

let startStateProps = {
  init: function() {
    this.x = this.game.canvas.width/2
    this.y = this.game.canvas.height/2
  },
  update: function(dt) {
    this.x += 1
  },
  render: function() {
    this.game.context.save()

    this.game.context.fillStyle = "black"
    this.game.context.fillRect(this.x, this.y, 10, 10)

    this.game.context.restore();
  }
}

let startState = new BraveEngine.State(startStateProps)

window.gameDemo = new BraveEngine.Game(800, 400, "braveengine-demo", "2d", "Demo", startState)

console.log(gameDemo)

// gameDemo.start()