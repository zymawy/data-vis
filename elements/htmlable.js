/* It's a wrapper for p5.Element class */
class Htmlable {
	constructor(element = 'div', value = '', extra = {}) {
		if (typeof element === 'object') {
			this._elementCreator = element;
		} else {
			this._elementCreator = createElement(element, value);
		}
		// let's initial the parent to our main section for each element unless override it!
		// see parent method.
		this.parent(select('#app'))
	}


	get elementCreator() {
		return this._elementCreator;
	}

	set elementCreator(value) {
		this._elementCreator = value;
	}

	/**
	 * It returns the element of the elementCreator.
	 * @returns The elementCreator.elt property.
	 */
	get elt() {
		return this.elementCreator.elt
	}

	/**
     It's a static method that can be called without instantiating the class.
	 * @param element
	 * @param value
	 * @return Htmlable
	 */
	static make(element = 'div', value = null) {
		return new this.prototype.constructor(element, value);
	}

	static createCheckbox(label, checked = false, onChanged = null) {
	}

	/**
	 * `createSelect()` creates a new `<select>` element and returns a new instance of
	 * the `Select` class
	 * @returns A new instance of the class.
	 */
	static createSelect() {
		let select = createSelect();

		return new this.prototype.constructor(select);
	}
	static createSlider(min, max, value, step) {
		let slider = createSlider(min, max, value, step);

		return new this.prototype.constructor(slider);
	}

	/**
	 * It creates an option element with the value of the parameter.
	 * @param value - The value of the option.
	 * @returns The object that the method is being called on.
	 */
	option(value) {

		this._elementCreator.option(value, value);
		return this;
	}

	/**
	 * `parent(parent)` sets the parent of the element to be created
	 * @param parent - The parent element to append the new element to.
	 * @returns The object itself.
	 */
	parent(parent) {
		this._elementCreator.parent(parent);
		return this;
	}

	/**
	 * This function sets the id of the element being created.
	 * @param id - The id of the element.
	 * @returns The object itself.
	 */
	id(id) {
		this._elementCreator.id(id);
		return this;
	}

