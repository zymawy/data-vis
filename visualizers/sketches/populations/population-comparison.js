const PopulationComparison = (sketch) =>  {
    this.sketch = sketch;
    // constructor(sketch) {
    //     super(sketch, './../../../data/museum-visitors/museum-visitors.csv');
    this.id = 'population-comparison';
    this.width = document.querySelector('#' + this.id).offsetWidth;
    this.height = document.querySelector('#' + this.id).offsetHeight;

    //     // Names for each axis.
    this.xAxisLabel = 'month';
    this.yAxisLabel = 'visitors';
    //
    //     // Make x axis start with 0.
    this.startMonth = 0;
    this.endMonth = 13;

    this.marginSize = 15;
    //
    //     // Width of vertical bar.
    this.barWidth = 3;
    this.mySelect = null;
    //
    //     // Colors for vertical bar
    this.colorList = ['red', 'orange','green','blue', 'gray'];
    //     // List of museum names
    this.museumNameList = ['Tropical Interpretive Center', 'Avila Adobe', 'Chinese American Museum', 'Firehouse Museum', 'Pico House'];
    //
    //     // labels
    this.labelSpace = 45;
    //
    //     // Layout object to store all common plot layout parameters and
    //     // methods.
    this.layout = {
        marginSize: this.marginSize,
        // Locations of margin positions. Left and bottom have double margin
        // size due to axis and tick labels.
        leftMargin: this.marginSize * 5,
        rightMargin: this.width - this.marginSize/2,
        topMargin: this.marginSize,
        bottomMargin: this.height - this.marginSize*2,
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
    this.maxVisitors = 42000;
    // }

    this.sketch.setup = () => {
        this.onResize();
        // Create a mySelect DOM element.
        this.mySelect = createSelect();
        this.mySelect.position(410, 20);
        // Fill the options with years.
        var years = ["2014", "2015", "2016", "2017", "2018", "2019"];
        for (let i = 0; i < years.length; i++) {
            this.mySelect.option(years[i]);
        }
    }

    this.sketch.draw = () => {
        if (! this.isReady()) {
            return;
        }

        this.drawTitle();

        // Draw x and y axis.
        // console.log(this.layout)
        this.drawAxis(this.layout);

        // Draw x and y axis labels.
        this.drawAxisLabels(this.xAxisLabel,
            this.yAxisLabel,
            this.layout);

        // Draw all x-axis labels.
        for (var i = 1; i < 13; i++) {
            this.drawXAxisTickLabel(this.startMonth + i,
                this.layout,
                this.mapMonthToWidth.bind(this));
        }

        // Draw all y-axis labels.
        this.drawYAxisTickLabels(this.minVisitors,
            this.maxVisitors,
            this.layout,
            this.mapVisitorsToHeight.bind(this),
            0);


        // get mySelected value
        var year_mySelected = this.mySelect.value();

        // Draw bars and group data in the same month.
        // loop through all data in one year (2014 by default).
        for (var i = 0; i < this.getData().getRowCount(); i++) {
            // if the year equals mySelected year,
            // get visitors for each museum in that row
            if (this.getData().getRow(i).arr[0] === year_mySelected) {
                // Loop through all museums.
                // j starts at 2 because visitors data starts from the third column
                for (var j = 2; j < this.getData().getRow(i).arr.length; j++) {
                    var visitors = this.getData().getRow(i).arr[j];
                    // calculate x posiiton for current bar to draw
                    // use i mod 12 to map to the right place if i >= 12
                    var x_position = this.mapMonthToWidth(i%12 + 1) + this.barWidth * (j - 2);
                    // draw the bar onto canvas
                    this.drawVerticalBar(this.colorList[j - 2], x_position, visitors);
                }
            }
        }

        // Make legend item
        for (var i = 0; i < this.museumNameList.length; i++) {
            this.makeLegendItem(this.museumNameList[i], this.colorList[i], i);
        }

        // throw new Error(`You have to implement the method make in order to use`);
    };


    this.mapMonthToWidth = (value) => {
        return this.getSketch().map(value,
            this.startMonth,
            this.endMonth,
            this.layout.leftMargin,
            this.layout.rightMargin);
    }

    // Smaller number at bottom, bigger number at top.
    this.mapVisitorsToHeight = (value) => {
        return this.getSketch().map(value,
            this.minVisitors,
            this.maxVisitors,
            this.layout.bottomMargin,
            this.layout.topMargin);
    };

    this.drawTitle = function() {
        this.getSketch().fill(0);
        noStroke();
        textAlign('center', 'center');
        // Start a new drawing state
        this.getSketch().push();
        this.getSketch().text('Monthly visitors for major museums in Los Angeles, USA.',
            (this.layout.plotWidth() / 2),
            this.layout.topMargin - (this.layout.marginSize / 2));
        // Restore previous state
        this.getSketch().pop();
    };

    this.drawVerticalBar = function(color, x, visitors) {
        this.getSketch().fill(color);
        noStroke();
        this.getSketch().rect(x,
            this.mapVisitorsToHeight(visitors),
            this.barWidth,
            this.layout.plotHeight() + this.layout.topMargin - this.mapVisitorsToHeight(visitors));
    }

    this.makeLegendItem = function(label, colour, n) {
        var boxWidth = this.labelSpace;
        var boxHeight = this.labelSpace;
        // Adjust the space between specific legend items
        if (label == "Avila Adobe" || label == "Firehouse Museum") {
            var x = this.layout.leftMargin + n ;
        } else {
            var x = this.layout.leftMargin + n;
        }

        var y = this.layout.bottomMargin + boxHeight * 3;

        this.getSketch().fill(colour);
        this.getSketch().rect(x, y, boxWidth, boxHeight);

        this.getSketch().fill('black');
        noStroke();
        textAlign('left', 'center');
        textSize(12);
        this.getSketch().text(label, x + boxWidth + 5, y + boxWidth / 2);
    };
    this.getSketch = () => {
        return this.sketch;
    }
    this.sketch.preload  = () => {
        loadTable(
            './../../../data/museum-visitors/museum-visitors.csv', 'csv', 'header',
            // Callback function to set the value
            // this.loaded to true.
            (table) => {
                this.data = table;
                this.loaded = true;
            });
    };

    this.drawAxisLabels = function (xLabel, yLabel, layout) {
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

    this.drawAxis = function (layout) {
        stroke(color(0));

        // x-axis
        this.getSketch().line(layout.leftMargin,
            layout.bottomMargin,
            layout.rightMargin,
            layout.bottomMargin);

        // y-axis
        this.getSketch().line(layout.leftMargin,
            layout.topMargin,
            layout.leftMargin,
            layout.bottomMargin);
    }

    this.drawXAxisTickLabel= function (value, layout, mapFunction) {
        // Map function must be passed with .bind(this).
        var x = mapFunction(value);

        this.getSketch().fill(0);
        noStroke();
        textAlign('center', 'center');

        // Add tick label.
        this.getSketch().text(value,
            x,
            layout.bottomMargin + layout.marginSize / 2);

        if (layout.grid) {
            // Add grid line.
            this.getSketch().stroke(220);
            this.getSketch().line(x,
                layout.topMargin,
                x,
                layout.bottomMargin);
        }
    }

    this.drawYAxisTickLabels = function (min, max, layout, mapFunction,
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

    /**
     *
     * @returns _main.default.Table|Table
     */
    this.getRows = () => {

        return this.getData().getRows();
    }
    this.getColumns = () => {

        return this.getData().getColumns();
    }

    this.isLoaded  = () => {

        return this.loaded;
    }

    this.isReady = () => {

        return this.data && this.isLoaded()
    }

    /**
     *
     */
    this.getData = () => {

        return this.data;
    }

    this.onResize  = () => {
        this.sketch.createCanvas(this.width, this.height);
    }

    /**
     *
     * @return this
     * @param sketch
     */
    // static make(sketch) {
    //     return new  PopulationComparison(sketch)
    // }
}
