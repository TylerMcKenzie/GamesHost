import CollisionManager from "./CollisionManager"

class Hitbox {
  contructor(shapeType, customOpts) {
    let defaultOpts = {
      x: 0,
      y: 0,
      rotation: 0
    }
    this.shape = ShapeManager.shape()
  }

  collidesWith(object) {

  }
}

export default Hitbox