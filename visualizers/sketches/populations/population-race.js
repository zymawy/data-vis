class PopulationRace extends SketchBase {

    constructor(sketch) {
        super(sketch);
        this.id = 'population-race';
        this.width = document.querySelector('#' + this.id).offsetWidth;
        this.height = document.querySelector('#' + this.id).offsetHeight;
        // Graph properties.
        this.pad = 20;
        this.dotSizeMin = 15;
        this.dotSizeMax = 40;
        // target values
        this.values = [];
// intermediate values
        this.lerpValues = [];
// index which will increase at regular intervals
        this.index = 0;
        this.t = 0;
    }

    setup () {
        this.sketch.setup = () => {
            this.onResize();
        }
    }

    draw () {

        this.sketch.draw = () => {
            this.sketch.push();
            // this.sketch.text('بسم الله الرحمن الرحيم',10,10)
            if (! this.isReady()) {
                return;
            }

            // console.log(this.getData().all())
            // const sum = this.getRows().slice(0, 22).reduce((a, b) => a + b, 0);
            this.getRows()
            .slice(0, 22)
            .filter((o) => {
                return o.getString('1980')
            }).sort((s, f) => {
                return s.getString('rank') - f.getString('rank')
            }).forEach((v, i) => {
                // the width of each column
                let v40 = 30;
                this.sketch.rect(i * v40, this.height, v40, -v.getString('rank') * v.getString('rank') - 10);
                this.sketch.fill(0, 200, 220);
                this.sketch.push();
                this.sketch.translate(i * v40 + 10, this.height - 1 - v.getString('rank')- 10);
                // this.sketch.rotate(radians(-25));
                this.sketch.fill(0, 200, 220);

                if (v.get('icon')) {
                    this.sketch.text(v.getString('icon'), 0, 0);
                }
                this.sketch.pop();
            })
            for (let i = 0; i < 15; i++) {
            }
            if (this.t < 40) {
                this.t = this.t + 1;
            }
            this.sketch.pop();
            // throw new Error(`You have to implement the method make in order to use`);
        };
    }

    /**
     *
     * @return this
     * @param sketch
     */
    static make(sketch) {
        return new  PopulationRace(sketch)
    }
}
