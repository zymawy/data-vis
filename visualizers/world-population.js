class WorldPopulation extends BaseVisualizer {
    constructor() {
        super('world-population', 'World Population', './../data/world-population/world-population.csv');
        // Graph properties.
        this.pad = 20;
        this.dotSizeMin = 15;
        this.dotSizeMax = 40;
        // target values
        this.values = [];
// intermediate values
        this.lerpValues = [];
// index which will increase at regular intervals
        this.index = 0;
        this.t = 0;

        this.boxes = [];

    }

    setup() {
        var firstDiv = p5Element.make('div', '')
        .id('population-race')
        .addClass('population-race')
        .getInstance();

        var gutterCol = p5Element.make('div', '')
        .addClass('world-gutter-col world-gutter-col-1')
        .getInstance();

        var secondDiv = p5Element.make('div', '')
        .id('population-comparison')
        .addClass('population-comparison')
        .getInstance();

        var thirdDiv = p5Element.make('div', '')
        .id('population-bubble')
        .addClass('population-bubble')
        .getInstance();

        var gutterRow = p5Element.make('div', '')
        .addClass('world-gutter-row world-gutter-row-1')
        .getInstance();

        var fourthDiv = p5Element.make('div', '')
        .id('four')
        .addClass('four')
        .getInstance();

        // let's have a complete wrapped div to our workspace!
       p5Element.make('div', '')
        .addClass('row')
        .addClass('world-grid')
        .child(firstDiv)
        .child(gutterCol)
        .child(secondDiv)
        .child(thirdDiv)
        .child(gutterRow)
        .child(fourthDiv)
        .parent(holder)
        .getInstance();

       // let's get going and use instant mode
        // so can have more maintenances and readability for our sketches
        new p5(PopulationRace.make, 'population-race')
        new p5(PopulationComparison, 'population-comparison')
        new p5(PopulationBubble.make, 'population-bubble')


        Split({
            minSize: 100,
            maxSize: 1000,
            dragInterval: 3,
            columnGutters: [{
                track: 1,
                element: document.querySelector('.world-gutter-col-1'),
            }],
            rowGutters: [{
                track: 1,
                element: document.querySelector('.world-gutter-row-1'),
            }],
            onDragEnd: (direction, track) => {
                // let's use custom event to notify our canvas about the resizsing the splitter!
                const eventAwesome = new CustomEvent('splitter::resize', {
                    bubbles: true,
                    detail: { track: () => track, direction: () => direction }
                });

                // let's dispatch it !
                document.dispatchEvent(eventAwesome)
            }
        })
        if (!this.isReady()) {
            console.log('Data not yet loaded');
            return;
        }

        // Create a select DOM element.
        // this.setupSelect()


    }

    draw() {
        if (!this.isReady()) {
            console.log('Data not yet loaded');
            return;
        }

        if (! this.select) {
            // this.setupSelect()
        }
        // Get the value of the company we're interested in from the
        // select item.

        // simple charts! this.data.getRowCount()

        // console.log(this.select.value())
        // this.getRows()
        // .slice(0, 15)
        // .filter((o) => {
        //   return o.getString(this.select.value())
        // }).forEach((v, i) => {
        //     let v40 = 40;
        //     rect(i * v40, holder.elt.offsetHeight, v40, -v.getString(this.select.value())  * this.t - 10);
        //     fill(0, 200, 220);
        //     push();
        //     translate(i * v40 + 20, holder.elt.offsetHeight - 1 - v.getString(this.select.value() ) * this.t - 10);
        //     rotate(radians(-25));
        //     fill(0, 200, 220);
        //
        //     if (v.get('icon')) {
        //         text(v.getString('icon'), 0, 0);
        //     }
        //     pop();
        // })
        // for (let i = 0; i < 15; i++) {
        // }
        // if (this.t < 40) {
        //     this.t = this.t + 1;
        // }
        // noStroke();
        // fill(0,200,220);
        // console.log(this.index)
        // for(var i=0;i<this.index;i++){
        //     let posx = map(i,0,this.values.length,40,width);
        //     this.lerpValues[i] = lerp(this.lerpValues[i],this.values[i],0.2);
        //     rect(posx, height-20, 40, -this.lerpValues[i]);
        //     textAlign(CENTER);
        //     text(round(this.lerpValues[i]),posx+20,height-this.lerpValues[i]-30);
        // }


        // this.data.forEach((p, f) => {
        //     console.log(p, f);
        // })
    };


    setupSelect() {

        if (this.select) {
            return this.select;
        }

        // this.values = this.data.getColumn("rank").slice(0, 10);
        // this.labels = this.data.getColumn("name").slice(0, 10);

        // console.log(this.values)
        P5Element.make('label', 'Years: ')
        .attribute('for', this.id)
        .parent(toolHolder);

        this.select = P5Element.createSelect()
        .id(this.id)
        .addClass(this.id)
        .addClass('input');
        this.select.parent(toolHolder)
        // console.log(this.getRows().sort((a, b) => {
        //     console.log(a ,b)
        // }))
        //console.log(this.getColumns(), this.getRows())
        // Fill the options with all company names.
        this.years = this.data.columns.filter(column => {
            return ! isNaN(column) && ! ['', "", undefined, null].includes(column)
        }).sort();

        // First entry is empty.
        for (let i = 1; i < this.years.length; i++) {
            this.select.option(this.years[i]);
        }
    }
}
