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
    childToMove.z = this._children.length

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
    if(child.z === undefined) {
      child.z = this._children.length
    } else {
      this._sorted = false
    }

    this._children.push(child)
  }

  remove(child) {
    let index = this.getChildIndex(child)

    if(index >= 0) {
      this._children.splice(index, 1)
    }
  }

  update(dt) {
    this._children.map(child => {
      child.update(dt)
    })
  }

  render(cameraX, cameraY) {
    if(!this._sorted) {
      this._sortChildren()
    }

    this._children.map(child => {
      child.render(child.x, child.y, cameraX, cameraY)
    })
  }
}

export default Stage
