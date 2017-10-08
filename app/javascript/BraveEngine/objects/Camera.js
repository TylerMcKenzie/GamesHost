import Rectangle from "./Rectangle"

class Camera {
  static get AXIS() {
    return {
      NONE: "none",
      HORIZONTAL: "horizontal",
      VERTICAL: "vertical",
      BOTH: "both"
    }
  }

  constructor({xView = 0, yView = 0, canvasWidth, canvasHeight, worldWidth, worldHeight}) {
    this.xView = xView
    this.yView = yView

    this.viewportWidth = canvasWidth
    this.viewportHeight = canvasHeight

    this.deadZoneX = 0
    this.deadZoneY = 0

    this.axis = Camera.AXIS.BOTH

    this.followed = null

    this.viewport = new Rectangle(this.xView, this.yView, this.viewportWidth, this.viewportHeight)

    if(worldWidth && worldHeight) {
      this.worldWidth = worldWidth
      this.worldHeight = worldHeight
      this.worldBounds = new Rectangle(0, 0, this.worldWidth, this.worldHeight)
    }
  }

  get axis() {
    return this.axis
  }

  set axis(value) {
    switch(value) {
      case "horizontal":
        this.axis = Camera.AXIS.HORIZONTAL
        break
      case "vertical":
        this.axis = Camera.AXIS.VERTICAL
        break
      case "both":
        this.axis = Camera.AXIS.BOTH
        break
      case "none":
        this.axis = Camera.AXIS.NONE
        break
      default:
        throw new Error("Invalid setting of axis. Accepted values are: 'horizontal', 'vertical', 'both', and 'none'.")
        break
    }
  }

  follow(object, deadZoneX = 0, deadZoneY = 0) {
    this.followed = object

    this.deadZoneX = deadZoneX
    this.deadZoneY = deadZoneY

    this.update()
  }

  unfollow() {
    this.followed = null
  }

  update() {
    if(this.followed != null) {
      // HORIZONTAL movement if not both
      if( this.axis === Camera.AXIS.HORIZONTAL || this.axis === Camera.AXIS.BOTH) {
        if(this.followed.x - this.xView + this.deadZoneX > this.viewportWidth) {
          this.xView = this.followed.x - (this.viewportWidth - this.deadZoneX);
        } else if(this.followed.x - this.deadZoneX < this.xView) {
          this.xView = this.followed.x - this.deadZoneX;
        }
      }

      // VERTICAL movement if not both
      if(this.axis == Camera.AXIS.VERTICAL || this.axis == Camera.AXIS.BOTH) {
        if(this.followed.y - this.yView + this.deadZoneY > this.viewportHeight) {
          this.yView = this.followed.y - (this.viewportHeight - this.deadZoneY);
        } else if(this.followed.y - this.deadZoneY < this.yView) {
          this.yView = this.followed.y - this.deadZoneY;
        }
      }

      this.viewport.x = this.xView
      this.viewport.y = this.yView

      // don't let camera leaves the world's boundary - used for planets stages
      if(this.worldBounds) {
        if(!this.withinWorldBounds()) {
          if(this.viewport.x < this.worldBounds.x) {
            this.xView = this.worldBounds.x
          }

          if(this.viewport.y < this.worldBounds.y) {
            this.yView = this.worldBounds.y
          }

          if(this.viewport.x+this.viewport.width > this.worldBounds.x+this.worldBounds.width) {
            this.xView = this.worldBounds.x+this.worldBounds.width - this.viewportWidth
          }

          if(this.viewport.y+this.viewport.height > this.worldBounds.y+this.worldBounds.height) {
            this.yView = this.worldBounds.y+this.worldBounds.height - this.viewportHeight
          }
        }
      }
    }
  }

  withinWorldBounds() {
    return (this.viewport.x <= this.worldBounds.x &&
            this.viewport.y <= this.worldBounds.y &&
            this.viewport.x+this.viewport.width >= this.worldBounds.x+this.worldBounds.width &&
            this.viewport.y+this.viewport.height >= this.worldBounds.y+this.worldBounds.height)
  }
}

export default Camera
