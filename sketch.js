function setup() {
  createCanvas(640, 480);
}

function draw() {

  var gridSize = 16,
      minSide = (width < height ? width : height) - 1,
      cellSize = Math.floor(minSide / gridSize);

  background(200);

  for (var i = 0; i < gridSize; i++)
    for (var j = 0; j < gridSize; j++)
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
}
