var data = [1, 2, 3, 4, 1,2,4, 1, 5, 3, 4, 2,6,5,4,1, 5, 3, 1,2,1,4,3, 2, 3, 5,4, 5,6,1,4];

var gridLeft = 40;
var gridTop = 100;
var gutter = 10;

var colors;

var hasDrawn = false;
var curve;
var smooth;

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
	line(0, -80, 0, -60);
	line( -80,0, -60, 0);
	line(0, 80, 0, 60);
	line( 80,0, 60, 0);	
	  },
  tile2: function() {
  	this.tile1();
  	line(-60,0, 0,-60);
  },
  tile3: function() {
  	this.tile2();
  	line(60,0, 0,60);
  },
  tile4: function() {
    bezier(-80, 0,  -smooth, -curve, smooth, -curve, 80, 0);
    bezier(0, -80,  -curve, -smooth, -curve, smooth, 0, 80);
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
  colors = {
    background: color(241, 241, 241),
    highlight: color(239, 221, 204),
    cell: color(255, 255, 255),
    line: color(0, 0, 0)
  };
  
  createCanvas(1280, 2000);
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
  fill(colors.background);
  rect(gridLeft,gridTop + 20,1200,890);
  
  fill(colors.line);
  textSize(92);
  text(title, gridLeft, gridTop-180);
  
  // days of the week
  textAlign(CENTER);
  textSize(20);
  text("SUNDAY",    gridLeft+gutter+80, gridTop);
  text("MONDAY",    gridLeft+gutter+80 + (gutter+160)*1, gridTop);
  text("TUESDAY",   gridLeft+gutter+80 + (gutter+160)*2, gridTop);
  text("WEDNESDAY", gridLeft+gutter+80 + (gutter+160)*3, gridTop);
  text("THURSDAY",  gridLeft+gutter+80 + (gutter+160)*4, gridTop);
  text("FRIDAY",    gridLeft+gutter+80 + (gutter+160)*5, gridTop);
  text("SATURDAY",  gridLeft+gutter+80 + (gutter+160)*6, gridTop);
  
  push();
  stroke(colors.line);
  translate(gridLeft-40+1100, gridTop-300+80);
  scale(0.7, 0.7);
  tileset.logo();  
  pop();
}

function whiteGrid() {
	noStroke();
	fill(colors.cell);
	rect(-80,-80,160,160);
}


function draw() {
  if (hasDrawn) return;
  drawCalendarFrame("March 2015");
  	  
  var i = 0; 
  translate(gridLeft+gutter, gridTop + 20 + gutter);
  translate(80, 80);
   
  if (!data.forEach) return;
  data.forEach(function(n) {
    i += 1;
    if (i % 7 == 0) {
     translate((160+gutter)*-6, 160+gutter);
     whiteGrid();
     stroke(colors.line);
    } else {
      translate(160 + gutter, 0);
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