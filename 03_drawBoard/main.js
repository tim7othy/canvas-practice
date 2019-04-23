var canvasRoot = document.getElementById("drawboardWrapper")
var w = canvasRoot.clientWidth
var h = canvasRoot.clientHeight
var board = new DrawBoard({
  root: "drawboardWrapper",
  id: "drawboard",
  width: w,
  height: h
})
board.start()