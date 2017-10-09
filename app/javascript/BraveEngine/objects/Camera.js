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

  constructor({xView = 0, yView = 0, width, height, worldWidth, worldHeight}) {
    this.xView = xView
    this.yView = yView

    this.viewportWidth = width
    this.viewportHeight = height

    this.deadZoneX = width/2
    this.deadZoneY = height/2

    this._axis = Camera.AXIS.BOTH

    this.followed = null

    this.viewport = new Rectangle({x: this.xView, y: this.yView, width: this.viewportWidth, height: this.viewportHeight})

    if(worldWidth && worldHeight) {
      this.worldWidth = worldWidth
      this.worldHeight = worldHeight
      this.worldBounds = new Rectangle({x: 0, y: 0, width: this.worldWidth, height: this.worldHeight})
    }
  }

  get axis() {
    return this._axis
  }

  set axis(value) {
    switch(value) {
      case Camera.AXIS.HORIZONTAL:
        this._axis = Camera.AXIS.HORIZONTAL
        break
      case Camera.AXIS.VERTICAL:
        this._axis = Camera.AXIS.VERTICAL
        break
      case Camera.AXIS.BOTH:
        this._axis = Camera.AXIS.BOTH
        break
      case Camera.AXIS.NONE:
        this._axis = Camera.AXIS.NONE
        break
      default:
        throw new Error("Invalid setting of axis. Accepted values are: 'horizontal', 'vertical', 'both', and 'none'.")
        break
    }
  }

  follow(object, deadZoneX = 0, deadZoneY = 0) {
    this.followed = object

    this.deadZoneX = (this.viewportWidth/2) - deadZoneX
    this.deadZoneY = (this.viewportHeight/2) - deadZoneY

    this.update()
  }

  unfollow() {
    this.followed = null
  }

  update() {
    if(this.followed != null) {
      // HORIZONTAL movement if not both
      if(this.axis === Camera.AXIS.HORIZONTAL || this.axis === Camera.AXIS.BOTH) {
        if(this.followed.x - this.xView + this.deadZoneX > this.viewportWidth) {
          this.xView = this.followed.x - (this.viewportWidth - this.deadZoneX);
        } else if(this.followed.x - this.deadZoneX < this.xView) {
          this.xView = this.followed.x - this.deadZoneX;
        }
      }

      // VERTICAL movement if not both
      if(this.axis === Camera.AXIS.VERTICAL || this.axis === Camera.AXIS.BOTH) {
        if(this.followed.y - this.yView + this.deadZoneY > this.viewportHeight) {
          this.yView = this.followed.y - (this.viewportHeight - this.deadZoneY);
        } else if(this.followed.y - this.deadZoneY < this.yView) {
          this.yView = this.followed.y - this.deadZoneY;
        }
      }

      this.viewport.x = this.xView
      this.viewport.y = this.yView

      // don't let camera leaves the world's boundary - used for planets stages
      if(this.worldBounds !== undefined) {
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
