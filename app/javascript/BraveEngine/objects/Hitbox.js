import CollisionManager from "./CollisionManager"
import ShapeManager from "./ShapeManager"

class Hitbox {
  constructor(shapeOpts) {
    this.shape = ShapeManager.shape(shapeOpts)
  }

  get x() {
    return this.shape.x
  }

  get y() {
    return this.shape.y
  }

  set x(value) {
    this.shape.x = value
  }

  set y(value) {
    this.shape.y = value
  }

  testCollision(hitbox) {
    if(!hitbox instanceof Hitbox) {
      throw new Error(`Expected Hitbox object, got ${hitbox}.`)
    }

    let thisShapeType = ShapeManager.shapeType(this.shape)
    let hitboxShapeType = ShapeManager.shapeType(hitbox.shape)

    // console.log(`Shapes-> this: ${thisShapeType}, hb: ${hitboxShapeType}`)

    if(thisShapeType !== "Circle" && hitboxShapeType !== "Circle") {
      return CollisionManager.polygonWithPolygon(this.shape, hitbox.shape)
    } else if(thisShapeType === "Circle" && hitboxShapeType === "Circle") {
      return CollisionManager.circleWithCircle(this.shape, hitbox.shape)
    }

    if(thisShapeType !== "Circle" && hitboxShapeType === "Circle") {
      // console.log("Here!")
      return CollisionManager.polygonWithCircle(this.shape, hitbox.shape)
    } else if(thisShapeType === "Circle" && hitboxShapeType !== "Circle") {
      return CollisionManager.circleWithPolygon(this.shape, hitbox.shape)
    }
  }
}

export default Hitbox
