function setup() {
  createCanvas(1000, 1000);
  frameRate(60);
  step = [];

  x = width / 2;
  y = height / 2;
  background(220);
  game = true;
}

function draw() {
  background(220);


  if (mouseIsPressed) {
    step = smoothStep(x, y, mouseX, mouseY, 60);
  } else if (step.length > 0) {
    x = step[0][0];
    y = step[0][1];
    step.splice(0, 1);
  }

  ellipse(x, y, 20);
}

function smoothStep(x1, y1, x2, y2, steps) {
  let moves = [];
  //steps = floor(dist(x1,y1,x2,y2)/10)
  for (let i = 0; i < steps; i++) {
    moves.push([
      x1 + (x2 - x1) * ((cos(PI / steps * i) * -1) / 2 + 0.5),
      y1 + (y2 - y1) * ((cos(PI / steps * i) * -1) / 2 + 0.5)
    ]);
  }
  return moves;
}