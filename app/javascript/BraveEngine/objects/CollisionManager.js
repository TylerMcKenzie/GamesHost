import ShapeManager from "./ShapeManager"

class CollisionManager {
  static polygonWithPolygon(polygon1, polygon2) {
    for(let point of polygon2.points) {
      if(polygon1.hasPoint(point)) {
        return true
      }
    }

    for(let point of polygon1.points) {
      if(polygon2.hasPoint(point)) {
        return true
      }
    }

    return false
  }

  static polygonWithCircle(polygon, circle) {
    for(let point of polygon.points) {
      if(circle.hasPoint(point)) {
        return true
      }
    }

    return false
  }

  static circleWithPolygon(circle, polygon) {


    for(let point of polygon.points) {
      if(circle.hasPoint(point)) {
        return true
      }
    }

    return false
  }
}

export default CollisionManager