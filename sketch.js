var data = [1, 2, 3, 4, 1,2,4, 1, 5, 3, 4, 2,6,5,4,1, 5, 3, 1,2,1,4,3, 2, 3, 5,4, 5,6,1,4];

var width;
var height;
var gridLeft;
var gridTop;
var gutter;
var cellSize;
var stemSize;
var weekdayFontSize;
var colors;

var hasDrawn = false;
var curve;
var smooth;

var setVariables = function() {
  width = window.innerWidth;
  height = window.innerHeight;
  gridTop = 100;
  gutter = 10;
  cellSize = width / 9;
  gridLeft = cellSize/2;
  stemSize = cellSize/8;
  weekdayFontSize = 6 + (cellSize*14/8/20);

  colors = {
    background: color(239, 221, 204),
    cell: color(255, 255, 255, 255*0.3),
    line: color(0, 0, 0)
  };
};

var lineTileset = {
  tile1: function() {
	stroke(0, 0, 0);
	line(0, -80, 0, -60);
	line( -80,0, -60, 0);
	line(0, 80, 0, 60);
	line( 80,0, 60, 0);

  },
  tile2: function() {
  	whiteGrid();
	this.tile1();
	line(-60,0, 0,-60);
  },
  tile3: function() {
  	whiteGrid();
	this.tile2();
	line(60,0, 0,60);
  },
  tile4: function() {
  	whiteGrid();
	stroke(0, 0, 0);
	line(0, -80, 0, 80);
	line(-80, 0, 80, 0);
  },
  tile5: function() {
    this.tile4();
    rotate(45);
    this.tile4();
    rotate(-45);
  },
  logo: function() {
  
    for (var i = 0; i < 8; i++) {
  		this.tile4();
  	    rotate(45);
    }
  }
};

var curvedTileset = {
  tile1: function() { 
    stroke(0, 0, 0);
  	line(0, -cellSize/2, 0, -(cellSize/2 - stemSize));
  	line( -cellSize/2,0, -(cellSize/2 - stemSize), 0);
  	line(0, cellSize/2, 0, (cellSize/2 - stemSize));
  	line( cellSize/2,0, (cellSize/2 - stemSize), 0);	
  },
  tile2: function() {
  	this.tile1();
  	line(-(cellSize/2 - stemSize),0, 0,-(cellSize/2 - stemSize));
  },
  tile3: function() {
  	this.tile2();
  	line((cellSize/2 - stemSize),0, 0,(cellSize/2 - stemSize));
  },
  tile4: function() {
    noFill();
    bezier(-cellSize/2, 0,  -smooth, -curve, smooth, -curve, cellSize/2, 0);
    bezier(0, -cellSize/2,  -curve, -smooth, -curve, smooth, 0, cellSize/2);
  },
	tile5: function() {
  	this.tile4();
  	rotate(45);
  	this.tile4();
  	rotate(-45);
	},
  logo: function() {
    for (var i = 0; i < 8; i++) {
		this.tile4();
	    rotate(45);
    }
  }
};

var tileset = curvedTileset;

function setup() {
  setVariables();
  
  createCanvas(width, height);
  angleMode(DEGREES);
  loadCalendar(function(d) {
    data = d;
    hasDrawn = false;
    clear();
  });
  curve = random(200) - 100;
  smooth = random(200) - 100;  
}

function drawCalendarFrame(title) {
  noStroke();
  
  fill(colors.line);
  // textSize(92);
  // text(title, gridLeft, gridTop-180);
  
  // days of the week
  textAlign(CENTER);
  textSize(weekdayFontSize);
  text("SUNDAY",    gridLeft+gutter+(cellSize/2), gridTop);
  text("MONDAY",    gridLeft+gutter+(cellSize/2) + (gutter+cellSize)*1, gridTop);
  text("TUESDAY",   gridLeft+gutter+(cellSize/2) + (gutter+cellSize)*2, gridTop);
  text("WEDNESDAY", gridLeft+gutter+(cellSize/2) + (gutter+cellSize)*3, gridTop);
  text("THURSDAY",  gridLeft+gutter+(cellSize/2) + (gutter+cellSize)*4, gridTop);
  text("FRIDAY",    gridLeft+gutter+(cellSize/2) + (gutter+cellSize)*5, gridTop);
  text("SATURDAY",  gridLeft+gutter+(cellSize/2) + (gutter+cellSize)*6, gridTop);
  
  // push();
  // stroke(colors.line);
  // translate(gridLeft-40+1100, gridTop-300+80);
  // scale(0.7, 0.7);
  // tileset.logo();
  // pop();
}

function whiteGrid() {
	noStroke();
	fill(colors.cell);
	rect(-cellSize/2,-cellSize/2,cellSize,cellSize);
}


function draw() {
  if (hasDrawn) return;
  background(colors.background);
  drawCalendarFrame("March 2015");
  	  
  var i = 0; 
  translate(gridLeft+gutter, gridTop + 20 + gutter);
  translate(cellSize/2, cellSize/2);
   
  if (!data.forEach) return;
  data.forEach(function(n) {
    i += 1;
    if (i % 7 == 0) {
     translate((cellSize+gutter)*-6, cellSize+gutter);
     whiteGrid();
     stroke(colors.line);
    } else {
      translate(cellSize + gutter, 0);
      whiteGrid();
      stroke(colors.line);
    }
    
    if (n == 1) tileset.tile1();
    if (n == 2) tileset.tile2();
    if (n == 3) tileset.tile3();
    if (n == 4) tileset.tile4();
    if (n >= 5) tileset.tile5();  
  }); 
   
  hasDrawn = true;
}