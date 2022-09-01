class PopulationSimple extends SketchBase {
    constructor(sketch, data = []) {
        super(sketch, null, data);
        this.id = 'population-simple';
        this.width = document.querySelector('#' + this.id).offsetWidth;
        this.height = document.querySelector('#' + this.id).offsetHeight;
    }

    setup() {
        this.getSketch().setup = () => {
            this.onResize();
        }
    }

    draw() {
        push();
        this.sketch.draw = () => {
            // this.sketch.text('بسم الله الرحمن الرحيم', this.width / 2, this.height / 2)

            let getCurrentSelectedYearData = this.getRawData()
                .filter((e) => e.year == this.getSelectedYear())
                .take(this.getSelectedOption())
                .orderBy(['population'], [this.getSelectedOrder()]);

            // let's get going and use histogram algrtom and calc the results...
            let maxValue = getCurrentSelectedYearData.maxBy((e) => Number(e.population)).value().population;
            let minValue = getCurrentSelectedYearData.minBy((e) => Number(e.population)).value().population;
            let dominator = (maxValue - minValue);


            // console.log(maxValue, minValue, this.getCurrentSelectedYearData());
            // throw new Error('Debug');

            getCurrentSelectedYearData.value().forEach((v, i) => {
                let result = (v.population - minValue) / dominator;
                let movement = i * 50;

                result = result * this.height - 10; // sup 10 to give a space for icons :)
                let v40 = 40;
                this.sketch.rect(
                    movement,
                    this.height - 4,
                    v40,
                    -result
                );

                this.sketch.fill(PopulationRace.CSS_COLORS[v.rank]);
                this.sketch.push();
                this.sketch.translate(movement + 10, this.height - (result) - 10);
                this.sketch.rotate(radians(-25));
                this.sketch.fill(0, 200, 220);

                if (v.icon) {
                    this.sketch.smooth();
                    this.sketch.text(v.icon, 0, 0);
                    this.sketch.noSmooth();
                }
                this.sketch.pop();
            })
            if (this.t < 40) {
                this.t = this.t + 1;
            }
            // throw new Error(`You have to implement the method make in order to use`);
        };
        pop();
    }

    /**
     *
     * @return this
     * @param sketch
     */
    static make(data) {

        return (sketch) => {
            return new PopulationSimple(sketch, data)
        }
    }
}
