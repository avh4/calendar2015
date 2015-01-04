var data = [1, 2, 3, 4, 5,6,5,4];
var gutter = 10;
var hasDrawn = false;
var curve;
var smooth;

function setup() {
  createCanvas(160*8 + gutter*7, 2000);
  angleMode(DEGREES);
  loadCalendar(function(d) {
    data = d;
    hasDrawn = false;
    clear();
  });
  curve = random(200) - 100;
  smooth = random(200) - 100;
}

function tile1() {
  stroke(0, 0, 0);
  line(0, -80, 0, -60);
  line( -80,0, -60, 0);
  line(0, 80, 0, 60);
  line( 80,0, 60, 0);
}

function tile2() {
  tile1();
  line(-60,0, 0,-60);
}


function tile3() {
  tile2();
  line(60,0, 0,60);
  
}

function tile4() {
  stroke(0, 0, 0);
  line(0, -80, 0, 80);
  line(-80, 0, 80, 0);
}

function tile5() {
  tile4();
  rotate(45);
  tile4();
  rotate(-45);
  
}

function tile6() {
  bezier(-80, 0,  -smooth, -curve, smooth, -curve, 80, 0);
  bezier(0, -80,  -curve, -smooth, -curve, smooth, 0, 80);
  
}

function draw() {
  if (hasDrawn) return;
  
  var i = 0;
  
  translate(80, 80);
  
  if (!data.forEach) return;
  data.forEach(function(n) {
    if (n == 1) tile1();
    if (n == 2) tile2();
    if (n == 3) tile3();
    if (n == 4) tile4();
    if (n == 5) tile5();
    if (n >= 6) tile6();
    i += 1;
    if (i % 6 == 0) {
      translate((160+gutter)*-6, 160);
    } else {
      translate(160 + gutter, 0);
    }
  });
  hasDrawn = true;
}