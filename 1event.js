var gutter = 10;

function setup() {
  createCanvas(2000 + gutter, 160);
  angleMode(DEGREES);
}

function drawBackground() {
  noStroke();
  fill(240, 240, 240);
  rect(0, 0, 160, 160);
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
}


function draw() {
  drawBackground();
 
  
  translate(80, 80);
  tile1();
  
  translate(160 + gutter, 0);
  tile2();
  
  translate(160 + gutter, 0);
  tile3();
  
  translate(160 + gutter, 0);
  tile4();
  
  translate(160 + gutter, 0);
  tile5();
}
