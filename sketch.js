var gridSize = 16,
    cellSize;

function setup() {
  createCanvas(640, 480);
  background(200);
  var minSide = (width < height ? width : height) - 1;
  cellSize = Math.floor(minSide / gridSize);
}

function draw() {
  for (var i = 0; i < gridSize; i++)
    for (var j = 0; j < gridSize; j++)
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
}
