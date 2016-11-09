var gridSize = 16,
    cellSize = 48,
    bkCol = 200,
    mouse,
    maxDist = 0;

var maze = [["NW", "NE", "NW", "NS", "NS", "NS", "NS", "NS", "N", "N", "NS", "NS", "NS", "NS", "N", "NE"], ["WE", "WE", "WS", "NE", "NW", "NS", "NS", "NES", "WE", "W", "NS", "NS", "NS", "NE", "WE", "WE"], ["WE", "WS", "N", "ES", "WS", "NS", "NS", "NS", "ES", "WE", "NWS", "NS", "NS", "E", "WE", "WE"], ["WE", "NW", "E", "NW", "NS", "N", "NS", "NS", "NS", "S", "NS", "NS", "NS", "ES", "WE", "WE"], ["WE", "WE", "WS", "E", "NWE", "W", "NS", "NS", "NS", "NS", "NS", "N", "NE", "NW", "E", "WE"], ["WE", "WS", "NE", "W", "E", "W", "NS", "N", "NS", "NS", "NE", "WE", "WE", "WES", "WE", "WE"], ["W", "N", "ES", "WE", "WE", "WE", "NW", "ES", "NW", "NE", "WS", "E", "W", "NS", "ES", "WE"], ["WE", "WS", "NE", "WE", "WE", "WE", "WE", "NW", "E", "WS", "NE", "WE", "WS", "NE", "NW", "E"], ["WE", "NW", "E", "WE", "WE", "WE", "WE", "WS", "ES", "NW", "ES", "WS", "NE", "WE", "WE", "WE"], ["WE", "WE", "WE", "WS", "ES", "WE", "WS", "NS", "NE", "WS", "NE", "NW", "ES", "WE", "WE", "WE"], ["WE", "WE", "WE", "NWS", "NS", "S", "NS", "NE", "WS", "NE", "W", "ES", "NW", "E", "WE", "WE"], ["WE", "WE", "W", "NS", "NE", "NW", "NE", "WS", "NE", "WS", "E", "NW", "ES", "WE", "WE", "WE"], ["WS", "E", "WS", "NES", "WE", "WE", "WS", "NE", "WS", "N", "S", "S", "NS", "ES", "WE", "WE"], ["NW", "E", "NWS", "NS", "E", "WS", "NE", "WS", "NE", "WS", "NS", "NS", "NS", "NS", "E", "WE"], ["WE", "W", "NS", "NS", "ES", "NWE", "WS", "NE", "WS", "NS", "NS", "NS", "NS", "NS", "ES", "WE"], ["WES", "WS", "NS", "NS", "NS", "S", "NS", "S", "NS", "NS", "NS", "NS", "NS", "NS", "NS", "ES"]]

function setup() {
  createCanvas(gridSize*cellSize+1, gridSize*cellSize+1);
  background(bkCol);
  //var minSide = (width < height ? width : height) - 1;
  //cellSize = Math.floor(minSide / gridSize);
  grid = new Grid(maze);
  mouse = new Character(0, gridSize-1);
  mouse.map = mouse.makeMap(maze);
  mouse.seek(8,7);
}

function draw() {

  mouse.draw();
  grid.draw();
}

function found(place, thing) {
  return place.indexOf(thing) != -1;
}

function map2D(rows, func) {
  return rows.map(function(row, i) {
    return row.map(function(cell, j) {
      return func(cell, i, j);
    });
  });
}

function forEach2D(rows, func) {
  rows.forEach(function(row, i) {
    row.forEach(function(cell, j) {
      func(cell, i, j);
    })
  })
}

function Grid(walls) {
  this.walls = walls;

  this.draw = function() {
    forEach2D(this.walls, function(cell, i, j) {
      var d = cellSize, x = j * d, y = i * d;

      //fill(bkCol + 10).stroke(bkCol - 10).rect(x, y, d, d);   //outline
      stroke(0).strokeWeight(1);
      if (found(cell, 'N')) line(x, y, x + d, y);
      if (found(cell, 'E')) line(x + d, y, x + d, y + d);
      if (found(cell, 'S')) line(x, y + d, x + d, y + d);
      if (found(cell, 'W')) line(x, y, x, y + d);
    });
  }
}

function Character(row, col) {
  var offset = cellSize/2;
  this.row = row;
  this.col = col;
  this.x = this.row * cellSize + offset;
  this.y = this.col * cellSize + offset;
  this.diameter = cellSize/3;
  this.map;

  this.getNeighbour = function(row, col, dir) {
    switch(dir) {
      case 'N': try {return this.map[row-1][col]} catch (e) {return null}
      case 'E': try {return this.map[row][col+1]} catch (e) {return null}
      case 'S': try {return this.map[row+1][col]} catch (e) {return null}
      case 'W': try {return this.map[row][col-1]} catch (e) {return null}
    }
  }

  this.getNeighbours = function(row, col, dirs) {
    var me = this;
    return dirs.map(function(dir) {
      return me.getNeighbour(row, col, dir);
    });
  }

  this.getAccessibleDirections = function(row, col) {
    var me = this;
    return ['N','E','S','W'].filter(function(dir) {
      return !found(me.map[row][col].walls, dir);
    });
  }

  this.getAccessibleNeighbours = function(row, col) {
    return this.getNeighbours(row, col, this.getAccessibleDirections(row, col));
  }

  this.seek = function(row, col) {
    var me = this;

    function recurse(row, col, dist) {
      var cell = me.map[row][col];
      if (!cell.counted) {
        cell.counted = 1;
        cell.distance = dist + 1;
        maxDist = (cell.distance > maxDist ? cell.distance : maxDist);
        //fill(cell.counted*255).strokeWeight(0).textAlign(CENTER,CENTER).text(String(cell.distance), cell.x + offset, cell.y + offset);
        me.getAccessibleNeighbours(row, col).forEach(function(child) {
          recurse(child.row, child.col, cell.distance);
        });
      }
    }
    recurse(row, col, 0);
  }

  this.draw = function() {
    fill(255, 204, 0).stroke(0).strokeWeight(1).ellipse(this.x, this.y, this.diameter, this.diameter);
    forEach2D(this.map, function(cell, i, j) {
      fill(cell.distance / maxDist * 255).stroke(bkCol - 10).rect(cell.x, cell.y, cell.x + cellSize, cell.y + cellSize);
      fill(cell.counted*255).strokeWeight(0).textAlign(CENTER,CENTER).text(String(cell.distance), cell.x + offset, cell.y + offset);
    });
  }
}

Character.prototype.makeMap = function(maze) {
  return map2D(maze, function(cell, i, j) {
    return {
      walls: cell.split(""),
      counted: false,
      distance: 0,
      row: i,
      col: j,
      x: j * cellSize,
      y: i * cellSize
    }
  });
};
