export default class State {
  constructor(init, update, render) {
    this.init = init || function() {}
    this.update = update || function() {}
    this.render = render || function() {}
  }
}
