var allowed = true;
var behindTail;
var snakeBody;

class Snake {
	constructor() {
		this.body = [];
		this.body[0] = createVector(floor(w / 2), floor(h / 2));
		this.xSpeed = 1;
		this.ySpeed = 0;
	}

	update() {
		//console.log(this.body)
		let head = this.body[this.body.length - 1].copy();
		this.body.shift();
		head.x += this.xSpeed;
		head.y += this.ySpeed;
		this.body.push(head);
	}

	show() {
		for (var i = 0; i < this.body.length; i++) {
			noStroke();
			fill(0);
			rect(this.body[i].x, this.body[i].y, 1, 1);
		}
	}

	setSpeed(x, y) {
		this.xSpeed = x;
		this.ySpeed = y;
	}

	grow() {
		let head = this.body[this.body.length - 1].copy();
		this.body.push(head);
	}

	eat(pos) {
		//let x = this.body[0].x;
		//let y = this.body[0].y;
		let head = this.body[this.body.length - 1].copy();

		if (head.x === pos.x && head.y === pos.y) {
			this.grow();
			return true;
		}

		return false;
	}

	deathCheck() {
		let head = this.body[this.body.length - 1].copy();

		for (let i = 0; i < this.body.length - 1; i++) {
			let tail = this.body[i];
			if (tail.x === head.x && tail.y === head.y) {
				return true;
			}
		}

		return false;
	}

	changeSide() {
		let head = this.body[this.body.length - 1].copy();
		let origHead = this.body[this.body.length - 1];

		console.log(head.x);

		if (head.x > w - 1) {
			origHead.x = 0;
		} else if (head.x < 0) {
			origHead.x = w;
		} else if (head.y > h - 1) {
			origHead.y = 1;
		} else if (head.y < 0) {
			origHead.y = h;
		}
	}

	findPath() {
		let head = this.body[this.body.length - 1].copy();
		if (allowed) {
			if (food.x < head.x && snake.xSpeed !== 1) {
				this.setSpeed(-1, 0)
			} else if (food.x > head.x && snake.xSpeed !== -1) {
				this.setSpeed(1, 0)
			} else if (food.y < head.y && snake.ySpeed !== 1) {
				this.setSpeed(0, -1)
			} else if (food.y > head.y && snake.ySpeed !== -1) {
				this.setSpeed(0, 1)
			}
		}
	}

	avoidCollide() {
		let head = this.body[this.body.length - 1].copy();
		if (this.body.length >= 2) {
			behindTail = this.body[this.body.length - 2].copy();
			for (let i = 0; i < this.body.length - 1; i++) {
				let tail = this.body[i];
				if (tail.x === head.x + 1 && tail.y === head.y && this.ySpeed !== -1) {
					if (tail.x !== behindTail.x) {
						console.log("GOING TO COLLIDE 1");
						// saveCanvas(canvas)

						allowed = false;
						snake.setSpeed(0, 1);
					}
				} else if (tail.x === head.x - 1 && tail.y === head.y && this.ySpeed !== -1) {
					if (tail.x !== behindTail.x) {
						console.log("GOING TO COLLIDE 2");
						// saveCanvas(canvas)

						allowed = false;
						snake.setSpeed(0, -1);
					}
				} else if (tail.x === head.x && tail.y === head.y + 1 && this.xSpeed !== -1) {
					if (tail.x !== behindTail.x) {
						console.log("GOING TO COLLIDE 3");
						// saveCanvas(canvas)

						allowed = false;
						snake.setSpeed(1, 0);
					}
				} else if (tail.x === head.x && tail.y === head.y - 1 && this.ySpeed !== 1) {
					if (this.body.length > 2) {
						console.log("GOING TO COLLIDE 4");
						// saveCanvas(canvas)
						if (collideDown) {
							snake.setSpeed(-1, 0);
							console.log('Turned Left')
						} else {
							snake.setSpeed(1, 0)
							console.log('Turned Right')
						}
					}
				} else {
					allowed = true
				}
			}
		}
	}
}

function collideDown() {
	let head = this.body[this.body.length - 1].copy();
	behindTail = this.body[this.body.length - 2].copy();
	for (let i = 0; i < this.body.length - 1; i++) {
		let tail = this.body[i];
		if (tail.x !== behindTail.x) {
			for (j = this.body.length - 1; j > 0; j++) {
				if (head.x + j === this.body[j]) {
					return false;
				} else if (j === 1) {
					return true;
				}
			}

		}
	}
}
function moveLeft() {
}
function moveDown() {
}
function moveUp() {
}
/*
if (keyCode === UP_ARROW && snake.ySpeed !== 1) {
	snake.setSpeed(0, -1);
} else if (keyCode === DOWN_ARROW && snake.ySpeed !== -1) {
	snake.setSpeed(0, 1);
} else if (keyCode === LEFT_ARROW && snake.xSpeed !== 1) {
	snake.setSpeed(-1, 0);
} else if (keyCode === RIGHT_ARROW && snake.xSpeed !== -1) {
	snake.setSpeed(1, 0);
}
*/
