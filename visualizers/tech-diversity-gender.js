class TechDiversityGender extends BaseVisualizer{

  constructor() {
    super('tech-diversity-gender','Tech Diversity: Gender',  './data/tech-diversity/gender-2018.csv');
    // Layout object to store all common plot layout parameters and
    // methods.
    this.prepare();

    // Middle of the plot: for 50% line.
    this.midX = (this.layout.plotWidth() / 2) + this.layout.leftMargin;

    // Default visualisation colours.
    this.femaleColour = color(255, 0 ,0);
    this.maleColour = color(0, 255, 0);
  }

  setup () {
    // Font defaults.
    textSize(16);
  };

  draw () {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Draw Female/Male labels at the top of the plot.
    this.drawCategoryLabels();

    let lineHeight = (height - this.layout.topMargin) /
        this.data.getRowCount();

    for (let i = 0; i < this.data.getRowCount(); i++) {

      // Calculate the y position for each company.
      let lineY = (lineHeight * i) + this.layout.topMargin;

      // Create an object that stores data from the current row.
      let company = {
        // Convert strings to numbers.
        'name': this.data.getString(i, 'company'),
        'female': this.data.getNum(i, 'female'),
        'male': this.data.getNum(i, 'male'),
      };

      // Draw the company name in the left margin.
      fill(0);
      noStroke();
      textAlign('right', 'top');
      text(company.name,
           this.layout.leftMargin - this.layout.pad,
           lineY);

      // Draw female employees rectangle.
      fill(this.femaleColour);
      rect(this.layout.leftMargin,
           lineY,
           this.mapPercentToWidth(company.female),
           lineHeight - this.layout.pad);

      // Draw male employees rectangle.
      fill(this.maleColour);
      rect(this.layout.leftMargin + this.mapPercentToWidth(company.female),
           lineY,
           this.mapPercentToWidth(company.male),
           lineHeight - this.layout.pad);
    }

    // Draw 50% line
    stroke(150);
    strokeWeight(1);
    line(this.midX,
         this.layout.topMargin,
         this.midX,
         this.layout.bottomMargin);

  };

  drawCategoryLabels() {
    fill(0);
    noStroke();
    textAlign('left', 'top');
    text('Female',
         this.layout.leftMargin,
         this.layout.pad);
    textAlign('center', 'top');
    text('50%',
         this.midX,
         this.layout.pad);
    textAlign('right', 'top');
    text('Male',
         this.layout.rightMargin,
         this.layout.pad);
  };
  mapPercentToWidth (percent) {
    return map(percent,
               0,
               100,
               0,
               this.layout.plotWidth());
  };

  prepare () {
    this.layout = {
      // Locations of margin positions. Left and bottom have double margin
      // size due to axis and tick labels.
      leftMargin: 130,
      rightMargin: width,
      topMargin: 30,
      bottomMargin: height,
      pad: 5,

      plotWidth: function() {
        return this.rightMargin - this.leftMargin;
      },

      // Boolean to enable/disable background grid.
      grid: true,

      // Number of axis tick labels to draw so that they are not drawn on
      // top of one another.
      numXTickLabels: 10,
      numYTickLabels: 8,
    };
  }
}
