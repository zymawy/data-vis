class PopulationComparison extends BaseVisualizer {
	constructor() {
		super('population-comparison', 'Population Comparison', './../data/world-population/world-population.csv');
        this.id = 'population-comparison';
        this.title = 'Google Income and Research Expenditure ($ million)'
        // Names for each axis.
        this.xAxis = 'year';
        this.yAxis = '';
        this.mainMarginSize = 35;
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
		// labels
		this.labelSpace = 45;

        // Width of vertical bar.
        this.barWidth = 3;
        // Colors for vertical bar
        this.colorList = ['red', 'orange', 'green', 'blue', 'gray', 'black', 'yellow', 'purple', 'purple', 'purple', 'gray',, 'gray', 'gray',];
        // labels
        this.labelSpace = 45;

        // Min and max visitors for mapping to canvas height.
        this.minPopulation = 0;
        this.maxPopulation = 0;
		// for better visualization a make sure to give 10 ages between years.
		this.years = ['1970', '1980', '1990', '2000', '2010', '2020', '2030'];
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

		// Font defaults.
		textSize(16);


		// Min and max visitors for mapping to canvas height.
		this.minPopulation = this.getMinValue();
		this.maxPopulation = this.getMaxValue();
		// Width of vertical bar.
		this.barWidth = 10;

            // this.onResize();
            // // Font defaults.
            // textSize(16);
            // strokeWeight(1);
            // // Set min and max years: assumes data is sorted by date.
            // this.startYear = this.getYears().shift();
            // this.endYear = this.getYears().pop() + 0.3;
            // // console.log(this.startYear, this.endYear);
            // // throw new Error('sd');
            // // Find min and max value for mapping to canvas height.
            // this.minAmount = 0; // Amount equality (zero).
            // // get maximum number of data
            // let inital = [];
            // this.localLeftMargin;
            // this.getYears().forEach(element => {
            //     let higestByYear = this.getRawData()
            //         .filter((e) => e.year === Number(element))
            //         .orderBy(['population'], ['desc'])
            //         //.groupBy((e) => e.year)
            //         // .map((e) => {
			//
            //         // })
            //         .take(2)
            //         .value();
			//
            //     let dm = { year: element, name: higestByYear[0].population, population: higestByYear[1].population };
            //     /* Printing the first element of the array. */
            //     // console.log(higestByYear[0]);
            //     // throw new Error('dsfsdf');
            //     /*  */
            //     // dm[element] = higestByYear;
            //     inital.push(dm);
            // });
            // // _(inital).flatten().forEach((m, k) => {
            // //     // console.log(m., k)
            // // });
            // // console.log(inital);
            // // throw new Error('dsfsdf');
            // this.getCurrentSelectedYearData = _.chain(inital);
            // // let's get going and use histogram algrtom and calc the results...
            // let maxValue = this.getCurrentSelectedYearData.maxBy((e) => Number(e.population)).value().population;
            // let minValue = this.getCurrentSelectedYearData.minBy((e) => Number(e.population)).value().population;
            // this.maxAmount = max(
            //     float(maxValue)
            // ) + 13480;
			//
            // console.log(this.getCurrentSelectedYearData.value().length)
        }

    draw() {

		this.drawTitle();

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

		for (var y = 0; y< this.getYears().length; y++) {

			let currentYears =  this.getRawData()
				.filter((e) => e.get('year') == this.getYears()[y])
				.take(5)
				.orderBy(function (e) {
					return e.get('population')
				}, ['desc']);

			let maxP = currentYears.maxBy((e) => Number(e.get('population'))).value();
			let minP = currentYears.minBy((e) => Number(e.get('population'))).value();
			currentYears = currentYears.value();

			for (var i = 0; i< currentYears.length; i++) {

				var height = map(currentYears[i].population(),
					minP.population(),
					maxP.population(),
					this.layout.leftMargin,
					this.layout.bottomMargin);

				let visitors = map((this.mapYearToY(this.getYears()[y]))+(i * 12),
					minP.population(),
					maxP.population(),
					this.layout.topMargin,
					this.layout.bottomMargin,
					);
				// console.log(this.colorList[y])
				// this.dd(visitors);
				this.drawVerticalBar(this.colorList[i], (this.mapYearToY(this.getYears()[y]))+(i * 12), visitors);

			}
		}

		// Make legend item
		for (var i = 0; i < 5; i++) {
			// this.makeLegendItem(data[i].icon(), data[i].name(), i);
		}
    }


	mapMonthToWidth (value) {

		return map(value,
			0,
			13,
			this.layout.leftMargin,
			this.layout.rightMargin);
	}

	mapYearToY (value) {

		return map(value,
			this.getStartYear(),
			this.getEndYear(),
			this.layout.leftMargin,
			this.layout.rightMargin);
	}

	// Smaller number at bottom, bigger number at top.
	mapVisitorsToHeight (value) {
		return map(value,
			this.getMinValue(),
			this.getMaxValue(),
			this.layout.bottomMargin,
			this.layout.topMargin);
	}

	drawTitle () {
		fill(0);
		noStroke();
		textAlign('center', 'center');
		// Start a new drawing state
		push();
		textSize(16);
		text(this.title,
			(this.layout.plotWidth() / 2) + this.layout.leftMargin,
			this.layout.topMargin - (this.layout.marginSize / 2));
		// Restore previous state
		pop();
	};

	drawVerticalBar (color, x, visitors) {
		fill(color);
		noStroke();

		rect(x,
			visitors,
			this.barWidth,
			this.layout.plotHeight() + this.layout.topMargin - visitors);
	}

	makeLegendItem (label, colour, n) {
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
		this.convas = createCanvas(1200, 800);
		this.convas.id(`id-${this.id}`);
		this.convas.parent(holder)
	}


    /**
     *
     * @return this
     * @param sketch
     */
    static make(data) {
        return (sketch) => {
            return new PopulationComparison(sketch, data)
        }
    }
}
