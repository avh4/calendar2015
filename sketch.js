var data = [1, 2, 3, 4, 1,2,4, 1, 5, 3, 4, 2,6,5,4,1, 5, 3, 1,2,1,4,3, 2, 3, 5,4, 5,6,1,4];
var gutter = 10;
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
   	whiteGrid();
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
  fill(241,241,241);
  rect(40,320,1200,890);
  
  fill(0,0,0);
  textSize(92);
  text(title, 40, 120);
  
  // days of the week
  textAlign(CENTER);
  textSize(20);
  text("SUNDAY",    40+gutter+80, 300);
  text("MONDAY",    40+gutter+80 + (gutter+160)*1, 300);
  text("TUESDAY",   40+gutter+80 + (gutter+160)*2, 300);
  text("WEDNESDAY", 40+gutter+80 + (gutter+160)*3, 300);
  text("THURSDAY",  40+gutter+80 + (gutter+160)*4, 300);
  text("FRIDAY",    40+gutter+80 + (gutter+160)*5, 300);
  text("SATURDAY",  40+gutter+80 + (gutter+160)*6, 300);
  
  push();
  stroke(0,0,0);
  translate(1100, 80);
  scale(0.7, 0.7);
  tileset.logo();  
  pop();
    
  
}

function whiteGrid() {
	noStroke();
	fill(255,255,255);
	rect(-80,-80,160,160);
}


function draw() {
  if (hasDrawn) return;
  drawCalendarFrame("March 2015");
  	  
  var i = 0; 
  translate(40+gutter, 320 + gutter);
  translate(80, 80);
  
  if (!data.forEach) return;
  data.forEach(function(n) {
    if (n == 1) tileset.tile1();
    if (n == 2) tileset.tile2();
    if (n == 3) tileset.tile3();
    if (n == 4) tileset.tile4();
    if (n >= 5) tileset.tile5();    
    i += 1;
    if (i % 7 == 0) {
     translate((160+gutter)*-6, 160+gutter);
    
    } else {
      translate(160 + gutter, 0);
    }
  }); 
   
  hasDrawn = true;
  
}