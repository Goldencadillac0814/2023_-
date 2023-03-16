let img;

function preload(){
  img = loadImage("https://raw.githubusercontent.com/Goldencadillac0814/2023_computer_graphics/main/3D%26Texture/data/sw.jpg")
}

function setup() {
  createCanvas(400, 400, WEBGL);
  noStroke()
}

function draw() {
  background(220);
  rotateY(pmouseX/20)
  rotateX(pmouseY/20)
  texture(img)
  sphere(150)
}
