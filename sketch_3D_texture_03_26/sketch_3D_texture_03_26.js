let cols, rows;
let scl = 20;
let w = 1400;
let h = 1000;
let img;
let IMG;
let flying = 0;
let terrain = [];

function setup() {

  createCanvas(600, 600, WEBGL);
  img = loadImage("https://raw.githubusercontent.com/Goldencadillac0814/2023_computer_graphics/main/gold.png");
  IMG = loadImage("https://raw.githubusercontent.com/Goldencadillac0814/2023_computer_graphics/main/C1.jpg");
  cols = w / scl;
  rows = h / scl;
  noStroke();

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  flying -= 0.1;


  let yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -50, 50);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0,184,230);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 150);
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      let v = terrain[x][y];
      fill(v - 32, v - 64, v + 128);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }

  push();
  translate(500, 50);
  fill(100, 29, 19);
  texture (img);
  box(200, 150, 150);
  pop();

  push();
  translate(w / 2, h / 2);
  translate(mouseX - width / 2, (mouseY - height / 2) *2);
  rotateX(PI/2);
  normalMaterial();
  fill(130, 69, 19);
  cylinder(15, 500);
  fill(255, 255, 0);
  translate(100, sqrt(3)*101, 0);
  triangle(-95, -75, 75, -75, -100, 75);
  pop();

  push();
  translate(w / 2, h / 2);
  translate(mouseX - width / 2, (mouseY - height / 2) * 2);
  rotate(PI);
  normalMaterial();
  fill(130, 69, 19);
  box(225, 225, 60);
  pop();
}
