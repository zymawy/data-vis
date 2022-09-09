class BaseVisualizer {
    id; // Name for the visualisation to appear in the menu bar.
    name; // Each visualisation must have a unique ID with no special characters.
    data_path; // Each visualisation must have a unique ID with no special characters.
    data;
    loaded = false;

    constructor(id, name, data_path) {
        this.id = id;
        this.name = name;
        this.data_path = data_path;
		this.xAxisLabel = 'year';
		this.yAxisLabel = '℃';
		this.years = ['1960', '1970', '1980', '1990', '2000', '2010', '2015', '2020', '2022', '2030', '2050', '2070', '2080'];
		this.sketches = [];
		this.options = [5, 10, 15, 20, 25];
		this.selectedYear = '1980';
		this.selectedOption = 5;
		this.selectedOrder = 'asc';
		this.onResize()
		document.addEventListener('splitter::resize', (r) => {
			console.log(r)
			this.divWidth = document.querySelector('#' + this.id).offsetWidth;
			this.divHeight = document.querySelector('#' + this.id).offsetHeight;
		})
		document.addEventListener('select::value', ({ detail }) => {
			this.selectedYear = detail.value();
		});
		document.addEventListener('select::option-value', ({ detail }) => {
			this.selectedOption = detail.value();
		});
		document.addEventListener('select::order-value', ({ detail }) => {
			this.selectedOrder = detail.value();
		});
    }

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    async preload() {
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

    // ------------------- Implementation required --------------- //
    setup() {
        // this.throwError('setup');
    }

    destroy() {
        // this.throwError('destroy');
    }

    draw() {
        this.throwError('draw');
    }

    throwError(method_name = null) {
        throw new Error(`You have to implement the method ${method_name}`);
    }

    isLoaded() {

        return this.loaded;
    }

    isReady() {

        return this.data && this.isLoaded()
    }

	/**
	 * "When the window is resized, create a new canvas with the new width and height."
	 *
	 * The `createCanvas()` function is a built-in function in p5.js. It creates a new canvas with the specified width and
	 * height
	 */
	onResize() {
		this.convas = createCanvas(1000, 700);
		this.convas.id(`id-${this.id}`);
		this.convas.parent(holder)
	}

	//	MOVE IT


	/**
	 * It checks if the object has a property.
	 * @param property - The property to check for.
	 * @param [type=null] - The type of the property.
	 * @returns a boolean value.
	 */
	has(property, type = null) {
		return ['function'].includes(type || '') ?
			typeof this[property] === type :
			this.hasOwnProperty(property);
	}

	/**
	 * Returns true if the object has a method with the given name.
	 * @param property - The name of the property to check for.
	 * @returns A boolean value.
	 */
	hasMethod(property) {

		return this.has(property, 'function');
	}

	/**
	 * `make` is a function that takes a sketch as an argument and returns a function that takes a p5 object as an argument
	 * @param sketch - The name of the sketch you want to use.
	 */
	static make(sketch) {

		throw new Error(`You have to implement the method make in order to use ${sketch}`);
	}

	/**
	 * It returns the data
	 * @returns The data property of the object.
	 */
	getData() {

		return this.data;
	}

	/**
	 * It returns the years property of the object returned by the getData() function
	 * @returns The years property of the data object.
	 */
	getYears() {
		return this.years;
	}

	/**
	 *
	 * @returns _main.default.Table|Table
	 */
	getRows() {

		return this.getData().getRows();
	}
	/**
	 * This function returns the columns of the data
	 * @returns The columns of the data.
	 */
	getColumns() {

		return this.getData().getColumns();
	}

	/**
	 * It returns the data in the column specified by the parameter
	 * @param column - The column name to get the data from.
	 * @returns The column of data from the data object.
	 */
	getDataByColumn(column) {

		return this.getData().getColumn(column);
	}

	/**
	 * `getSketch()` returns the `sketch` variable
	 * @returns The sketch is being returned.
	 */
	getSketch() {
		return this.sketch;
	}


	/**
	 * It returns the value of the selectedYear property, or the string '1980' if the selectedYear property is undefined
	 * @returns The selectedYear property of the object, or 1980 if it is not defined.
	 */
	getSelectedYear() {

		return this.selectedYear || '1980';
	}

	getStartYear() {
		return this.getYears()[0];
	}

	getEndYear() {

		return this.getYears().slice(-1)[0];
	}

	getSelectedOption() {

		return this.selectedOption || 5;
	}

	getSelectedOrder() {

		return this.selectedOrder || 'asc';
	}


	/**
	 * It returns a chain of the raw data
	 * @returns A chain of the rawData array.
	 */
	getRawData() {
		if (this.returnedRawData) {
			return this.returnedRawData;
		}
		return this.returnedRawData = _.chain(this.rawData);
	}


	/**
	 * It returns a chain of the raw data
	 * @returns A chain of the rawData array.
	 */
	getCurrentSelectedYearData() {
		return this.getRawData()
			.filter((e) => e.get('year') == this.getSelectedYear())
			.take(this.getSelectedOption())
			.orderBy(function (e) {
				return e.get('population')
			}, [this.getSelectedOrder()]);
	}

	// let's get going and use histogram algrtom and calc the results...
	getMaxValue() {
		let max = this.getCurrentSelectedYearData().maxBy((e) => Number(e.get('population'))).value();
		return max.get('population');
	}
	getMinValue() {
		let min = this.getCurrentSelectedYearData().minBy((e) => Number(e.get('population'))).value();
		return min.get('population');
	}


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

	/**
	 * It creates a label and a select element, and then adds the options to the
	 * select element
	 */
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
	}

	/**
	 * It creates a dropdown menu that allows the user to select the order of the data
	 */
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

	/**
	 * It creates a custom event and dispatches it.
	 * @param e - the event object
	 */
	changed(e) {

		const eventSelectYear = new CustomEvent('select::value', {
			bubbles: true,
			detail: { value: () => e.target.value }
		});
		// let's dispatch it !
		document.dispatchEvent(eventSelectYear)
	}

	/**
	 * The function is called when the user changes the value of the select element.
	 * It creates a custom event called 'select::option-value' and dispatches it
	 * @param e - The event object
	 */
	optionChanged(e) {
		const eventSelectOption = new CustomEvent('select::option-value', {
			bubbles: true,
			detail: { value: () => e.target.value }
		});

		document.dispatchEvent(eventSelectOption)
	}


	/**
	 * It creates a custom event that bubbles up the DOM tree.
	 * @param e - The event object
	 */
	orderChanged(e) {

		const eventSelectOption = new CustomEvent('select::order-value', {
			bubbles: true,
			detail: { value: () => e.target.value }
		});

		document.dispatchEvent(eventSelectOption)
	}
}
