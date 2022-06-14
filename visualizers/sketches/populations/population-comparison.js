class PopulationComparison extends SketchBase {

    constructor(sketch) {
    super(sketch);
    this.id = 'population-comparison';
    this.width = document.querySelector('#' + this.id).offsetWidth;
    this.height = document.querySelector('#' + this.id).offsetHeight;

    // Names for each axis.
    this.xAxisLabel = 'totals';
    this.yAxisLabel = 'years';
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
    this.maxVisitors = 0;
    }

    setup () {
            this.getSketch().setup = () => {
                this.onResize();
                if (! this.isReady()) {
                    return;
                }
            }
    }

    draw() {
        this.getSketch().draw = () => {
            this.getSketch().push();
        if (! this.isReady()) {
            return;
        }
        // Draw x and y axis.
        this.drawAxis(this.layout);

        // Draw x and y axis labels.
        this.drawAxisLabels(this.xAxisLabel,
            this.yAxisLabel,
            this.layout);

        // Draw all x-axis labels.
        for (let i = 0; i < this.getYears().length; i++) {
            this.drawXAxisTickLabel(this.getYears()[i],
                this.layout,
                this.mapMonthToWidth.bind(this));
        }

        // Draw all y-axis labels.
        this.drawYAxisTickLabels(this.minVisitors,
            this.maxVisitors,
            this.layout,
            this.mapVisitorsToHeight.bind(this),
            0);

        let year = selectYears.value();
        let dateYear = this.getDataByColumn(year);
        this.minVisitors = dateYear.min();
        this.maxVisitors = dateYear.max();

        // Work in progress
        for (var i = 0; i < this.getData().getRowCount(); i++) {

        }
            this.getSketch().pop();
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

    mapMonthToWidth (value) {
        return this.getSketch().map(value,
            this.getYears()[0],
            new Date().getFullYear(),
            this.layout.leftMargin,
            this.layout.rightMargin);
    }
    /**
     *
     * @return this
     * @param sketch
     */
    static make(sketch) {
        return new  PopulationComparison(sketch)
    }
}
