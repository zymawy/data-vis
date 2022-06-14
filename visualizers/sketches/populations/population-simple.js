class PopulationSimple extends SketchBase {
    constructor(sketch) {
    super(sketch);
    this.id = 'population-simple';
    this.width = document.querySelector('#' + this.id).offsetWidth;
    this.height = document.querySelector('#' + this.id).offsetHeight;
    }

    setup () {
        this.getSketch().setup = () => {
            this.onResize();
        }
    }

    draw() {
        this.getSketch().draw = () => {
            if (!this.isReady()) {
                return;
            }
            this.getSketch().text('Work In Progress', this.width / 2, this.height / 2);
        }
    };

    /**
     *
     * @return this
     * @param sketch
     */
    static make(sketch) {
        return new  PopulationSimple(sketch)
    }
}
