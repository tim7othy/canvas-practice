class Canvas {
  constructor(options) {
    this.initCanvas(options)
    this.mount(options)
  }

  initCanvas(options) {
    this.id = options.id || "canvas"
    this.rootId = options.root || "root"
    this.W = options.width || 800
    this.H = options.height || 600
  }

  mount(options) {
    // 将canvas挂载到指定根元素下
    var {W, H, id, rootId} = this
    var elem = document.getElementById(rootId)
    var canvas = `
      <canvas id='${id}' width='${W}' height='${H}'></canvas>
    `
    elem.insertAdjacentHTML("beforeend", canvas)
    // 将canvas元素和canvas上下文环境保存到Canvas实例中
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext("2d")
  }

  draw() {}
  update() {}

  loop() {
    var c = this
    requestAnimationFrame(function() {
      c.draw() 
      c.update()
      c.loop()
    })
  }

  start() {
    this.loop()
  }
}

class DemoCanvas extends Canvas {
  constructor(options) {
    super(options)
    this.setupMovement()
  }

  setupMovement() {
    this.x = 0
    this.y = 0
    this.speedX = 5
    this.speedY = 10
    window.addEventListener("keydown",(ev) => {
      var k = ev.key
      if (k === "a") {
        this.x -= this.speedX
      } else if (k === "d") {
        this.x += this.speedX
      } else if (k === "w") {
        this.y -= this.speedY
      } else if (k === "s") {
        this.y += this.speedY
      }
      console.log(this.x)
    })
  }

  update() {
  }

  draw() {
    console.log(this.x)
    this.ctx.clearRect(0, 0, this.W, this.H)
    this.ctx.fillStyle = "#369"
    this.ctx.fillRect(this.x, this.y, 100, 100)
  }
}

var c = new DemoCanvas({
  id: "demo",
  rootId: "root",
  width: 500,
  height: 500,
})
c.start()