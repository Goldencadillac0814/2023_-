PImage img;

void preload(){
  img = loadImage("s.png");
  
}

void setup() {
  size(400, 400, P3D);
  noStroke();
}

void draw() {
  background(220);
  translate(width/2, height/2, 0);
  rotateY(pmouseX * 0.01);
  rotateX(pmouseY * 0.01);
  texture(img);
  box(100);
}
