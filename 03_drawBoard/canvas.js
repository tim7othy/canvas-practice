class Canvas {
  constructor(options) {
    this.initCanvas(options)
    this.mount()
    this.initEvents()
  }

  // 保存主要的canvas元素相关配置
  initCanvas(options) {
    options = options || {}
    // canvas元素的id
    this.id = options.id || "canvas"
    // 挂载画板的元素的id
    this.rootId = options.root || "root"
    this.W = options.width || 800
    this.H = options.height || 600
    this.left = options.left || 0
    this.top = options.top || 0
    this.zIndex = options.zIndex || 10
  }

  // 添加一个canvas元素绘制层
  addLayer(layerId, layerIndex, isHidden) {
    var layer = `
      <canvas id="${layerId}" width="${this.W}" height="${this.H}" 
      style="z-index:${layerIndex};position:absolute;left:${this.left};top:${this.top};${isHidden ? "visibility:hidden" : ""}"></canvas>
    ` 
    var wrapper = document.getElementById(this.rootId)
    wrapper.insertAdjacentHTML("beforeend", layer)
    // 将所有canvas id到canvas元素的映射保存到Map中，方便之后切换canvas进行绘制
    var layerElem = document.getElementById(layerId)
    var layerCtx = layerElem.getContext("2d")
    if (!this.layers) {
      this.layers = new Map()
      this.layerContexts = new Map()
    }
    this.layers.set(layerId, layerElem)
    this.layerContexts.set(layerId, layerCtx)
  }

  getLayer(layerId) {
    return this.layers.get(layerId)
  }

  getCtx(layerId) {
    return this.layerContexts.get(layerId)
  }

  // 设置canvas相关事件
  initEvents() {
    this.setupKeyActions()
  }

  // 收集用户按键
  setupKeyActions() {
    this.keydowns = new Set()
    this.keyActions = new Map()
    window.addEventListener("keydown",(ev) => {
      var {key} = ev
      this.keydowns.add(key)
    })
    window.addEventListener("keyup",(ev) => {
      var {key} = ev
      this.keydowns.delete(key)
    })
  }

  // 注册一个键盘事件
  registerKeyAction(ev, callback) {
    this.registerAction(this.keyActions, ev, callback)
  }
  
  // 辅助函数，在actionMap添加一条ev事件映射记录
  registerAction(actionMap, ev, callback) {
    if (actionMap.has(ev)) {
      var acts = actionMap.get(ev)
      if (Array.isArray(acts)) {
        acts.push(callback)
      } else if (isFunc(acts)) {
        actionMap.set(ev, [acts, callback])
      } else {
        throw new Error("Action type error")
      }
    } else {
      actionMap.set(ev, callback)
    }
  }

  // 执行按下按键对应的处理函数
  performKeyActions() {
    var eventWrapper = {}
    for (var k of this.keydowns.keys()) {
        if (k === "Control") {
          eventWrapper.ctrlDown = true
        } else if (k === "Alt") {
          eventWrapper.altDown = true
        } else if (k === "Shift") {
          eventWrapper.shiftDown = true
        }
        var acts = this.keyActions.get(k)
        this.callActions(acts, eventWrapper)
    }
  }
  
  // 辅助函数，执行acts变量指向的函数或指向的数组中的所有函数
  callActions(acts, ev) {
    if (acts) {
      if (Array.isArray(acts)) {
        for (var f of acts) {
          f(ev)
        }
      } else if (isFunc(acts)) {
        acts(ev)
      }
    }
  }

  mount() {
    this.addLayer(this.id, this.zIndex, false)
    // 将全局绘图环境设置为主canvas的上下文环境
    this.layer = this.getLayer(this.id)
    this.ctx = this.getCtx(this.id)
  }

  update() {
    this.performKeyActions()
  }
  
  draw() {
    // 绘制一帧canvas的代码
    // 由继承该类的具体Canvas实现
  }

  // 循环每一帧绘制一次canvas
  loop() {
    var c = this
    window.requestAnimationFrame(function() {
      c.update()
      c.draw()
      c.loop()
    })
  }

  start() {
    this.loop()
  }
}

