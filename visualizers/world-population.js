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
        this.years = ['1970', '1980', '1990', '2000', '2010', '2015', '2020', '2022', '2030', '2050'];

        this.sketches = [];
        this.options = [3, 5, 7, 9, 11, 14];

    }

    destroy() {
        this.mySelect.remove();
        this.optionSelect.remove();

        // let's remove our instance mode sketches!
        this.sketches.forEach((p) => p.remove());
        document.getElementById('world-grid').remove();
        //document.getElementById('tool-wrapper').remove();
        // toolHolder.remove()
    };
    async preload() {
        await loadTable(
            this.data_path, 'csv', 'header',
            // Callback function to set the value
            // this.loaded to true.
            (table) => {
                dataTesting = this.data = table;
                this.numRows = this.data.getRowCount();
                this.numCols = this.data.getColumnCount();


                // console.trace();
                this.loaded = true;
                // let's get going and notify our main class :)
                const eventAwesome = new CustomEvent('data::set', {
                    bubbles: true,
                    detail: { data: () => this.data, rawData: () => this.rawData }
                });
                // let's dispatch it !
                document.dispatchEvent(eventAwesome)
            });
    };

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
            .id('population-simple')
            .addClass('population-simple')
            .getInstance();

        // let's have a complete wrapped div to our workspace!
        p5Element.make('div', '')
            .addClass('row')
            .addClass('world-grid')
            .id('world-grid')
            .child(firstDiv)
            .child(gutterCol)
            .child(secondDiv)
            .child(thirdDiv)
            .child(gutterRow)
            .child(fourthDiv)
            .parent(holder)
            .getInstance();

        // initales the tools !
        this.setupSelect()
        this.setupSelectOption()
        this.setupSelectOrder()

        // let's get going and use instant mode
        // so can have more maintenances and readability for our sketches

        let p5PopulationRace = PopulationRace.make(this.data);
        this.sketches.push(new p5(p5PopulationRace, 'population-race'));

        let p5PopulationComparison = PopulationComparison.make(this.data);
        this.sketches.push(new p5(p5PopulationComparison, 'population-comparison'));

        let p5PopulationBubble = PopulationBubble.make(this.data);
        this.sketches.push(new p5(p5PopulationBubble, 'population-bubble'));

        let p5PopulationSimple = PopulationSimple.make(this.data)
        this.sketches.push(new p5(p5PopulationSimple, 'population-simple'));


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
        push();

        pop();
    };


    setupSelect() {
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

    setupSelectOption() {

        P5Element.make('label', 'Options: ')
            .attribute('for', `option-${this.id}`)
            .parent(toolHolder);

        this.optionSelect = P5Element.createSelect()
            .id(`option-${this.id}`)
            .addClass(`option-${this.id}`)
            .addClass('input');

        this.optionSelect.parent(toolHolder)

        this.optionSelect.changed(this.optionChanged)

        // Fill the options with years.
        for (let i = 0; i < this.options.length; i++) {
            this.optionSelect.option(this.options[i]);
        }

        this.optionSelect.selected('11');
    }

    setupSelectOrder() {

        P5Element.make('label', 'Order: ')
            .attribute('for', `order-${this.id}`)
            .parent(toolHolder);

        this.orderSelect = P5Element.createSelect()
            .id(`order-${this.id}`)
            .addClass(`order-${this.id}`)
            .addClass('input');

        this.orderSelect.parent(toolHolder)

        this.orderSelect.changed(this.orderChanged)

        // Fill the options with years.
        let orders = ['asc', 'desc'];
        for (let i = 0; i < orders.length; i++) {
            this.orderSelect.option(orders[i]);
        }

        this.orderSelect.selected('desc');
    }

    changed(e) {

        const eventSelectYear = new CustomEvent('select::value', {
            bubbles: true,
            detail: { value: () => e.target.value }
        });
        // let's dispatch it !
        document.dispatchEvent(eventSelectYear)
    }

    optionChanged(e) {

        const eventSelectOption = new CustomEvent('select::option-value', {
            bubbles: true,
            detail: { value: () => e.target.value }
        });
        // let's dispatch it !
        document.dispatchEvent(eventSelectOption)
    }

    orderChanged(e) {

        const eventSelectOption = new CustomEvent('select::order-value', {
            bubbles: true,
            detail: { value: () => e.target.value }
        });
        // let's dispatch it !
        document.dispatchEvent(eventSelectOption)
    }
}
