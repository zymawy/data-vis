class PopulationComparison extends BaseVisualizer {
	constructor() {
		super('population-comparison', 'Population Comparison', './../data/world-population/world-population.csv');
		this.id = 'population-comparison';
		this.title = 'Population Comparison ✨'
		var marginSize = 40;
		// Locations of margin positions. Left and bottom have double margin
		// size due to axis and tick labels.
		this.leftMargin = 130,
			this.layout = {
				marginSize: marginSize,
				// Locations of margin positions. Left and bottom have double margin
				// size due to axis and tick labels.
				leftMargin: marginSize * 2,
				rightMargin: width - marginSize / 2,
				topMargin: marginSize,
				bottomMargin: height - marginSize * 2,
				pad: 5,

				plotWidth: function () {
					return this.rightMargin - this.leftMargin;
				},
				plotHeight: function () {
					return this.bottomMargin - this.topMargin;
				},
				// Boolean to enable/disable background grid.
				grid: true,

				// Number of axis tick labels to draw so that they are not drawn on
				// top of one another.
				numXTickLabels: 13,
				numYTickLabels: 10,
			};
		// Names for each axis.
		this.xAxisLabel = 'totals';
		this.yAxisLabel = 'years';

		// this.colorList = ['red', 'orange', 'green', 'blue', 'gray', 'black', 'yellow'];
		// labels
		this.labelSpace = 45;
		// Min and max visitors for mapping to canvas height.
		this.minPopulation = 0;
		this.maxPopulation = 0;
		// for better visualization a make sure to give 10 ages between years.
		this.years = ['1970', '1980', '1990', '2000', '2010', '2020', '2030', '2040'];
		// Width of vertical bar.
		this.barWidth = 10;
	}

	setup() {
		super.setup()
		this.setupRows();
		// Font defaults.
		textSize(16);

		// Min and max visitors for mapping to canvas height.
		this.minPopulation = this.getMinValue();
		this.maxPopulation = this.getMaxValue();
	}

	draw() {

		// Draw x and y axis.
		this.drawAxis(this.layout);

		// Draw x and y axis labels.
		this.drawAxisLabels(this.xAxisLabel,
			this.yAxisLabel,
			this.layout);

		// Draw all x-axis labels.
		for (var i = 0; i < this.getYears().length; i++) {
			this.drawXAxisTickLabel(this.getYears()[i],
				this.layout,
				this.mapYearToY.bind(this));
		}

		// Draw all y-axis labels.
		this.drawYAxisTickLabels(this.getMinValue(),
			this.getMaxValue(),
			this.layout,
			this.mapVisitorsToHeight.bind(this),
			0);

		for (var y = 0; y < this.getYears().length; y++) {

			let currentYears = this.getRawData()
				.filter((e) => e.get('year') == this.getYears()[y])
				.take(5)
				.orderBy(function (e) {
					return e.get('population')
				}, ['desc']);

			let maxP = currentYears.maxBy((e) => Number(e.get('population'))).value();
			let minP = currentYears.minBy((e) => Number(e.get('population'))).value();
			currentYears = currentYears.value();

			for (var i = 0; i < currentYears.length; i++) {

				var heights = map(currentYears[i].population(),
					minP.population(),
					maxP.population(),
					this.layout.leftMargin,
					this.layout.bottomMargin);

				// push();
				// // translate();
				// rotate(radians(-25));
				// text(currentYears[i].icon(), i * this.layout.leftMargin + 215 , height - this.layout.leftMargin - heights);
				// pop();

				this.drawVerticalBar(this.colorList[i], (this.mapYearToY(this.getYears()[y])) + (i * 12), heights);

			}
		}

		// Make legend item
		// for (var i = 0; i < 5; i++) {
		// 	this.makeLegendItem(data[i].icon(), data[i].name(), i);
		// }
	}
	mapYearToY(value) {

		return map(value,
			this.getStartYear(),
			this.getEndYear(),
			this.layout.leftMargin,
			this.layout.rightMargin);
	}

	// Smaller number at bottom, bigger number at top.
	mapVisitorsToHeight(value) {
		return map(value,
			this.getMinValue(),
			this.getMaxValue(),
			this.layout.bottomMargin,
			this.layout.topMargin);
	}

	drawVerticalBar(color, x, visitors) {

		fill(color);
		noStroke();

		rect(x,
			visitors,
			this.barWidth,
			this.layout.plotHeight() + this.layout.topMargin - visitors);
	}

	makeLegendItem(label, colour, n) {
		var boxWidth = this.labelSpace / 2;
		var boxHeight = this.labelSpace / 2;
		var x = this.layout.leftMargin + n * 200;
		var y = this.layout.bottomMargin + boxHeight * 3;

		// fill(colour);
		// rect(x, y, boxWidth, boxHeight);
		text(colour, x + boxWidth, y + boxWidth / 2);

		fill('black');
		noStroke();
		textAlign('left', 'center');
		textSize(12);
		text(label, x + boxWidth + 5, y + boxWidth / 2);
	}

	/**
	 * "When the window is resized, create a new canvas with the new width and height."
	 *
	 * The `createCanvas()` function is a built-in function in p5.js. It creates a new canvas with the specified width and
	 * height
	 */
	onResize() {
		this.canvas = createCanvas(1200, 800);
		this.canvas.id(`id-${this.id}`);
		this.canvas.parent(holder)
		// this.canvas.elt.style.width='100%';
		// this.canvas.elt.style.height='100%';
		// this.canvas.elt.width  = canvas.offsetWidth;
		// this.canvas.elt.height = canvas.offsetHeight;

	}
}
