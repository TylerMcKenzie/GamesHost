class Vector {
  constructor(x = 0, y = 0) {
    this._x = x
    this._y = y
  }

  get x() {
    return this._x
  }

  set x(value) {
    this._x = value
  }

  get y() {
    return this._y
  }

  set y(value) {
    this._y = value
  }

  add({x = 0, y = 0}, dt = 1) {
    this._x += x*dt
    this._y += y*dt
  }
}

export default Vector
