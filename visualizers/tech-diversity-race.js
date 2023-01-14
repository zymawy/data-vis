
class TechDiversityRace extends BaseVisualizer {

  constructor() {
    super('tech-diversity-race', 'Tech Diversity: Race', 'data-vis/data/tech-diversity/race-2018.csv');
	this.title = 'Tech Diversity: Race'
    // Create a new pie chart object.
    this.pie = new PieChart(width / 2, height / 2, width * 0.4);

    this.cololurs = {'white': '#fff7f7', 'asian': '#e59572', 'latino': '#d9534f', 'black':'#17223b', 'multi': '#ffb549', 'other': '#ED5485'};
  }

  setup () {
	  super.setup()
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
    // Create a select DOM element.
    this.setupSelect()
  };

  destroy () {
    this.select.remove();
  };

  draw () {
    if (! this.isReady()) {
      console.log('Data not yet loaded');
      return;
    }

    if (! this.select) {
      this.setupSelect()
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
    let colours = ['#fff7f7', '#e59572', '#d9534f', '#17223b', '#ffb549', '#ED5485'];

    // Make a title.
    let title = 'Employee diversity at ' + companyName;

    push();
    // Draw the pie chart!
    this.pie.setColor(this.cololurs[col]).setCompanyName(companyName).draw(col, labels, colours, title);
    pop()
  };

  setupSelect() {

    if (this.select) {
      return this.select;
    }
    P5Element.make('label', 'Companies: ')
    .attribute('for', this.id)
    .parent(toolHolder);

    this.select = P5Element.createSelect()
    .id(this.id)
    .addClass(this.id)
    .addClass('input');
    this.select.parent(toolHolder)

    // Fill the options with all company names.
    let companies = this.data.columns;
    // First entry is empty.
    for (let i = 1; i < companies.length; i++) {
      this.select.option(companies[i]);
    }
  }
}
