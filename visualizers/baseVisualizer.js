/* It's a class that contains the basic methods that are required for a
visualisation */
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
		this.years = ['1970', '1980', '1990', '2000', '2010', '2015', '2020', '2022', '2030', '2050'];
		this.sketches = [];
		this.options = [5, 10, 15, 20, 25];
		this.selectedYear = '1980';
		this.selectedOption = 5;
		this.selectedOrder = 'asc';
		this.mySelect = null;
		this.title = 'Header';
		// https://colorhunt.co/palette/f94892ff7f3ffbdf0789cffd
		this.colors = [
			'rgb(255, 127, 63)', 'rgb(251, 223, 7)', 'rgb(249, 72, 146)',
			'rgb(242, 211, 136)', 'rgb(201, 132, 116)', 'rgb(167, 210, 203)',
			'rgb(135, 76, 98)', 'rgb(85, 73, 148)', 'rgb(22, 33, 62)', 'rgb(83, 52, 131)',
			'rgb(76, 58, 81)', 'rgb(119, 67, 96)', 'rgb(178, 80, 104)', 'rgb(231, 171, 121)',
			'rgb(130, 111, 102)', 'rgb(198, 155, 123)', 'rgb(247, 204, 172)', 'rgb(59, 154, 225)',
			'rgb(59, 154, 225)', 'rgb(33, 225, 225)', 'rgb(240, 234, 190)', 'rgb(255, 220, 174)', 'rgb(255, 220, 174)',
			'rgb(206, 216, 158)', 'rgb(173, 207, 159)', 'rgb(118, 186, 153)', 'rgb(58, 176, 255)', "rgb(22, 33, 62)",
			'rgb(249, 242, 237)', 'rgb(255, 181, 98)', 'rgb(248, 116, 116)','rgb(41, 52, 98)',
			'rgb(28, 214, 206)', 'rgb(254, 219, 57)', 'rgb(254, 219, 57)', 'rgb(214, 28, 78)', 'rgb(249, 72, 146)',
			'rgb(255, 127, 63)', 'rgb(251, 223, 7)', 'rgb(137, 207, 253)',
		];
		// Colors for vertical bar
		this.colorList = _.sampleSize(this.colors, 5);

		this.onResize()


		this.setupListeners();
	}

	async preload() {

		console.log(this.data_path);
		await loadTable(
			"/data-vis/" + this.data_path, 'csv', 'header',
			// Callback function to set the value
			// this.loaded to true.
			(table) => {
				dataTesting = this.data = table;
				this.loaded = true;

				const setEvent = new CustomEvent('data::set', {
					bubbles: true,
					detail: { data: () => this.data, rawData: () => this.rawData }
				});

				document.dispatchEvent(setEvent)
			});
	}

	destroy() {
		this.optionSelect.remove();
		this.orderSelect.remove();
		if(this.mySelect) {
			this.mySelect.remove();
		}
		this.orderLabel.remove();
		this.optionsLabel.remove();
		this.yearLabel.remove();

	}

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
		header.elt.innerHTML = this.title
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
		// console.log(min)
		return min.get('population');
	}


	setupSelect() {
		this.yearLabel = P5Element.make('label', 'Years: ')
			.attribute('for', this.id)
			.parent(toolHolder)
			.getInstance();

		this.mySelect = P5Element.createSelect()
			.id(this.id)
			.addClass(this.id)
			.addClass('input')
			.addClass('selectable');
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

		this.optionsLabel = P5Element.make('label', 'Options: ')
			.attribute('for', `option-${this.id}`)
			.parent(toolHolder)
			.getInstance();

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

		this.orderLabel = P5Element.make('label', 'Order: ')
			.attribute('for', `order-${this.id}`)
			.parent(toolHolder)
			.getInstance();

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

	/**
	 * > This function takes the data from the Google Spreadsheet and creates an array
	 * of Row objects
	 */
	setupRows() {

		this.rawData = this.data.getRows().map((e) => {
			return new Row({
				name: e.getString('name'),
				growthRate: e.getNum('growthRate'),
				worldPercentage: e.getNum('worldPercentage'), // density: e.getString('density'),
				rank: e.getNum('rank'),
				population: e.getNum('puplistion'),
				year: e.getNum('year'),
				icon: e.getString('icon'),
				ios: e.getString('ios-code')
			});
		});
	}


	/**
	 * It listens for events from the select component and the splitter component, and
	 * then updates the values of the variables that are used to render the chart
	 */
	setupListeners() {

		document.addEventListener('splitter::resize', (r) => {
			this.divWidth = document.querySelector('#' + this.id).offsetWidth;
			this.divHeight = document.querySelector('#' + this.id).offsetHeight;
		})
		document.addEventListener('select::value', ({detail}) => {
			this.selectedYear = detail.value();
			if (this.hasMethod('prepare')) {
				this.prepare()
			}
		});
		document.addEventListener('select::option-value', ({detail}) => {
			this.selectedOption = detail.value();
			if (this.hasMethod('prepare')) {
				this.prepare()
			}
		});
		document.addEventListener('select::order-value', ({detail}) => {
			this.selectedOrder = detail.value();

			if (this.hasMethod('prepare')) {
				this.prepare()
			}
		});
	}

}
