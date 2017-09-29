import 'BraveEngine'

let startStateProps = {
  init: function() {
  },
  update: function(dt) {
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

