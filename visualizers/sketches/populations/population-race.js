class PopulationRace extends BaseVisualizer {
	constructor() {
		super('population-race', 'Population Rece', './../data/world-population/world-population.csv');
		// Graph properties.
		this.pad = 20;
		this.dotSizeMin = 15;
		this.dotSizeMax = 40;
		this.divWidth = 599;
		this.divHeight = 199;
		// Names for each axis.
		this.xAxisLabel = 'year';
		this.yAxisLabel = '℃';
		this.marginSize = 35;
		// target values
		this.values = [];
		// index which will increase at regular intervals
		this.index = 0;
		this.t = 0;

		this.boxes = [];
		this.years = ['1970', '1980', '1990', '2000', '2010', '2015', '2020', '2022', '2030', '2050'];

		this.sketches = [];
		this.options = [3, 5, 7, 9, 11, 14];

	}

	destroy() {
		// this.mySelect.remove();
		// this.optionSelect.remove();
		//
		// // let's remove our instance mode sketches!
		// this.sketches.forEach((p) => p.remove());
		// document.getElementById('world-grid').remove();
		//document.getElementById('tool-wrapper').remove();
		// toolHolder.remove()
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
			return {
				name: e.getString('name'),
				growthRate: e.getNum('growthRate'),
				worldPercentage: e.getNum('worldPercentage'),
				// density: e.getString('density'),
				rank: e.getNum('rank'),
				population: e.getNum('puplistion'),
				year: e.getNum('year'),
				icon: e.getString('icon')
			}
		});

		// this.preload();

		document.addEventListener('splitter::resize', () => {
			this.divWidth = document.querySelector('#' + this.id).offsetWidth;
			this.divHeight = document.querySelector('#' + this.id).offsetHeight;
		})



		document.addEventListener('select::value', ({ detail }) => {
			this.selectedYear = detail.value();
		});

		document.addEventListener('select::option-value', ({ detail }) => {
			this.selectedOption = detail.value();
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

			// Number of axis tick labels to draw so that they are not drawn on
			// top of one another.
			numXTickLabels: 13,
			numYTickLabels: 10,
		};

		// Min and max visitors for mapping to canvas height.
		this.minVisitors = 0;
		this.maxVisitors = 0;


	}

    draw() {

		let year = this.getSelectedYear();
		let dateYear = this.getDataByColumn(year);
		this.minVisitors = dateYear.min();
		this.maxVisitors = dateYear.max();


		let getCurrentSelectedYearData = this.getRawData()
			.filter((e) => e.year == this.getSelectedYear())
			.take(this.getSelectedOption())
			.orderBy(['population'], [this.getSelectedOrder()]);

		// let's get going and use histogram algrtom and calc the results...
		this.maxPopulation = getCurrentSelectedYearData.maxBy((e) => Number(e.population)).value().population;
		this.minPopulation = getCurrentSelectedYearData.minBy((e) => Number(e.population)).value().population;
		let dominator = (this.maxPopulation - this.minPopulation);
		let data = getCurrentSelectedYearData.filter((e) => e.population >= this.minPopulation).value();
		// // Draw all y-axis tick labels.
		this.drawYAxisTickLabels(this.minPopulation,
			this.maxPopulation,
			this.layout,
			this.mapTemperatureToHeight.bind(this),
			1);

		// // Draw x and y axis. -- values
		this.drawAxis(this.layout);
		// Draw x and y axis labels. -- labels
		this.drawAxisLabels(this.xAxisLabel,
			this.yAxisLabel,
			this.layout);
		// Find mean temperature to plot average marker.
		this.meanPopulation = this.mean(this.data.getColumn('population'));
		//
		//     // Count the number of frames drawn since the visualisation
		//     // started so that we can animate the plot.
		//     this.frameCount = 0;
		// // Plot average line.
		stroke(200);
		strokeWeight(1);
		line(this.layout.leftMargin,
			this.mapTemperatureToHeight(this.meanPopulation),
			this.layout.rightMargin,
			this.mapTemperatureToHeight(this.meanPopulation));

		// console.log(maxValue, minValue, this.getCurrentSelectedYearData());
		// throw new Error('Debug');

		// getCurrentSelectedYearData.value().forEach((v, i) => {

		for (let i = 0; i < data.length; i++) {

			// Create an object to store data for the current year.
			let current = {
				// Convert strings to numbers.
				'year': data[i].year,
				'temperature': data[i].population
			};

			let result = (data[i].population - this.minPopulation) / dominator;
			let movement = i * 45;

			result = result * this.layout.bottomMargin - 10; // sup 10 to give a space for icons :)

			let v40 = 40;
			rect(movement + this.layout.leftMargin,
				height - this.layout.topMargin - 17,
				v40,
				-(result > this.minPopulation ? height - this.layout.topMargin - 17: result));
			fill(0, 200, 220);
			push();
			translate(movement + this.layout.leftMargin + 25 , height - this.layout.topMargin - result);
			rotate(radians(-25));
			fill(0, 200, 220);
			text(data[i].icon, 0, 0);
			pop();

			push();
			translate(movement + this.layout.leftMargin ,
				height - this.layout.topMargin  - result);
			rotate(radians(-90));
			fill('black');
			text(data[i].name, 0, 0);
			pop();
		}
	}


	// Smaller number at bottom, bigger number at top.
	mapVisitorsToHeight(value) {

		return map(value,
			this.minVisitors,
			this.maxVisitors,
			this.layout.bottomMargin,
			this.layout.topMargin);
	};

	drawVerticalBar(color, x, visitors) {
		fill(color || 'gray');
		noStroke();
		rect(x,
			this.mapVisitorsToHeight(visitors),
			this.barWidth,
			this.layout.plotHeight() + this.layout.topMargin - this.mapVisitorsToHeight(visitors));
	}

	mapMonthToWidth (value) {
		return map(value,
			this.getYears()[0],
			new Date().getFullYear(),
			this.layout.leftMargin,
			this.layout.rightMargin);
	}


	mapYearToWidth(value) {
		return map(value,
			this.minYear,
			this.maxYear,
			this.layout.leftMargin,   // Draw left-to-right from margin.
			this.layout.rightMargin);
	};

	mapTemperatureToHeight(value) {

		return map(value,
			this.minPopulation,
			this.maxPopulation,
			this.layout.bottomMargin, // Lower temperature at bottom.
			this.layout.topMargin);   // Higher temperature at top.
	};
	mapTemperatureToColour(value) {
		let red = map(value,
			this.minPopulation,
			this.maxPopulation,
			0,
			255);
		let blue = 255 - red;
		return color(red, 0, blue, 100);
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

	setupSelect() {
		P5Element.make('label', 'Years: ')
			.attribute('for', this.id)
			.parent(toolHolder);

		selectYears = this.mySelect = P5Element.createSelect()
			.id(this.id)
			.addClass(this.id)
			.addClass('input');
		this.mySelect.parent(toolHolder)

		this.mySelect.changed(this.changed)

		// Fill the options with years.
		for (let i = 0; i < this.years.length; i++) {
			this.mySelect.option(this.years[i]);
		}
	}

	setupSelectOption() {

		P5Element.make('label', 'Options: ')
			.attribute('for', `option-${this.id}`)
			.parent(toolHolder);

		this.optionSelect = P5Element.createSelect()
			.id(`option-${this.id}`)
			.addClass(`option-${this.id}`)
			.addClass('input');

		this.optionSelect.parent(toolHolder)

		this.optionSelect.changed(this.optionChanged)

		// Fill the options with years.
		for (let i = 0; i < this.options.length; i++) {
			this.optionSelect.option(this.options[i]);
		}

		this.optionSelect.selected('11');
	}

	setupSelectOrder() {

		P5Element.make('label', 'Order: ')
			.attribute('for', `order-${this.id}`)
			.parent(toolHolder);

		this.orderSelect = P5Element.createSelect()
			.id(`order-${this.id}`)
			.addClass(`order-${this.id}`)
			.addClass('input');

		this.orderSelect.parent(toolHolder)

		this.orderSelect.changed(this.orderChanged)

		// Fill the options with years.
		let orders = ['asc', 'desc'];
		for (let i = 0; i < orders.length; i++) {
			this.orderSelect.option(orders[i]);
		}

		this.orderSelect.selected('desc');
	}

	changed(e) {

		const eventSelectYear = new CustomEvent('select::value', {
			bubbles: true,
			detail: { value: () => e.target.value }
		});
		// let's dispatch it !
		document.dispatchEvent(eventSelectYear)
	}

	optionChanged(e) {

		const eventSelectOption = new CustomEvent('select::option-value', {
			bubbles: true,
			detail: { value: () => e.target.value }
		});
		// let's dispatch it !
		document.dispatchEvent(eventSelectOption)
	}

	orderChanged(e) {

		const eventSelectOption = new CustomEvent('select::order-value', {
			bubbles: true,
			detail: { value: () => e.target.value }
		});
		// let's dispatch it !
		document.dispatchEvent(eventSelectOption)
	}

//	MOVE IT


	/**
	 * It checks if the object has a property.
	 * @param property - The property to check for.
	 * @param [type=null] - The type of the property.
	 * @returns a boolean value.
	 */
	has(property, type = null) {
		return ['function'].includes(type || '') ?
			typeof this[property] === type :
			this.hasOwnProperty(property);
	}

	/**
	 * Returns true if the object has a method with the given name.
	 * @param property - The name of the property to check for.
	 * @returns A boolean value.
	 */
	hasMethod(property) {

		return this.has(property, 'function');
	}

	/**
	 * `make` is a function that takes a sketch as an argument and returns a function that takes a p5 object as an argument
	 * @param sketch - The name of the sketch you want to use.
	 */
	static make(sketch) {

		throw new Error(`You have to implement the method make in order to use ${sketch}`);
	}

	/**
	 * It returns the data
	 * @returns The data property of the object.
	 */
	getData() {

		return this.data;
	}

	/**
	 * It returns the years property of the object returned by the getData() function
	 * @returns The years property of the data object.
	 */
	getYears() {
		return this.years;
	}

	/**
	 *
	 * @returns _main.default.Table|Table
	 */
	getRows() {

		return this.getData().getRows();
	}
	/**
	 * This function returns the columns of the data
	 * @returns The columns of the data.
	 */
	getColumns() {

		return this.getData().getColumns();
	}

	/**
	 * It returns the data in the column specified by the parameter
	 * @param column - The column name to get the data from.
	 * @returns The column of data from the data object.
	 */
	getDataByColumn(column) {

		return this.getData().getColumn(column);
	}

	/**
	 * The function isLoaded() returns the value of the variable loaded
	 * @returns The loaded variable is being returned.
	 */
	isLoaded() {

		return this.loaded;
	}

	/**
	 * The function isReady() returns true if the data is loaded and the selectYears variable is defined
	 */
	isReady() {

		return this.data
	}

	/**
	 * `getSketch()` returns the `sketch` variable
	 * @returns The sketch is being returned.
	 */
	getSketch() {
		return this.sketch;
	}

	/**
	 * It draws the x- and y-axis labels
	 * @param xLabel - The label for the x-axis.
	 * @param yLabel - The label for the y-axis.
	 * @param layout - The layout object that contains the dimensions of the plot.
	 */
	drawAxisLabels(xLabel, yLabel, layout) {
		fill(0);
		noStroke();
		textAlign('center', 'center');

		// Draw x-axis label.
		text(xLabel,
			(layout.plotWidth() / 2) + layout.leftMargin,
			layout.bottomMargin + (layout.marginSize));

		// Draw y-axis label.
		push();
		translate(layout.leftMargin - (layout.marginSize * 4),
			layout.bottomMargin / 2);
		rotate(-PI / 2);
		text(yLabel, 0, 0);
		pop();
	}

	/**
	 * Draw a line from the left margin to the right margin, and then draw a line from the top margin to the bottom margin
	 * @param layout - an object that contains the following properties:
	 */
	drawAxis(layout) {
		// stroke(color(0));

		// x-axis
		// line(layout.leftMargin,
		// 	layout.bottomMargin,
		// 	layout.rightMargin,
		// 	layout.bottomMargin);

		// y-axis
		// line(layout.leftMargin,
		// 	layout.topMargin,
		// 	layout.leftMargin,
		// 	layout.bottomMargin);
	}

	/**
	 * It draws a tick label on the x-axis
	 * @param value - The value of the tick label.
	 * @param layout - The layout object that contains the layout information.
	 * @param mapFunction - A function that maps a value to a position on the x-axis.
	 */
	drawXAxisTickLabel(value, layout, mapFunction) {
		// Map function must be passed with .bind(this).
		var x = mapFunction(value);

		this.getSketch().fill(0);
		this.getSketch().noStroke();
		textAlign('center', 'center');
		// console.log(value, x)
		// Add tick label.
		this.getSketch().text(value,
			x,
			layout.bottomMargin + layout.marginSize / 2);

		if (layout.grid) {
			// Add grid line.
			stroke(220);
			line(x,
				layout.topMargin,
				x,
				layout.bottomMargin);
		}
	}

	/**
	 * Draws the y-axis tick labels and grid lines
	 * @param min - The minimum value of the data.
	 * @param max - The maximum value of the data.
	 * @param layout - The layout object that contains the layout information for the graph.
	 * @param mapFunction - A function that maps a value to a y-coordinate.
	 * @param decimalPlaces - The number of decimal places to show on the tick labels.
	 */
	drawYAxisTickLabels(min, max, layout, mapFunction,
						decimalPlaces) {
		// Map function must be passed with .bind(this).
		let range = max - min;
		let yTickStep = range / layout.numYTickLabels;

		this.getSketch().fill(0);
		this.getSketch().noStroke();
		this.getSketch().textAlign('right', 'center');

		// Draw all axis tick labels and grid lines.
		for (let i = 0; i <= layout.numYTickLabels; i++) {
			var value = min + (i * yTickStep);
			var y = mapFunction(value);

			// Add tick label.
			this.getSketch().text(value.toFixed(decimalPlaces),
				layout.leftMargin - layout.pad - 20,
				y);

			if (layout.grid) {
				// Add grid line.
				stroke(200);
				this.getSketch().line(layout.leftMargin, y, layout.rightMargin, y);
			}
		}

	}

	/**
	 * It returns the value of the selectedYear property, or the string '1980' if the selectedYear property is undefined
	 * @returns The selectedYear property of the object, or 1980 if it is not defined.
	 */
	getSelectedYear() {

		return this.selectedYear || '1980';
	}

	getSelectedOption() {

		return this.selectedOption || 21;
	}

	getSelectedOrder() {

		return this.selectedOrder || 'asc';
	}


	/**
	 * It returns a chain of the raw data
	 * @returns A chain of the rawData array.
	 */
	getRawData() {
		if (this.returnedRawData) {
			return this.returnedRawData;
		}
		return this.returnedRawData = _.chain(this.rawData);
	}


	/**
	 * It returns a chain of the raw data
	 * @returns A chain of the rawData array.
	 */
	getCurrentSelectedYearData() {
		return this.getRawData()
			.filter((e) => e.year == this.getSelectedYear())
			.take(this.getSelectedOption())
			.orderBy(['population'], [this.getSelectedOrder()]);
	}

	// let's get going and use histogram algrtom and calc the results...
	getMaxValue() {
		return this.getCurrentSelectedYearData().maxBy((e) => Number(e.population)).value().population;
	}
	getMinValue() {
		return this.getCurrentSelectedYearData().minBy((e) => Number(e.population)).value().population;
	}
}
