class PopulationSimple extends BaseVisualizer {
	constructor() {
		super('population-simple', 'Population Simple', './../data/world-population/world-population.csv');
		// Graph properties.
		this.pad = 20;
		this.dotSizeMin = 15;
		this.dotSizeMax = 40;
		this.marginSize = 35;
		// target values
		this.values = [];
		// index which will increase at regular intervals
		this.index = 0;
		this.t = 0;

		this.boxes = [];

	}

	destroy() {
		this.mySelect.remove();
		this.optionSelect.remove();
		this.orderSelect.remove();
	};
	async preload() {
		await loadTable(
			this.data_path, 'csv', 'header',
			// Callback function to set the value
			// this.loaded to true.
			(table) => {
				dataTesting = this.data = table;
				this.numRows = this.data.getRowCount();
				this.numCols = this.data.getColumnCount();

				// console.trace();
				this.loaded = true;
				// let's get going and notify our main class :)
				const eventAwesome = new CustomEvent('data::set', {
					bubbles: true,
					detail: { data: () => this.data, rawData: () => this.rawData }
				});
				// let's dispatch it !
				document.dispatchEvent(eventAwesome)
			});
	};

	setup() {

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

		// Names for each axis.
		this.xAxisLabel = 'Countries';
		this.yAxisLabel = 'Population';
		this.marginSize = 15;
		// Width of vertical bar.
		this.barWidth = 3;
		// Colors for vertical bar
		this.colorList = ['red', 'orange','green','blue', 'gray'];
		// labels
		this.labelSpace = 45;
		// Layout object to store all common plot layout parameters and
		// methods.
		this.layout = {
			marginSize: this.marginSize,
			// Locations of margin positions. Left and bottom have double margin
			// size due to axis and tick labels.
			leftMargin: this.marginSize * 5,
			rightMargin: width - this.marginSize/2,
			topMargin: this.marginSize,
			bottomMargin: height - this.marginSize*2,
			pad: 5,

			plotWidth: function() {
				return this.rightMargin - this.leftMargin;
			},

			plotHeight: function() {
				return this.bottomMargin - this.topMargin;
			},

			// Boolean to enable/disable background grid.
			grid: true,
			numXTickLabels: 13,
			numYTickLabels: 10,
		};

		// Min and max visitors for mapping to canvas height.
		this.minYear = 0;
		this.maxYear = 0;


	}

	draw() {

		let year = this.getSelectedYear();
		let dateYear = this.getDataByColumn(year);
		this.minYear = dateYear.min();
		this.maxYear = dateYear.max();

		// let's get going and use histogram algrtom and calc the results...
		this.maxPopulation = this.getMaxValue();
		this.minPopulation = this.getMinValue();
		let dominator = (this.maxPopulation - this.minPopulation);
		let data = this.getCurrentSelectedYearData().value();
		// // Draw all y-axis tick labels.
		this.drawYAxisTickLabels(this.minPopulation,
			this.maxPopulation,
			this.layout,
			this.mapTemperatureToHeight.bind(this),
			1);

		this.drawAxis(this.layout);

		this.drawAxisLabels(this.xAxisLabel,
			this.yAxisLabel,
			this.layout);

		this.meanPopulation = this.getCurrentSelectedYearData().sumBy((e) => e.population()).value() / data.length;
		stroke(200);
		strokeWeight(1);
		line(this.layout.leftMargin,
			this.mapTemperatureToHeight(this.meanPopulation),
			this.layout.rightMargin,
			this.mapTemperatureToHeight(this.meanPopulation));
		let previous = null;
		for (let i = 0; i < data.length; i++) {
			fill(0, 200, 220);
			let result = (data[i].population() - this.minPopulation) / dominator;
			let movement = i * 45;

			result = result * this.layout.bottomMargin; // sup 10 to give a space for icons :)
			let v40 = 40;
			let ground = height - this.layout.topMargin - 17;
			 result = (result > this.minPopulation ? height - this.layout.topMargin - 17: result);

			rect(movement + this.layout.leftMargin,
				ground,
				v40,
				-min(result, ground));
			fill(0, 200, 220);
			push();
			translate(movement + this.layout.leftMargin + 25 , height - this.layout.topMargin - result);
			rotate(radians(-25));
			fill(0, 200, 220);
			text(data[i].icon(), 0, 0);
			pop();

			push();
			translate(movement + this.layout.leftMargin ,
				height - this.layout.topMargin  - result);
			rotate(radians(-90));
			fill('black');
			text(data[i].ios(), 0, 0);
			// text(data[i].population() + ' Billion' , 0, 0);
			fill(0, 200, 220);
			pop();
			previous = data[i];
		}
	}

	mapTemperatureToHeight(value) {

		return map(value,
			this.minPopulation,
			this.maxPopulation,
			this.layout.bottomMargin,
			this.layout.topMargin);
	};

	/**
	 *
	 * @return this
	 * @param sketch
	 */
	static make(data) {
		return (sketch) => {
			return new PopulationRace(sketch, data)
		}
	}
}
