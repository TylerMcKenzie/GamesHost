import ShapeManager from "./ShapeManager"

class CollisionManager {
  static polygonWithPolygon(polygon1, polygon2) {
    let collided = false

    for(let point of polygon2.points) {
      if(polygon1.hasPoint(point)) {
        collided = true
        break;
      }
    }

    for(let point of polygon1.points) {
      if(polygon2.hasPoint(point)) {
        collided = true
        break;
      }
    }

    return collided
  }

  static polygonWithCircle(polygon, circle) {}

  static circleWithPolygon(circle, polygon) {}
}

export default CollisionManager