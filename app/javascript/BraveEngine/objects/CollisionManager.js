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

  static circleWithPolygon(circle, polygon) {
    for(let i = 0, j = polygon.points.length-1; i < polygon.points.length; i++) {
      if(circle.hasPoint(polygon.points[i])) {
        return true
      } else {
        let { x: x1, y: y1 } = polygon.points[i]
        let { x: x2, y: y2 } = polygon.points[j]
        let dx = x2 - x1
        let dy = y2 - y1

        let theta = (Math.atan2(dy, dx) * 180 / Math.PI)

        let cx = circle.x + circle.radius*Math.cos(theta*Math.PI/180)
        let cy = circle.y + circle.radius*Math.sin(theta*Math.PI/180)


        if(polygon.hasPoint({ x: cx, y: cy })) {
          return true
        }

        j = i
      }
    }

    return false
  }

  static circleWithCircle(circle1, circle2) {
    let dx = circle2.x - circle1.x
    let dy = circle2.y - circle1.y

    let distance = Math.sqrt(dx*dx + dy*dy)

    if(distance < circle1.radius + circle2.radius) {
      return true
    }

    return false
  }
}

export default CollisionManager