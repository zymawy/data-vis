
class TechDiversityRace extends BaseVisualizer {

  constructor() {
    super('tech-diversity-race', 'Tech Diversity: Race', './../data/tech-diversity/race-2018.csv');
    // Create a new pie chart object.
    this.pie = new PieChart(width / 2, height / 2, width * 0.4);
  }

  setup () {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(350, 40);

    // Fill the options with all company names.
    let companies = this.data.columns;
    // First entry is empty.
    for (let i = 1; i < companies.length; i++) {
      this.select.option(companies[i]);
    }
  };

  destroy () {
    this.select.remove();
  };

  draw () {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the company we're interested in from the
    // select item.
    let companyName = this.select.value();

    // Get the column of raw data for companyName.
    let col = this.data.getColumn(companyName);

    // Convert all data strings to numbers.
    col = this.stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    let labels = this.data.getColumn(0);

    // Colour to use for each category.
    let colours = ['blue', 'red', 'green', 'pink', 'purple', 'yellow'];

    // Make a title.
    let title = 'Employee diversity at ' + companyName;

    // Draw the pie chart!
    this.pie.draw(col, labels, colours, title);
  };
}
