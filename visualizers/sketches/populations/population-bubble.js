class PopulationBubble extends SketchBase {

    constructor(sketch, data = []) {
        super(sketch, null, data);
        this.id = 'population-bubble';
        this.width = document.querySelector('#' + this.id).offsetWidth;
        this.height = document.querySelector('#' + this.id).offsetHeight;
        this.bubbles = [];
        this.x = this.width / 2;
        this.y = this.height / 2;
    }

    // Preload the data. This function is called automatically by the

    /**
     *
     * @return this
     * @param sketch
     */
    static make(data) {

        return (sketch) => {
            return new PopulationBubble(sketch, data)
        }
    }
    setup() {
        this.getSketch().setup = () => {
            this.onResize();
            document.addEventListener('select::value', ({ detail }) => {
                this.prepare()
            })

            if (this.bubbles.length) {
                this.prepare()
            }
        }
    }

    prepare() {
        var that = this;
        let getCurrentSelectedYearData = this.getRawData()
            .filter((e) => e.year == this.getSelectedYear())
            .take(this.getSelectedOption())
            .orderBy(['population'], [this.getSelectedOrder()]);

        // let's get going and use histogram algrtom and calc the results...
        let maxValue = getCurrentSelectedYearData.maxBy((e) => Number(e.population)).value().population;
        let minValue = getCurrentSelectedYearData.minBy((e) => Number(e.population)).value().population;
        let dominator = (maxValue - minValue);

        getCurrentSelectedYearData.value()
            .forEach((country, index) => {

                if (country.name) {
                    let size = (country.population - minValue) / dominator;
                    // todo make Bubble a class! for more readability
                    let b = {};
                    b.size = size / 2;
                    b.pos = createVector(0, 0, 0);
                    b.direction = createVector(0, 0, 0);
                    b.name = country.name + " " + country.icon;
                    b.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                    //draw the bubble and names
                    b.draw = function () {
                        that.getSketch().push();
                        that.getSketch().noStroke();
                        that.getSketch().fill(this.color);
                        that.getSketch().ellipse(this.pos.x, this.pos.y, this.size);
                        that.getSketch().fill(0);
                        that.getSketch().textAlign(CENTER, CENTER);
                        that.getSketch().textStyle(BOLDITALIC);
                        that.getSketch().textSize(15);
                        that.getSketch().text(this.name, this.pos.x, this.pos.y);
                        that.getSketch().pop();
                    }
                    //update the bubbles directions
                    b.update = function (_bubbles) {
                        this.direction.set(0, 0, 0);
                        for (var i = 0; i < _bubbles.length; i++) {
                            if (_bubbles[i].name !== this.name) {
                                var v = p5.Vector.sub(this.pos, _bubbles[i].pos);
                                // throw new Error(`You have to implement the method make in order to use `);
                                var d = v.mag();
                                if (d < this.size / 2 + 30 + _bubbles[i].size / 2) {
                                    d > 0 ? this.direction.add(v) : this.direction.add(p5.Vector.random2D());
                                }
                            }
                        }
                        this.direction.normalize();
                        this.direction.mult(2);
                        this.pos.add(this.direction);
                    } // end of update inner function

                    this.bubbles.push(b);
                } // end of if
            });
    }

    draw() {

        this.getSketch().draw = () => {
            this.getSketch().push();
            if (!this.isReady()) {
                return;
            }

            if (!this.bubbles.length) {
                this.prepare();
            }
            // Draw the bubbles.
            this.getSketch().translate(this.width / 2, this.height / 2);
            for (var i = 0; i < this.bubbles.length; i++) {
                this.bubbles[i].update(this.bubbles);
                this.bubbles[i].draw();
                if (i === this.bubbles.length - 1) {
                    break;
                } // ends the loop when the loop counter i=16.
            }

            this.sketch.pop()
        };
    }

    // to clear the canvas
    destroy() {
        this.bubbles = [];
    }
}
