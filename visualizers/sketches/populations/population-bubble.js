class PopulationBubble extends BaseVisualizer {
	constructor() {
		super('population-bubble', 'Population Bubble', 'data-vis/data/world-population/world-population.csv');
		this.id = 'population-bubble';

		this.bubbles = [];
		this.x = this.width / 2;
		this.y = this.height / 2;
		this.title = 'Population Bubble 🫧'
	}

	destroy() {
		this.mySelect.remove();
		this.optionSelect.remove();
		this.orderSelect.remove();
		this.orderLabel.remove();
		this.optionsLabel.remove();
		this.yearLabel.remove();
		this.bubbles = [];
	};


	/**
	 * It sets up the rows, select, select option, select order, and prepares the
	 * data.
	 */
	setup() {
		super.setup()
		this.setupRows();
		this.setupSelect()
		this.setupSelectOption()
		this.setupSelectOrder()
		this.prepare()
	}

	/**
	 * For each bubble, update its position based on the positions of all the other
	 * bubbles, then draw it
	 * @returns the object that is created.
	 */
	draw() {
		if (!this.loaded) {
			console.log('Data not yet loaded');
			return;
		}

		for (var i = 0; i < this.bubbles.length; i++) {
			this.bubbles[i].update(this.bubbles);
		}

		for (var i = 0; i < this.bubbles.length; i++) {
			this.bubbles[i].draw();
		}
	}

	/**
	 * "When the window is resized, create a new canvas with the new width and height."
	 *
	 * The `createCanvas()` function is a built-in function in p5.js. It creates a new canvas with the specified width and
	 * height
	 */
	onResize() {
		this.convas = createCanvas(1200, 700);
		this.convas.id(`id-${this.id}`);
		this.convas.parent(holder)
	}

	prepare() {
		this.bubbles = [];

		this.selectedOrder = 'desc';
		let getCurrentSelectedYearData = this.getCurrentSelectedYearData(),
			maxP = getCurrentSelectedYearData.maxBy((e) => Number(e.get('population'))).value(),
			minP = getCurrentSelectedYearData.minBy((e) => Number(e.get('population'))).value();

		this.minPopulation = this.getMinValue();
		this.maxPopulation = this.getMaxValue();
		this.dominator = (this.maxPopulation - this.minPopulation);

		getCurrentSelectedYearData = getCurrentSelectedYearData.value();

		this.x = width / 2;
		this.y = height / 2;
		for (var i = 0; i < getCurrentSelectedYearData.length; i++) {
			let pup = getCurrentSelectedYearData[i];
			// console.log(_.sampleSize(this.colors, 1), this.colors)
			this.bubbles.push(new Bubble(random(100, width - 100), random(100, height - 100), pup, pup.population(), _.sampleSize(this.colors), {
				max: maxP.population(),
				min: minP.population(),
				dominator: this.dominator
			}));
		}

		// noLoop()
	}
}
