import Polygon from "./Polygon"
import Circle from "./Circle"
import Rectangle from "./Rectangle"
import Square from "./Square"

class ShapeManager {
  static shapeType(shape) {
    if(shape instanceof Polygon) {
      return "Polygon"
    }

    if(shape instanceof Circle) {
      return "Circle"
    }

    if(shape instanceof Square) {
      return "Square"
    }

    if(shape instanceof Rectangle) {
      return "Rectangle"
    }
  }

  static shape({type, x, y, rotation, width, height, size, points, radius}) {
    let shape

    switch(type) {
      case "square":
        shape = ShapeManager.square({x, y, rotation, size})
        break;
      case "rectangle":
        shape = ShapeManager.rectangle({x, y, rotation, width, height})
        break;
      case "circle":
        shape = ShapeManager.circle({x, y, rotation, radius})
        break;
      case "polygon":
        shape = ShapeManager.polygon({x, y, rotation, points})
        break;
      default:
        throw new Error(`Type must be one of the following: 'square', 'rectangle', 'circle', or 'polygon'. Got "${type}"`)
        break;
    }

    return shape
  }

  static rectangle({x, y, rotation, width, height}) {
    return new Rectangle({x, y, rotation, width, height})
  }

  static square({x, y, rotation, size}) {
    return new Square({x, y, rotation, size})
  }

  static circle({x, y, rotation, radius}) {
    return new Circle({x, y, rotation, radius})
  }

  static polygon({x, y, rotation, points}) {
    return new Polygon({x, y, rotation, points})
  }
}

export default ShapeManager
