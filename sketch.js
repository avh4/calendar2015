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
var arch;

window.onresize = function() {
  hasDrawn = false;
  setVariables();
  createCanvas(width, height);
}

var setVariables = function() {

  var themes = {
    orange: {
      background: color(239, 221, 204),
      cell: color(255, 255, 255, 255*0.3),
      line: color(0, 0, 0)
    }
  };

  
  width = window.innerWidth;
  height = window.innerHeight;
  gridTop = 100;
  gutter = 10;
  cellSize = width / 9;
  gridLeft = cellSize/2;
  stemSize = cellSize/30;
  stemSize1 = cellSize/12;
  stemSize2 = cellSize/3;
  weekdayFontSize = 6 + (cellSize*14/8/20);

  colors = themes.orange;
};

var Tileset1 = {
  tile1: function() {
	strokeWeight(2); 
	line(0, -cellSize/2, 0, -(cellSize/2 - stemSize1));
	line( -cellSize/2,0, -(cellSize/2 - stemSize1), 0);
	line(0, cellSize/2, 0, (cellSize/2 - stemSize1));
	line( cellSize/2,0, (cellSize/2 - stemSize1), 0);

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

var Tileset2 = {
  tile1: function() {
  	strokeWeight(2); 
    
  	line(0, -cellSize/2, 0, -(cellSize/2 - stemSize));
  	line( -cellSize/2,0, -(cellSize/2 - stemSize), 0);
  	line(0, cellSize/2, 0, (cellSize/2 - stemSize));
  	line( cellSize/2,0, (cellSize/2 - stemSize), 0);	
  },
  tile2: function() {
  	noFill();
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



var Tileset3 = {
  tile1: function() { 
  	strokeWeight(3); 
  	line(cellSize/3, -cellSize/2, cellSize/3, -(cellSize/2 - stemSize2));
	line(cellSize/5, -cellSize/2, cellSize/5, -(cellSize/2 - stemSize2));
  	line( -cellSize/2, cellSize/5 , -(cellSize/2 - stemSize2), cellSize/5);
  	
//  	line(0, cellSize/2, 0, (cellSize/2 - stemSize));
//  	line( cellSize/2,0, (cellSize/2 - stemSize), 0);	
  },
  tile2: function() {
  	this.tile1();
  	line(cellSize/5, -(cellSize/2 - stemSize2),-cellSize/2,-cellSize/2);
  },
  tile3: function() {
  	this.tile2();
  	line((cellSize/2 - stemSize),0, 0,(cellSize/2 - stemSize));
  },
  tile4: function() {
    line(-cellSize/2, 0, cellSize/2, 0);
    line( -cellSize/4, 0,  0, -cellSize/4);
    line((cellSize/2 - stemSize),0, 0,(cellSize/2 - stemSize));
  },
	tile5: function() {
  this.tile3();
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

function u(p) {
  return p*cellSize/10;
}

function uline(x1, y1, x2, y2) {
  line(u(x1), u(y1), u(x2), u(y2));
}

var Tileset4 = {
  useCornerOrigin: false,

  tile1: function() {
  	strokeWeight(3); 
    stroke(0, 0, 0);
    uline(0, -5, 0, -4);
    uline(-5,0,-4,0);
    uline(0, 5, 0, 4);
    uline(5, 0, 4, 0);
  },
  tile2: function() {
  	noFill();
  	this.tile1();
  	bezier(-(cellSize/2 - stemSize),0, -20,-2,-2,-20, 0,-(cellSize/2 - stemSize));
  },
  tile3: function() {
  	this.tile2();
  	bezier((cellSize/2 - stemSize),0,20,2,2,20, 0,(cellSize/2 - stemSize));
  },
  tile4: function() {
    noFill();
    bezier(-cellSize/2, 0,  -smooth, -smooth, smooth, -smooth, cellSize/2, 0);
    bezier(0, -cellSize/2,  -smooth, -smooth, -smooth, smooth, 0, cellSize/2);
  },
	tile5: function() {
  	this.tile4();
  	rotate(arch*45);
  	this.tile4();
  	rotate(arch*-45);
	},
  logo: function() {
    for (var i = 0; i < 8; i++) {
		this.tile4();
	    rotate(45);
    }
  }
};


var tileset = Tileset4;

function setup() {
  setVariables();
  
  createCanvas(width, height);
  angleMode(DEGREES);
  loadCalendar(function(d) {
    data = d;
    hasDrawn = false;
    clear();
  });
  curve = random(40);
  smooth = random(40);  
  arch = random(-1);
  archb = random(-1,1);
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

    if (tileset.useCornerOrigin) {
      translate(-cellSize/2, -cellSize/2);
    }
    
    if (n == 1) tileset.tile1();
    if (n == 2) tileset.tile2();
    if (n == 3) tileset.tile3();
    if (n == 4) tileset.tile4();
    if (n >= 5) tileset.tile5();  

    if (tileset.useCornerOrigin) {
      translate(cellSize/2, cellSize/2);
    }

  }); 
   
  hasDrawn = true;
}