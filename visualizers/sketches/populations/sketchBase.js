class SketchBase {
    id; // Name for the visualisation to appear in the menu bar.
    name; // Each visualisation must have a unique ID with no special characters.
    data_path; // Each visualisation must have a unique ID with no special characters.
    data;
    width;
    height;
    sketch;
    static CSS_COLORS = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'];
    constructor(sketch, data_path = null, data = []) {
        this.id = 'world-population'
        /* Logging the sketch object to the console. */
        this.data_path = data_path || './../../../data/world-population/world-population.csv'
        this.name = 'World Population'
        this.sketch = sketch;
        this.selectedYear = '1970'
        this.years = ['1970', '1980', '1990', '2000', '2010', '2015', '2020', '2022', '2030', '2050'];
        this.data = data;


        // this.preload();

        // document.addEventListener('splitter::resize', () => {
        //     this.onResize();
        // })

        document.addEventListener('select::value', ({ detail }) => {
            this.selectedYear = detail.value();
        });

        document.addEventListener('select::option-value', ({ detail }) => {
            this.selectedOption = detail.value();
        });


        document.addEventListener('select::order-value', ({ detail }) => {
            this.selectedOrder = detail.value();
        });

        // this.setup();
        // this.draw();

    }


    /* Loading the data from the data_path and setting the data property of the object to the data that is loaded. */
    preload() {

    };

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
    * "When the window is resized, create a new canvas with the new width and height."
    *
    * The `createCanvas()` function is a built-in function in p5.js. It creates a new canvas with the specified width and
    * height
    */
    onResize() {
        this.convas = this.sketch.createCanvas(this.width, this.height);
        this.convas.id(`id-${this.id}`);
		this.convas.parent(holder);
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
        this.getSketch().fill(0);
        this.getSketch().noStroke();
        this.getSketch().textAlign('center', 'center');

        // Draw x-axis label.
        this.getSketch().text(xLabel,
            (layout.plotWidth() / 2) + layout.leftMargin,
            layout.bottomMargin + (layout.marginSize * 1.5));

        // Draw y-axis label.
        this.getSketch().push();
        this.getSketch().translate(layout.leftMargin - (layout.marginSize * 4),
            layout.bottomMargin / 2);
        this.getSketch().rotate(-PI / 2);
        this.getSketch().text(yLabel, 0, 0);
        this.getSketch().pop();
    }

    /**
     * Draw a line from the left margin to the right margin, and then draw a line from the top margin to the bottom margin
     * @param layout - an object that contains the following properties:
     */
    drawAxis(layout) {
        this.sketch.stroke(color(0));

        // x-axis
        this.sketch.line(layout.leftMargin,
            layout.bottomMargin,
            layout.rightMargin,
            layout.bottomMargin);

        // y-axis
        this.sketch.line(layout.leftMargin,
            layout.topMargin,
            layout.leftMargin,
            layout.bottomMargin);
    }

    /**
     * It draws a tick label on the x-axis
     * @param value - The value of the tick label.
     * @param layout - The layout object that contains the layout information.
     * @param mapFunction - A function that maps a value to a position on the x-axis.
     */
    // drawXAxisTickLabel(value, layout, mapFunction) {
    //     // Map function must be passed with .bind(this).
    //     var x = mapFunction(value);
	//
    //     this.getSketch().fill(0);
    //     this.getSketch().noStroke();
    //     textAlign('center', 'center');
    //     // console.log(value, x)
    //     // Add tick label.
    //     this.getSketch().text(value,
    //         x,
    //         layout.bottomMargin + layout.marginSize / 2);
	//
    //     if (layout.grid) {
    //         // Add grid line.
    //         this.sketch.stroke(220);
    //         this.sketch.line(x,
    //             layout.topMargin,
    //             x,
    //             layout.bottomMargin);
    //     }
    // }

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

        return this.selectedOption || 11;
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
