class PopulationComparison extends SketchBase {

    constructor(sketch, data = []) {
        super(sketch, null, data);
        this.id = 'population-comparison';
        this.title = 'Google Income and Research Expenditure ($ million)'
        this.width = document.querySelector('#' + this.id).offsetWidth;
        this.height = document.querySelector('#' + this.id).offsetHeight;
        // Names for each axis.
        this.xAxis = 'year';
        this.yAxis = '';
        this.mainMarginSize = 35;
        // Locations of margin positions. Left and bottom have double margin
        // size due to axis and tick labels.
        this.leftMargin = 130,
            // Layout object to store all common  parameters and
            this.layout = {
                marginSize: this.mainMarginSize,
                // Locations of margin positions. Left and bottom have double margin
                // size due to axis and tick labels.
                leftMargin: this.mainMarginSize * 2,
                rightMargin: this.width - this.mainMarginSize,
                topMargin: this.mainMarginSize,
                bottomMargin: this.height - this.mainMarginSize * 2,
                pad: 5,
                plotWidth: function () {
                    return this.rightMargin - this.leftMargin;
                },
                plotHeight: function () {
                    return this.bottomMargin - this.topMargin;
                },
                // Number of axis tick labels to draw so that they are not drawn on
                // top of one another.
                numXTickLabels: 13,
                numYTickLabels: 10,
            };

        // Names for each axis.
        this.xAxisLabel = 'totals';
        this.yAxisLabel = 'years';

        // Width of vertical bar.
        this.barWidth = 3;
        // Colors for vertical bar
        this.colorList = ['red', 'orange', 'green', 'blue', 'gray'];
        // labels
        this.labelSpace = 45;
        // Layout object to store all common plot layout parameters and
        // methods.
        // this.layout = {
        //     marginSize: this.marginSize,
        //     // Locations of margin positions. Left and bottom have double margin
        //     // size due to axis and tick labels.
        //     leftMargin: this.marginSize * 5,
        //     rightMargin: this.width - this.marginSize / 2,
        //     topMargin: this.marginSize,
        //     bottomMargin: this.height - this.marginSize * 2,
        //     pad: 5,

        //     plotWidth: function () {
        //         return this.rightMargin - this.leftMargin;
        //     },

        //     plotHeight: function () {
        //         return this.bottomMargin - this.topMargin;
        //     },

        //     // Boolean to enable/disable background grid.
        //     grid: true,

        //     // Number of axis tick labels to draw so that they are not drawn on
        //     // top of one another.
        //     numXTickLabels: 13,
        //     numYTickLabels: 10,
        // };

        // Min and max visitors for mapping to canvas height.
        this.minVisitors = 0;
        this.maxVisitors = 0;
    }

    setup() {
        this.getSketch().setup = () => {
            this.onResize();
            // Font defaults.
            this.getSketch().textSize(16);
            this.getSketch().strokeWeight(1);
            // Set min and max years: assumes data is sorted by date.
            this.startYear = this.getYears().shift();
            this.endYear = this.getYears().pop() + 0.3;
            // console.log(this.startYear, this.endYear);
            // throw new Error('sd');
            // Find min and max value for mapping to canvas height.
            this.minAmount = 0; // Amount equality (zero).
            // get maximum number of data
            let inital = [];
            this.localLeftMargin;
            this.getYears().forEach(element => {
                let higestByYear = this.getRawData()
                    .filter((e) => e.year === Number(element))
                    .orderBy(['population'], ['desc'])
                    //.groupBy((e) => e.year)
                    // .map((e) => {

                    // })
                    .take(2)
                    .value();

                let dm = { year: element, name: higestByYear[0].population, population: higestByYear[1].population };
                /* Printing the first element of the array. */
                // console.log(higestByYear[0]);
                // throw new Error('dsfsdf');
                /*  */
                // dm[element] = higestByYear;
                inital.push(dm);
            });
            // _(inital).flatten().forEach((m, k) => {
            //     // console.log(m., k)
            // });
            // console.log(inital);
            // throw new Error('dsfsdf');
            this.getCurrentSelectedYearData = _.chain(inital);
            // let's get going and use histogram algrtom and calc the results...
            let maxValue = this.getCurrentSelectedYearData.maxBy((e) => Number(e.population)).value().population;
            let minValue = this.getCurrentSelectedYearData.minBy((e) => Number(e.population)).value().population;
            this.maxAmount = max(
                float(maxValue)
            ) + 13480;

            console.log(this.getCurrentSelectedYearData.value().length)
        }
    }

