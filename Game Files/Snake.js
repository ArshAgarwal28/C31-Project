class Snake {
    constructor() {
        this.body = [];
        this.body[0] = createVector(floor(w/2), floor(h/2));
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
            rect(this.body[i].x, this.body[i].y, 1, 1)
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

        if (head.x > w-1 || head.x < 0 || head.y > h-1 || head.y < 0) {
            return true;
        }
        for (let i = 0; i < this.body.length-1; i++) {
            let tail = this.body[i];
            if (tail.x === head.x && tail.y === head.y) {
                return true;
            }
        }

        return false;
    }
}