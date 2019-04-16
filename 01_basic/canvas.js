class Canvas {
  constructor(options) {
    this.initCanvas(options)
    this.mount(this.rootId)
    this.initEvents()
  }

  // 根据传入的options配置canvas元素
  initCanvas(options) {
    this.id = options.id || "canvas"
    this.rootId = options.root || "root"
    this.W = options.width || 800
    this.H = options.height || 600
  }

  // 设置canvas相关事件
  initEvents() {
    this.getOffset()
  }

  mount(id) {
    // 将canvas挂载到指定根元素下
    var {W, H, id, rootId} = this
    var elem = document.getElementById(rootId)
    var canvas = `
      <canvas id='${id}' width='${W}px' height='${H}px'></canvas>
    `
    elem.insertAdjacentHTML("beforeend", canvas)
    // 将canvas元素和canvas上下文环境保存到Canvas实例中
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext("2d")
  }
  
  draw() {
    // 绘制一帧canvas的代码
    // 由继承该类的具体Canvas实现
  }

  // 实时获取鼠标在canvas上的坐标
  getOffset() {
    this.pos = {}
    this.canvas.addEventListener("mousemove", (ev) => {
      var {pageX, pageY, target} = ev
      var rect = target.getBoundingClientRect()
      var x = pageX - rect.left
      var y = pageY - rect.top
      this.pos.x = x
      this.pos.y = y
    })
  }

  // 循环每一帧绘制一次canvas
  loop() {
    var c = this
    window.requestAnimationFrame(function() {
      c.draw()
      c.loop()
    })
  }

  start() {
    this.loop()
  }
}

