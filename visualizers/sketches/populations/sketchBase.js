class SketchBase {
    id; // Name for the visualisation to appear in the menu bar.
    name; // Each visualisation must have a unique ID with no special characters.
    data_path; // Each visualisation must have a unique ID with no special characters.
    data;
    width;
    height;
    constructor(sketch, data_path= null) {
        this.id = 'world-population'
        this.data_path = data_path || './../../../data/world-population/world-population.csv'
        this.name = 'World Population'
        this.sketch = sketch;

        this.preload();

        document.addEventListener('splitter::resize', () => {
            this.onResize();
        })
        this.setup();
        this.draw();

    }

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    async preload () {
        await loadTable(
            this.data_path, 'csv', 'header',
            // Callback function to set the value
            // this.loaded to true.
            (table) => {
                this.data = table;
                this.loaded = true;
            });
    };


    has(property, type = null) {
        return ['function'].includes(type || '') ?
            typeof this[property] === type :
            this.hasOwnProperty(property);
    }

    hasMethod(property) {

        return this.has(property, 'function');
    }

    onResize() {
        this.sketch.createCanvas(this.width, this.height);
    }
    /**
     *
     * @return this
     * @param sketch
     */
    static make(sketch) {

        throw new Error(`You have to implement the method make in order to use ${sketch}`);
    }


    /**
     *
     */
    getData() {

        return this.data;
    }

    /**
     *
     * @returns _main.default.Table|Table
     */
    getRows() {

        return this.getData().getRows();
    }
    getColumns() {

        return this.getData().getColumns();
    }

    isLoaded() {

        return this.loaded;
    }

    isReady() {

        return this.data && this.isLoaded()
    }

    getSketch() {
        return this.sketch;
    }

    drawAxisLabels(xLabel, yLabel, layout) {
        this.getSketch().fill(0);
        noStroke();
        textAlign('center', 'center');

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

    drawAxis (layout) {
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

    drawXAxisTickLabel(value, layout, mapFunction) {
        // Map function must be passed with .bind(this).
        var x = mapFunction(value);

        this.getSketch().fill(0);
        this.getSketch().noStroke();
        textAlign('center', 'center');

        // Add tick label.
        this.getSketch().text(value,
            x,
            layout.bottomMargin + layout.marginSize / 2);

        if (layout.grid) {
            // Add grid line.
            this.sketch.stroke(220);
            this.sketch.line(x,
                layout.topMargin,
                x,
                layout.bottomMargin);
        }
    }

    drawYAxisTickLabels(min, max, layout, mapFunction,
                        decimalPlaces) {
        // Map function must be passed with .bind(this).
        let range = max - min;
        let yTickStep = range / layout.numYTickLabels;

        this.getSketch().fill(0);
        noStroke();
        textAlign('right', 'center');

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
}
