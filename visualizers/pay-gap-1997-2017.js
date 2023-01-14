/* It draws a line plot of the gender pay gap from 1997 to 2017 */
class PayGapTimeSeries extends BaseVisualizer {

	constructor() {
		super('pay-gap-timeseries', 'Pay gap: 1997-2017', 'data/pay-gap/all-employees-hourly-pay-by-gender-1997-2017.csv');
		// Title to display above the plot.
		this.title = 'Gender Pay Gap: Average difference between male and female pay.';
		// Names for each axis.
		this.xAxisLabel = 'year';
		this.yAxisLabel = '%';
		this.marginSize = 35;

		// Layout object to store all common plot layout parameters and
		// methods.
		/* Calling the `prepare` method. */
		this.prepare();
	}

	setup() {
		super.setup()
		// Font defaults.
		textSize(16);
		if (!this.isReady()) {
			console.log('Data not yet loaded');
			return;
		}
		this.prepareData()
	};

	draw() {
		if (!this.isReady()) {
			console.log('Data not yet loaded');
			return;
		}

		if (!this.maxPayGap) {
			this.prepareData()
		}
		// Draw all y-axis labels.
		this.drawYAxisTickLabels(this.minPayGap, this.maxPayGap, this.layout, this.mapPayGapToHeight.bind(this), 0);

		// Draw x and y axis.
		this.drawAxis(this.layout);

		// Draw x and y axis labels.
		this.drawAxisLabels(this.xAxisLabel, this.yAxisLabel, this.layout);

		// Plot all pay gaps between startYear and endYear using the width
		// of the canvas minus margins.
		let previous;
		let numYears = this.endYear - this.startYear;

		// Loop over all rows and draw a line from the previous value to
		// the current.
		for (let i = 0; i < this.data.getRowCount(); i++) {

			// Create an object to store data for the current year.
			let current = {
				// Convert strings to numbers.
				'year': this.data.getNum(i, 'year'),
				'payGap': this.data.getNum(i, 'pay_gap')
			};

			if (previous != null) {
				// Draw line segment connecting previous year to current
				// year pay gap.
				stroke(0);
				line(this.mapYearToWidth(previous.year), this.mapPayGapToHeight(previous.payGap), this.mapYearToWidth(current.year), this.mapPayGapToHeight(current.payGap));

				// The number of x-axis labels to skip so that only
				// numXTickLabels are drawn.
				let xLabelSkip = ceil(numYears / this.layout.numXTickLabels);

				// Draw the tick label marking the start of the previous year.
				if (i % xLabelSkip == 0) {
					this.drawXAxisTickLabel(previous.year, this.layout, this.mapYearToWidth.bind(this));
				}
			}

			// Assign current year to previous year so that it is available
			// during the next iteration of this loop to give us the start
			// position of the next line segment.
			previous = current;
		}
	}

	mapYearToWidth(value) {
		return map(value, this.startYear, this.endYear, this.layout.leftMargin,   // Draw left-to-right from margin.
			this.layout.rightMargin);
	}

	mapPayGapToHeight(value) {
		return map(value, this.minPayGap, this.maxPayGap, this.layout.bottomMargin, // Smaller pay gap at bottom.
			this.layout.topMargin);   // Bigger pay gap at top.
	}

	prepare() {
		this.layout = {
			marginSize: this.marginSize,

			// Locations of margin positions. Left and bottom have double margin
			// size due to axis and tick labels.
			leftMargin: this.marginSize * 2,
			rightMargin: width - this.marginSize,
			topMargin: this.marginSize,
			bottomMargin: height - this.marginSize * 2,
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
			numXTickLabels: 10,
			numYTickLabels: 8,
		}
	}

	prepareData() {
		// Set min and max years: assumes data is sorted by date.
		this.startYear = this.data.getNum(0, 'year');
		this.endYear = this.data.getNum(this.data.getRowCount() - 1, 'year');

		// Find min and max pay gap for mapping to canvas height.
		this.minPayGap = 0;         // Pay equality (zero pay gap).
		this.maxPayGap = max(this.data.getColumn('pay_gap'));
	}
}
