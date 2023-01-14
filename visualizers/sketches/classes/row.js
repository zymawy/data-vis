/* The Row class is a wrapper for a row of data. */
class Row {
	constructor(data) {
		this._data = data;
	}

	/**
	 * > It returns the data
	 * @returns The data array
	 */
	all() {

		return this._data
	}

	/**
	 * It returns the value of the key in the object
	 * @param key - The key of the value you want to get.
	 * @returns The value of the key in the object.
	 */
	get(key) {

		return this._data[key];
	}

	/**
	 * It returns true if the key exists in the object, and false if it doesn't
	 * @param key - The key to check for.
	 * @returns The value of the key in the object.
	 */
	has(key) {

		return this._data.hasOwnProperty(key);
	}

	population() {
		return this.get('population');
	}

	year() {
		return this.get('year');
	}


	icon() {
		return this.get('icon');
	}

	name() {
		return this.get('name');
	}

	ios() {
		return this.get('ios');
	}

	rank() {
		return this.get('rank');
	}
}
