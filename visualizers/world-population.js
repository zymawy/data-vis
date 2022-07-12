class WorldPopulation extends BaseVisualizer {
    constructor() {
        super('world-population', 'World Population', './../data/world-population/world-population.csv');
        // Graph properties.
        this.pad = 20;
        this.dotSizeMin = 15;
        this.dotSizeMax = 40;
        // target values
        this.values = [];
        // index which will increase at regular intervals
        this.index = 0;
        this.t = 0;

        this.boxes = [];
        this.years = [];

    }

    destroy() {
        this.mySelect.remove();
        selectYears = null;
    };

    setup() {
        // let's quickly initialize our tools for global usages
        document.addEventListener('data::set', ({ detail }) => {
            console.log(detail.data().years);
            this.years = detail.data().years;
        })

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
            .id('population-simple')
            .addClass('population-simple')
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
        new p5(PopulationComparison.make, 'population-comparison')
        new p5(PopulationBubble.make, 'population-bubble')
        new p5(PopulationSimple.make, 'population-simple')


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
    }

    draw() {
        if (!this.isReady()) {
            console.log('Data not yet loaded');
            return;
        }
        // let's inietalse our data gloable tools to be used on our instance mode extastions
        if (!this.mySelect || (!this.mySelect && this.years)) {
            this.setupSelect()
        }
    };


    setupSelect() {

        if (this.mySelect && this.years) {
            return this.mySelect;
        }
        P5Element.make('label', 'Years: ')
            .attribute('for', this.id)
            .parent(toolHolder);

        selectYears = this.mySelect = P5Element.createSelect()
            .id(this.id)
            .addClass(this.id)
            .addClass('input');
        this.mySelect.parent(toolHolder)

        this.mySelect.changed(this.changed)

        // Fill the options with years.
        for (let i = 0; i < this.years.length; i++) {
            this.mySelect.option(this.years[i]);
        }
    }

    changed() {

        const eventAwesome = new CustomEvent('select::value', {
            bubbles: true,
            detail: { value: () => this.mySelect.value() }
        });
        // let's dispatch it !
        document.dispatchEvent(eventAwesome)
    }
}