    draw() {
        this.getSketch().draw = () => {


            this.getSketch().fill(220, 220, 220)
            this.getSketch().noStroke();
            this.getSketch().rect(this.layout.leftMargin, this.layout.topMargin, this.layout.rightMargin - this.mainMarginSize * 2, this.layout.bottomMargin - this.mainMarginSize);
            // Draw the title above the plot.
            this.drawTitle();
            // Draw all y-axis labels.
            this.drawYAxisTickLabels(this.minAmount,
                this.maxAmount,
                this.layout,
                this.mapAmountToHeight.bind(this),
                0);
            // Draw x and y axis.
            this.drawAxis(this.layout);
            // Draw x and y axis labels.
            this.drawAxisLabels(this.xAxis,
                this.yAxis,
                this.layout);
            // Plot all pay gaps between startYear and endYear using the width of the canvas minus margins.
            var previous;
            var numYears = this.endYear - this.startYear;

            var barWidth = 20;
            // Loop over all rows and draw a line from the previous value to
            // the current.
            for (var i = 0; i < this.getCurrentSelectedYearData.value().length; i++) {
                // Create an object to store data for the current year.
                var current = {
                    // Convert strings to numbers.
                    'year': this.getCurrentSelectedYearData.value()[i].year,
                    'Income': this.getCurrentSelectedYearData.value()[i].population,
                    'Expenditure': this.getCurrentSelectedYearData.value()[i].name,
                };

                if (previous != null) {
                    // console.log(current, previous);
                    // Draw rectangles (bars) to represent each data set
                    this.getSketch().stroke(0);
                    //Income amount
                    this.getSketch().fill(174, 207, 183);
                    this.getSketch().rect(this.mapYearToWidth(current.year) - barWidth,
                        this.mapAmountToHeight(current.Income),
                        barWidth,
                        this.layout.bottomMargin - this.mapAmountToHeight(current.Income)
                    );

                    //Expenditure amount
                    this.getSketch().fill(255, 105, 97);
                    this.getSketch().rect(this.mapYearToWidth(current.year),
                        this.mapAmountToHeight(current.Expenditure),
                        barWidth,
                        this.layout.bottomMargin - this.mapAmountToHeight(current.Expenditure)
                    );

                    // The number of x-axis labels to skip so that only
                    // numXTickLabels are drawn.
                    var xLabelSkip = ceil(numYears / this.layout.numXTickLabels);
                    // Draw the tick label marking the start of the previous year.
                    // if (i % xLabelSkip == 0) {
                    this.drawXAxisTickLabel(previous.year, this.layout,
                        this.mapYearToWidth.bind(this));
                    // }
                    // console.log(numYears, this.layout.numXTickLabels, this.endYear, this.startYear)
                    // throw new Error('sadd')
                    // Income data displaying
                    // new variables to use for displaying a data values
                    var Income_width = this.mapYearToWidth(current.year) - barWidth;
                    // display data values by creating a information box object
                    if (mouseX < this.mapYearToWidth(current.year) && mouseX > Income_width && mouseY < this.layout.bottomMargin && mouseY > this.mapAmountToHeight(current.Income)) {
                        this.informationBox = new InformationBox(this.localLeftMargin = this.layout.leftMargin,
                            this.localTopMargin = this.layout.topMargin, this.Expenditure = current.Expenditure, Income = current.Income, year = current.year)
                        this.informationBox.draw()
                    };
                    //Expenditure data displaying
                    // new variables to use for displaying a data values
                    var Expenditure_width = this.mapYearToWidth(current.year) + barWidth;
                    //  display data values by creating a information box object
                    if (mouseX > this.mapYearToWidth(current.year) && mouseX < Expenditure_width && mouseY < this.layout.bottomMargin && mouseY > this.mapAmountToHeight(current.Expenditure)) {
                        this.informationBox = new InformationBox(this.localLeftMargin = this.layout.leftMargin,
                            this.localTopMargin = this.layout.topMargin, this.Expenditure = current.Expenditure, Income = current.Income, year = current.year)
                        this.informationBox.draw()
                    }
                }
                previous = current;
            }
            // Label that describe what each bar represent
            this.getSketch().fill(255, 105, 97);
            this.getSketch().rect(375, 50, 10, 10);
            this.getSketch().fill('black');
            this.getSketch().text('Expenditure', 445, 55);
            this.getSketch().fill(174, 207, 183);
            this.getSketch().rect(375, 70, 10, 10);
            this.getSketch().fill('black');
            this.getSketch().text('Income', 445, 75)

        }
    };

    // Smaller number at bottom, bigger number at top.
    mapVisitorsToHeight(value) {

        return this.getSketch().map(value,
            this.minVisitors,
            this.maxVisitors,
            this.layout.bottomMargin,
            this.layout.topMargin);
    };

    drawVerticalBar(color, x, visitors) {
        this.getSketch().fill(color || 'gray');
        this.getSketch().noStroke();
        this.getSketch().rect(x,
            this.mapVisitorsToHeight(visitors),
            this.barWidth,
            this.layout.plotHeight() + this.layout.topMargin - this.mapVisitorsToHeight(visitors));
    }

    mapMonthToWidth(value) {
        return this.getSketch().map(value,
            this.getYears()[0],
            new Date().getFullYear(),
            this.layout.leftMargin,
            this.layout.rightMargin);
    }

    drawTitle() {
        this.getSketch().fill(0);
        this.getSketch().noStroke();
        this.getSketch().textAlign('center', 'center');
        this.getSketch().text(this.title,
            (this.layout.plotWidth() / 2) + this.layout.leftMargin,
            this.layout.topMargin - (this.layout.marginSize / 2));
    }

    mapYearToWidth(value) {
        return map(value,
            this.startYear,
            this.endYear,
            this.layout.leftMargin, // Draw left-to-right from margin.
            this.layout.rightMargin);
    }
    mapAmountToHeight(value) {
        // console.log(value)
        return map(value,
            this.minAmount,
            this.maxAmount,
            this.layout.bottomMargin, // Small value at bottom.
            this.layout.topMargin); // Big value at top.
    };

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
