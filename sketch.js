const {Engine, World, Bodies, Constraint, Body} = Matter;

var engine, world;

var snake;
var grid = 20;
var w, h;
var food;

function setup(){
  createCanvas(600, 600);
  frameRate(8)
  w = width/grid;
  h = height/grid;
  snake = new Snake();

  foodLocation();
}
//start from food

function draw() {
  background(220);
  scale(grid);

  noStroke();
  fill ("red");
  rect(food.x, food.y, 1, 1) 

  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();  

  if (snake.deathCheck()) {
    background("red");
    noLoop();
  }

   
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.setSpeed(0, -1)
  } else if (keyCode === DOWN_ARROW) {
    snake.setSpeed(0, 1)
  } else if (keyCode === LEFT_ARROW) {
    snake.setSpeed(-1, 0)
  } else if (keyCode === RIGHT_ARROW) {
    snake.setSpeed(1, 0)
  }
}

function foodLocation() {
  var x = floor(random(w));
  var y = floor(random(h));
  food = createVector(x, y)
}