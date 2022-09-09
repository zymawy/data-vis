class PopulationBubble extends BaseVisualizer {
	constructor() {
		super('population-bubble', 'Population Bubble', './../data/world-population/world-population.csv');
		this.id = 'population-bubble';
		// this.width = document.querySelector('#' + this.id).offsetWidth;
		// this.height = document.querySelector('#' + this.id).offsetHeight;
		this.bubbles = [];
		this.x = this.width / 2;
		this.y = this.height / 2;
		this.title = 'Welcome'
	}
	async preload() {
		await loadTable(
			this.data_path, 'csv', 'header',
			// Callback function to set the value
			// this.loaded to true.
			(table) => {
				dataTesting = this.data = table;
				this.numRows = this.data.getRowCount();
				this.numCols = this.data.getColumnCount();


				this.loaded = true;
				// let's get going and notify our main class :)
				const eventAwesome = new CustomEvent('data::set', {
					bubbles: true,
					detail: { data: () => this.data, rawData: () => this.rawData }
				});
				// let's dispatch it !
				document.dispatchEvent(eventAwesome)
			});
	}

	destroy() {
		this.mySelect.remove();
		this.optionSelect.remove();
		this.orderSelect.remove();
		this.bubbles = [];
	};


	setup() {
		this.onResize();

		this.rawData = this.data.getRows().map((e) => {
			return new Row({
				name: e.getString('name'),
				growthRate: e.getNum('growthRate'),
				worldPercentage: e.getNum('worldPercentage'),
				// density: e.getString('density'),
				rank: e.getNum('rank'),
				population: e.getNum('puplistion'),
				year: e.getNum('year'),
				icon: e.getString('icon'),
				ios: e.getString('ios-code')
			});
		});

		// initales the tools !
		this.setupSelect()
		this.setupSelectOption()
		this.setupSelectOrder()

		document.addEventListener('select::value', ({ detail }) => {
			this.selectedYear = detail.value();
			this.prepare()
		});
		document.addEventListener('select::option-value', ({ detail }) => {
			this.selectedOption = detail.value();
			this.prepare()
		});
		document.addEventListener('select::order-value', ({ detail }) => {
			this.selectedOrder = detail.value();
			this.prepare()
		});

		this.prepare()
	}

	draw() {
		if (!this.loaded) {
			console.log('Data not yet loaded');
			return;
		}

		for (var i = 0; i < this.bubbles.length; i++) {
			console.log(this.bubbles[i]);
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

		console.log('Welromv')
		this.bubbles = [];

		this.selectedOrder ='desc';
		let getCurrentSelectedYearData = this.getCurrentSelectedYearData(),
			maxP = getCurrentSelectedYearData.maxBy((e) => Number(e.get('population'))).value(),
			minP = getCurrentSelectedYearData.minBy((e) => Number(e.get('population'))).value();

		this.minPopulation = this.getMinValue();
		this.maxPopulation = this.getMaxValue();
		this.dominator = (this.maxPopulation - this.minPopulation);

		getCurrentSelectedYearData = getCurrentSelectedYearData.value();

		this.x = width /2 ;
		this.y = height/2;
		for(var i = 0; i < getCurrentSelectedYearData.length; i++)
		{
			let pup = getCurrentSelectedYearData[i];
			this.bubbles.push(new Bubble(
				random(100 ,width-100),
				random(100, height-100),
					pup,
					pup.population(),
					color(random(100,255),random(100,255),random(100,255)),
					{max:maxP.population(), min: minP.population(),dominator: this.dominator}
				)
			);
		}

		// noLoop()
	}
}
