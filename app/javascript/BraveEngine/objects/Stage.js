class Stage {
  constructor() {
    this._children = []

  }

  sortChildren() {
    this._children = this._children.sort(function(child1, child2) {
      return child1.zIndex - child2.zIndex
    })
  }

  bringToFront(sprite) {
    let child = this._children[this.getChildIndex(sprite)]
  }

  sendToBack(sprite) {
    let child = this._children[this.getChildIndex(sprite)]
  }

  getChildIndex(sprite) {
    return this._children.indexOf(sprite)
  }

  add(sprite) {
    this._children.push(sprite)
  }

  remove(sprite) {
    let index = this.getChildIndex(sprite)

    this._children.splice(index, 1)
  }

  update(dt) {
    this._children.map(child => {
      child.update(dt)
    })
  }

  render() {
    this._children.map(child => {
      child.render()
    })
  }
}

export default Stage
