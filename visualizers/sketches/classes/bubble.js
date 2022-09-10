/* It's a class that represents a bubble on the screen */
class Bubble {

	constructor(x, y, pop, count,colour, config = {}) {
		this.x = x;
		this.y = y;
		this.pop = pop;
		this.count = count;
		this.vec = createVector(random(-1,1), random(-1,1));
		this.size = 0;
		this.colour = colour;
		this.config = config;
	}

	draw () {
		fill(this.colour);
		this.size = map(this.count, this.config.min, this.config.max, 100, 530);
		ellipse(this.x, this.y, this.size);
		fill(0);
		textSize(10)
		textAlign(CENTER, CENTER);
		text(this.pop.ios()  + " " + this.pop.icon(), this.x, this.y);
		stroke(42)
		text(this.pop.population(), this.x, this.y + 20);
	}

	update (bubbles) {
		// update x based on dx
		this.x += this.vec.x;
		this.y += this.vec.y;

		// is the bubble cose to a wall
		if (this.x + this.size/2 >= width || this.x - this.size/2 <= 0) {
			this.vec.x = this.vec.x * -1;
		}
		if (this.y + this.size/2 >= height || this.y - this.size/2  <= 0) {
			this.vec.y = this.vec.y * -1;
		}

		for (var i = 0; i < bubbles.length; i++) {
			if (bubbles[i].name == this.name) {
				break;
			} else {
				if (dist(this.x, this.y, bubbles[i].x, bubbles[i].y) < this.size/2 + bubbles[i].size/2) {

					this.vec.x = ((this.x - bubbles[i].x) * 0.01);
					this.vec.y = ((this.y - bubbles[i].y) * 0.01);

					bubbles[i].vec.x = -((this.x - bubbles[i].x) * 0.01);
					bubbles[i].vec.y = -((this.y - bubbles[i].y) * 0.01);
				}
			}
		}
	}
}
