let s;
let scl = 20;
let food;
let obstacle;
let playfield = 600;
let difficulty = 10; // 추가된 변수 - 1초당 프레임 수

let gameStarted = false;

function setup() {
  createCanvas(playfield, 640);
  background(51);
  frameRate(difficulty);
  s = new Snake();
}

function draw() {
  if (gameStarted) {
    background(51);
    scoreboard();
    if (s.eat(food)) {
      pickLocation();
    }
    if (s.death()) {
      gameStarted = false;
    }
    s.update();
    s.show();
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
    fill(255, 0, 0);
    rect(obstacle.x, obstacle.y, scl, scl);

    // Check if the snake hit the obstacle
    let d = dist(s.x, s.y, obstacle.x, obstacle.y);
    if (d < 1) {
      s.total = 0;
      s.score = 0;
      s.tail = [];
    }
  }
  else 
  {
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Press to Start", width / 2, height / 2);
  }
}

function pickLocation() {
  let cols = floor(playfield / scl);
  let rows = floor(playfield / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
  obstacle = createVector(floor(random(cols)), floor(random(rows)));
  obstacle.mult(scl);

  // Check the food isn't appearing inside the tail or the obstacle
  for (let i = 0; i < s.tail.length; i++) {
    let pos = s.tail[i];
    let d = dist(food.x, food.y, pos.x, pos.y);
    if (d < 1) {
      pickLocation();
    }

    d = dist(obstacle.x, obstacle.y, pos.x, pos.y);
    if (d < 1) {
      pickLocation();
    }
  }

  for (let i = 0; i < s.tail.length; i++) {
    let pos = s.tail[i];
    let d = dist(food.x, food.y, pos.x, pos.y);
    if (d < 1) {
      pickLocation();
    }
  }
}

function scoreboard() {
  fill(0);
  rect(0, 600, 600, 40);
  fill(255);
  textFont("Georgia");
  textSize(18);
  text("Score: ", 50, 625);
  text("Highscore: ", 450, 625);
  text(s.score, 110, 625);
  text(s.highscore, 540, 625);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    s = new Snake();
    pickLocation();
  } else {
    gameStarted = false;
  }
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.colorArray = [];
  this.score = 0;
  this.highscore = 0;

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.update = function () {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);
    let r = floor(random(255));
    let g = floor(random(255));
    let b = floor(random(255));
    this.colorArray.push(color(r, g, b));
    
    this.tail[this.total - 1] = createVector(this.x, this.y);
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, playfield - scl);
    this.y = constrain(this.y, 0, playfield - scl);
  };
 
  this.show = function () {

    fill(255);

    for (let i = 0; i < this.tail.length; i++) {
      fill(this.colorArray[i]);
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);

  };

  this.eat = function (pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      this.score++;
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
      return true;
      } 
    else {
      return false;
    }
  };

  this.death = function () {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.score = 0;
        this.total = 0;
        this.tail = [];
        return true;
      }
    }
    return false;
  };
}