	/**
	 * A function that is used to change the value of the select element.
	 * @param onSelectChanged - A callback function that will be called when the
	 * select element is changed.
	 * @returns The object itself.
	 */
	changed(onSelectChanged) {
		if (typeof onSelectChanged !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.changed(onSelectChanged)

		return this;
	}

	/**
	 * It's a function that takes a callback function as an argument and returns the
	 * current instance of the class
	 * @param onMousePressed - A callback function that is called when the mouse is
	 * pressed.
	 * @returns The object itself.
	 */
	mousePressed(onMousePressed) {
		if (typeof onMousePressed !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.mousePressed(onMousePressed)

		return this;
	}

	/**
	 * A function that is used to add a double click event to the element.
	 * @param onDoubleClicked - The callback function that will be called when the
	 * element is double clicked.
	 * @returns The object itself.
	 */
	doubleClicked(onDoubleClicked) {
		if (typeof onDoubleClicked !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.doubleClicked(onDoubleClicked)

		return this;
	}

	/**
	 * A function that is used to add a mouse wheel event to the element.
	 * @param onMouseWheel - The callback function that will be called when the mouse
	 * wheel is scrolled.
	 * @returns The object itself.
	 */
	mouseWheel(onMouseWheel) {
		if (typeof onMouseWheel !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.mouseWheel(onMouseWheel)

		return this;
	}

	/**
	 * A function that is used to create a mouseReleased event.
	 * @param onMouseReleased - The callback function that will be called when the
	 * mouse is released.
	 * @returns The object itself.
	 */
	mouseReleased(onMouseReleased) {
		if (typeof onMouseReleased !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.mouseReleased(onMouseReleased)

		return this;
	}

	/**
	 * A function that is used to add a mouseClicked event to the element.
	 * @param onMouseClicked - The callback function that will be called when the
	 * mouse is clicked.
	 * @returns The object itself.
	 */
	mouseClicked(onMouseClicked) {
		if (typeof onMouseClicked !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.mouseClicked(onMouseClicked)

		return this;
	}

	/**
	 * A function that is used to add a mouseMoved event to the element.
	 * @param onMouseMoved - The callback function that will be called when the mouse
	 * is moved.
	 * @returns The object itself.
	 */
	mouseMoved(onMouseMoved) {
		if (typeof onMouseMoved !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.mouseMoved(onMouseMoved)

		return this;
	}

	/**
	 * A function that is used to add a mouseover event to the element.
	 * @param onMouseOver - The callback function that will be called when the mouse
	 * is over the element.
	 * @returns The object itself.
	 */
	mouseOver(onMouseOver) {
		if (typeof onMouseOver !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.mouseOver(onMouseOver)

		return this;
	}

	/**
	 * A function that is used to add a mouseOut event to the element.
	 * @param onMouseOut - The callback function that will be called when the mouse
	 * leaves the element.
	 * @returns The object itself.
	 */
	mouseOut(onMouseOut) {
		if (typeof onMouseOut !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.mouseOut(onMouseOut)

		return this;
	}

	/**
	 * A function that is used to create a callback function for the touchStarted
	 * event.
	 * @param onTouchStarted - A callback function that will be called when the
	 * element is touched.
	 * @returns The object itself.
	 */
	touchStarted(onTouchStarted) {
		if (typeof onTouchStarted !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.touchStarted(onTouchStarted)

		return this;
	}

	/**
	 * A function that is used to create a callback function for the touchMoved event.
	 * @param onTouchMoved - The callback function that will be called when the user
	 * touches the screen and moves their finger.
	 * @returns The object itself.
	 */
	touchMoved(onTouchMoved) {
		if (typeof onTouchMoved !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.touchMoved(onTouchMoved)

		return this;
	}

	/**
	 * A function that is used to add a callback function to the touchEnded event.
	 * @param onTouchEnded - The callback function that will be called when the touch
	 * ends.
	 * @returns The object itself.
	 */
	touchEnded(onTouchEnded) {
		if (typeof onTouchEnded !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.touchEnded(onTouchEnded)

		return this;
	}

	/**
	 * A function that is used to create a callback function for the dragOver event.
	 * @param onDragOver - A callback function that is called when the user drags an
	 * element over the drop zone.
	 * @returns The object itself.
	 */
	dragOver(onDragOver) {
		if (typeof onDragOver !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.dragOver(onDragOver)

		return this;
	}

	/**
	 * A function that is used to add a dragLeave event to the element.
	 * @param onDragLeave - A callback function that is called when the element is
	 * dragged out of the element.
	 * @returns The object itself.
	 */
	dragLeave(onDragLeave) {
		if (typeof onDragLeave !== 'function') {
			throw SyntaxError('It\\s Not A CallaBack!');
		}
		this._elementCreator.dragLeave(onDragLeave)

		return this;
	}

	/**
	 * It adds a class to the element.
	 * @param myClass - The class to add to the element.
	 * @returns The object itself.
	 */
	addClass(myClass) {
		this._elementCreator.addClass(myClass);
		return this;
	}

	/**
	 * It removes a class from the element.
	 * @param myClass - The class to remove from the element.
	 * @returns The object itself.
	 */
	removeClass(myClass) {
		this._elementCreator.removeClass(myClass);
		return this;
	}

	/**
	 * This function returns true if the element has the class, false if it doesn't
	 * @param myClass - The class to check for.
	 * @returns The return value is a boolean.
	 */
	hasClass(myClass) {
		return this._elementCreator.hasClass(myClass);
	}

	/**
	 * It toggles the class of the element.
	 * @param myClass - The class to toggle.
	 * @returns The return value is the elementCreator object.
	 */
	toggleClass(myClass) {
		return this._elementCreator.toggleClass(myClass);
	}

	/**
	 * > This function adds a class to the element
	 * @param myClass - The class to add to the element.
	 * @returns The object itself.
	 */
	class(myClass) {
		this._elementCreator.class(myClass);
		return this;
	}

	/**
	 * This function sets the style of the element.
	 * @param a - The attribute name
	 * @param v - The value of the attribute.
	 * @returns The object itself.
	 */
	style(a, v) {
		this._elementCreator.style(a, v);

		return this;
	}

	/**
	 * Sets the size of the element.
	 * @param a - The element to set the size of.
	 * @param v - The value to set the attribute to.
	 * @returns The object that the method is being called on.
	 */
	size(a, v) {
		this._elementCreator.size(a, v);

		return this;
	}

	/**
	 * It removes the element from the DOM.
	 * @returns The return value of the remove() method of the _elementCreator object.
	 */
	remove() {

		return this._elementCreator.remove();
	}

	/**
	 * `value()` returns the value of the element creator.
	 * @returns The value of the elementCreator object.
	 */
	value() {

		return this._elementCreator.value();
	}

	/**
	 * It returns the selected element.
	 * @returns The selected element.
	 */
	selected() {
		return this._elementCreator.selected();
	}

	/**
	 * `show()` shows the element creator
	 * @returns The object itself.
	 */
	show() {

		this._elementCreator.show();
		return this;
	}

	/**
	 * > Hides the element creator
	 * @returns The object itself.
	 */
	hide() {

		this._elementCreator.hide();
		return this;
	}

	/**
	 * This function sets the position of the element.
	 * @param a - The attribute name.
	 * @param v - The value to set the attribute to.
	 * @returns The object itself.
	 */
	position(a, v) {
		this._elementCreator.position(a, v);

		return this;
	}

	/**
	 * It creates a child element.
	 * @param el - The element to add as a child.
	 * @returns The object itself.
	 */
	child(el) {
		this._elementCreator.child(el);

		return this;
	}

	/**
	 *
	 * @param [align=null] - The alignment of the element. Can be one of the
	 * following:
	 * @returns The object itself.
	 */
	center(align = null) {

		this._elementCreator.center(align);
		return this;
	}

	/**
	 * "This function adds an attribute to the element being created."
	 *
	 * @param k - The name of the attribute.
	 * @param v - The value of the attribute.
	 * @returns The object itself.
	 */
	attribute(k, v) {

		this._elementCreator.attribute(k, v);

		return this;
	}

	/**
	 * It returns the elementCreator object.
	 * @returns The element creator
	 */
	getInstance() {

		return this._elementCreator
	}
}
