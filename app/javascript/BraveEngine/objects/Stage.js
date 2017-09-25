class Stage {
  constructor() {
    this._children = []
    this._sorted
  }

  _sortChildren() {
    this._children = this._children.sort(function(child1, child2) {
      return child1.z - child2.z
    })

    this._sorted = true
  }

  bringToFront(child) {
    let childToMove = this._children[this.getChildIndex(child)]
    childToMove.z = this._children.length+1

    this._sorted = false
  }

  sendToBack(child) {
    let childToMove = this._children[this.getChildIndex(child)]
    childToMove.z = 0

    this._sorted = false
  }

  setZIndex(child, newZIndex) {
    let childToMove = this._children[this.getChildIndex(child)]
    childToMove.z = newZIndex

    this._sorted = false
  }

  getChildIndex(child) {
    return this._children.indexOf(child)
  }

  add(child) {
    if(!child.z) {
      child.z = this._children.length+1
    } else {
      this._sorted = false
    }

    this._children.push(child)
  }

  remove(child) {
    let index = this.getChildIndex(child)

    this._children.splice(index, 1)
  }

  update(dt) {
    this._children.map(child => {
      child.update(dt)
    })
  }

  render() {
    if(!this._sorted) {
      this._sortChildren()
    }

    this._children.map(child => {
      child.render()
    })
  }
}

export default Stage
