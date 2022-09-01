function InformationBox(skitch, leftMargin, topMargin, Expenditure, Income, year) {
    // Initalizing  all the class variables
    this.leftMargin = leftMargin;
    this.topMargin = topMargin;
    this.Expenditure = Expenditure;
    this.Income = Income;
    this.year = year;
    this.skitch = skitch;
    // Main Draw method which will used to draw the information Box needed for bar graph
    this.draw = function () {
        this.skitch.stroke(0);
        this.skitch.fill('pink');
        this.skitch.rect(this.leftMargin + 20, this.topMargin + 5, 175, 85);
        this.skitch.fill('black');
        this.skitch.noStroke();
        this.skitch.text(this.year, this.leftMargin + 90, this.topMargin + 20);
        this.skitch.text('  Income:  ', this.leftMargin + 55, this.topMargin + 35);
        this.skitch.text(this.Income, this.leftMargin + 110, this.topMargin + 35);
        this.skitch.text('  Expenditure:  ', this.leftMargin + 70, this.topMargin + 50);
        this.skitch.text(this.Expenditure, this.leftMargin + 140, this.topMargin + 50);
        this.skitch.text('  Net:  ', this.leftMargin + 40, this.topMargin + 65);
        this.skitch.text(this.Income - this.Expenditure, this.leftMargin + 110, this.topMargin + 65);
        this.skitch.text('($ million)', this.leftMargin + 60, this.topMargin + 80);
    }
}