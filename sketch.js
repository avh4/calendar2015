var data = [1, 2, 3, 4, 5,6,5,4];
var gutter = 10;
var hasDrawn = false;
var curve;
var smooth;

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
}

function draw() {
  if (hasDrawn) return;
  
  drawCalendarFrame("MARCH 2015");
  
  var i = 0;
  
  translate(40+gutter, 320 + gutter);
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
    if (i % 7 == 0) {
      translate((160+gutter)*-6, 160);
    } else {
      translate(160 + gutter, 0);
    }
  });
  hasDrawn = true;
}