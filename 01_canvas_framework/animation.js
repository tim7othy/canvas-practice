class AnimationCanvas extends Canvas {
  constructor(options) {
    super(options)
    this.setup()
  }

  setup() {
    this.x = 0
    this.y = 0
    this.speedX = 3
    this.speedY = 5
    this.registerKeyAction("a", (ev) => {
      this.x -= this.speedX
    })
    this.registerKeyAction("d", (ev) => {
      this.x += this.speedX
    })
    this.registerKeyAction("w", (ev) => {
      this.y -= this.speedY
    })
    this.registerKeyAction("s", (ev) => {
      this.y += this.speedY
    })
  }

  draw() {
    this.ctx.clearRect(0, 0, this.W, this.H)
    this.ctx.fillStyle = "#369"
    this.ctx.fillRect(this.x, this.y, 100, 100)
  }
}