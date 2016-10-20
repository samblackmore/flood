var gridSize = 16,
    cellSize,
    bkCol = 200;

var maze = [["NW", "NE", "NW", "NS", "NS", "NS", "NS", "NS", "N", "N", "NS", "NS", "NS", "NS", "N", "NE"], ["WE", "WE", "WS", "NE", "NW", "NS", "NS", "NES", "WE", "W", "NS", "NS", "NS", "NE", "WE", "WE"], ["WE", "WS", "N", "ES", "WS", "NS", "NS", "NS", "ES", "WE", "NWS", "NS", "NS", "E", "WE", "WE"], ["WE", "NW", "E", "NW", "NS", "N", "NS", "NS", "NS", "S", "NS", "NS", "NS", "ES", "WE", "WE"], ["WE", "WE", "WS", "E", "NWE", "W", "NS", "NS", "NS", "NS", "NS", "N", "NE", "NW", "E", "WE"], ["WE", "WS", "NE", "W", "E", "W", "NS", "N", "NS", "NS", "NE", "WE", "WE", "WES", "WE", "WE"], ["W", "N", "ES", "WE", "WE", "WE", "NW", "ES", "NW", "NE", "WS", "E", "W", "NS", "ES", "WE"], ["WE", "WS", "NE", "WE", "WE", "WE", "WE", "NW", "E", "WS", "NE", "WE", "WS", "NE", "NW", "E"], ["WE", "NW", "E", "WE", "WE", "WE", "WE", "WS", "ES", "NW", "ES", "WS", "NE", "WE", "WE", "WE"], ["WE", "WE", "WE", "WS", "ES", "WE", "WS", "NS", "NE", "WS", "NE", "NW", "ES", "WE", "WE", "WE"], ["WE", "WE", "WE", "NWS", "NS", "S", "NS", "NE", "WS", "NE", "W", "ES", "NW", "E", "WE", "WE"], ["WE", "WE", "W", "NS", "NE", "NW", "NE", "WS", "NE", "WS", "E", "NW", "ES", "WE", "WE", "WE"], ["WS", "E", "WS", "NES", "WE", "WE", "WS", "NE", "WS", "N", "S", "S", "NS", "ES", "WE", "WE"], ["NW", "E", "NWS", "NS", "E", "WS", "NE", "WS", "NE", "WS", "NS", "NS", "NS", "NS", "E", "WE"], ["WE", "W", "NS", "NS", "ES", "NWE", "WS", "NE", "WS", "NS", "NS", "NS", "NS", "NS", "ES", "WE"], ["WES", "WS", "NS", "NS", "NS", "S", "NS", "S", "NS", "NS", "NS", "NS", "NS", "NS", "NS", "ES"]]

function setup() {
  createCanvas(640, 480);
  background(bkCol);
  var minSide = (width < height ? width : height) - 1;
  cellSize = Math.floor(minSide / gridSize);
}

function draw() {
  fill(bkCol + 10);
  stroke(bkCol - 10);
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      var d = cellSize,
          x = j * d,
          y = i * d,
          dir = maze[i][j];
      stroke(bkCol - 10);
      rect(x, y, d, d);
      stroke(0);
      if (dir.indexOf('N') > -1) line(x, y, x + d, y);
      if (dir.indexOf('E') > -1) line(x + d, y, x + d, y + d);
      if (dir.indexOf('S') > -1) line(x, y + d, x + d, y + d);
      if (dir.indexOf('W') > -1) line(x, y, x, y + d);
    }
  }
}
