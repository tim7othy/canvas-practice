class DrawBoard extends Canvas {
  constructor(options) {
    super(options)
    this.setupBackground()
    this.setupTools()
  }

  setupBackground() {
    var bgCtx = this.getCtx(BACKGROUNDLAYER)
    bgCtx.save()
    bgCtx.strokeStyle = "#369"
    bgCtx.lineWidth = 1
    var w = this.gridWidth || 20
    var h = this.gridHeight || 20
    var cols = Math.floor(this.W / w)
    var rows = Math.floor(this.H / h)
    for (var i = 0; i <= cols; i++) {
      bgCtx.moveTo(w*i, 0)
      bgCtx.lineTo(w*i, this.H)
    }
    for (var i = 0; i <= rows; i++) {
      bgCtx.moveTo(0, h*i)
      bgCtx.lineTo(this.W, h*i)
    }
    bgCtx.stroke()
    bgCtx.restore()
  }

  setupTools() {
    this.tool = new Pen(this)
    this.toolType = PEN

    var penBtn = document.getElementById("pen")
    var eraserBtn = document.getElementById("eraser")
    var rectBtn = document.getElementById("rect")
    penBtn.addEventListener("click", (ev) => {
      if (this.toolType && this.toolType != PEN) {
        this.tool.unInstall()
        this.tool = new Pen(this)
        this.toolType = PEN
      }
    })
    eraserBtn.addEventListener("click", (ev) => {
      if (this.toolType && this.toolType != ERASER) {
        this.tool.unInstall()
        this.tool = new Eraser(this)
        this.toolType = ERASER
      }
    })
    rectBtn.addEventListener("click", (ev) => {
      if (this.toolType && this.toolType != RECT) {
        this.tool.unInstall()
        this.tool = new Rect(this)
        this.toolType = RECT
      }
    })
  }

  mount() {
    super.mount()
    // 添加与用户交互的canvas层和背景层
    this.addLayer(UILAYER, 1, false)
    this.addLayer(BACKGROUNDLAYER, -1, false)
    // 添加工具条
    var root = document.getElementById(this.rootId)
    var toolPane = `
      <div id="toolPane">
        <div id="cancel" class="tool"><span class="iconfont icon-cancel1f"></span></div>
        <div id="redo" class="tool"><span class="iconfont icon-redo"></span></div>
        <div id="download" class="tool"><span class="iconfont icon-Clouddownload"></span></div>
        <div id="clear" class="tool"><span class="iconfont icon-custom-clear"></span></div>
        <div id="eraser" class="tool"><span class="iconfont icon-Rubber"></span></div>
        <div id="text" class="tool"><span class="iconfont icon-fontnormal"></span></div>
        <div id="color" class="tool"><span class="iconfont icon-bucket"></span></div>
        <div id="circle" class="tool"><span class="iconfont icon-circle"></span></div>
        <div id="rect" class="tool"><span class="iconfont icon-square"></span></div>
        <div id="line" class="tool"><span class="iconfont icon-Line"></span></div>
        <div id="pen" class="tool"><span class="iconfont icon-pencil"></span></div>
      </div>
    `
    root.insertAdjacentHTML("afterbegin", toolPane)
  }
}