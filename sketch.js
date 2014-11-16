var data = [10, 5];

function setup() {
  createCanvas(800, 600);
  loadCalendar(function(d) {
    data = d;
    clear();
  });
}

function draw() {
  var i = 0;
  var x, y;
  if (!data.forEach) return;
  data.forEach(function(n) {
    var scale = n/6;
    y = Math.floor(i/7) * 100;
    x = (i%7) * 100;
    ellipse(x + 50, y + 50, 80*scale, 80*scale);
    i += 1;
  });
}