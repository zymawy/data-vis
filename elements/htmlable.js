class Htmlable {
    constructor(element = 'div', value = '', extra = {}) {
        this._elementCreator = createElement(element, value);
        // let's inital the perant to our main section for each element unless override it!
        // see perant method.
        this.parent(select('#app'))
    }
    /**
     *
     * @param element
     * @param value
     * @return Htmlable
     */
    static make(element = 'div', value = null) {
        return new this.prototype.constructor(element, value);
    }

    static createCheckbox (label, checked = false, onChanged = null) {
    }

    static  createSelect () {
        return createSelect()
    }

    parent(parent) {
        this._elementCreator.parent(parent);
        return this;
    }

    id(id) {
        this._elementCreator.id(id);
        return this;
    }

    mousePressed(onMousePressed) {
        if (typeof onMousePressed !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.mousePressed(onMousePressed)

        return this;
    }

    doubleClicked(onDoubleClicked) {
        if (typeof onDoubleClicked !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.doubleClicked(onDoubleClicked)

        return this;
    }

    mouseWheel(onMouseWheel) {
        if (typeof onMouseWheel !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.mouseWheel(onMouseWheel)

        return this;
    }

    mouseReleased(onMouseReleased) {
        if (typeof onMouseReleased !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.mouseReleased(onMouseReleased)

        return this;
    }

    mouseClicked(onMouseClicked) {
        if (typeof onMouseClicked !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.mouseClicked(onMouseClicked)

        return this;
    }

    mouseMoved(onMouseMoved) {
        if (typeof onMouseMoved !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.mouseMoved(onMouseMoved)

        return this;
    }
    mouseOver(onMouseOver) {
        if (typeof onMouseOver !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.mouseOver(onMouseOver)

        return this;
    }

    mouseOut(onMouseOut) {
        if (typeof onMouseOut !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.mouseOut(onMouseOut)

        return this;
    }

    touchStarted(onTouchStarted) {
        if (typeof onTouchStarted !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.touchStarted(onTouchStarted)

        return this;
    }


    touchMoved(onTouchMoved) {
    if (typeof onTouchMoved !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.touchMoved(onTouchMoved)

        return this;
    }

    touchEnded(onTouchEnded) {
        if (typeof onTouchEnded !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.touchEnded(onTouchEnded)

        return this;
    }
    dragOver(onDragOver) {
        if (typeof onDragOver !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.dragOver(onDragOver)

        return this;
    }

    dragLeave(onDragLeave) {
        if (typeof onDragLeave !== 'function') {
            throw SyntaxError('It\\s Not A CallaBack!');
        }
        this._elementCreator.dragLeave(onDragLeave)

        return this;
    }

    addClass(myClass) {
        this._elementCreator.addClass(myClass);
        return this;
    }
    removeClass(myClass) {
        this._elementCreator.removeClass(myClass);
        return this;
    }

    hasClass(myClass) {
        return this._elementCreator.hasClass(myClass);
    }

    toggleClass(myClass) {
        return this._elementCreator.toggleClass(myClass);
    }

    class(myClass) {
        this._elementCreator.class(myClass);
        return this;
    }

    style(a, v) {
        this._elementCreator.style(a, v);

        return this;
    }

    size(a, v) {
        this._elementCreator.size(a, v);

        return this;
    }

    remove() {

        return this._elementCreator.remove();
    }

    value(value = null) {

        return this._elementCreator.value(value);
    }


    show() {

        this._elementCreator.show();
        return this;
    }

    hide() {

        this._elementCreator.hide();
        return this;
    }
    position(a, v) {
        this._elementCreator.position(a, v);

        return this;
    }

    child(el) {
        this._elementCreator.child(el);

        return this;
    }
    center(align = null) {

        this._elementCreator.center(align);
        return this;
    };

    attribute(k, v) {

        this._elementCreator.attribute(k,v);

        return this;
    }

    /**
     *
     * @return {p5.Element}
     */
    get elementCreator() {
        return this._elementCreator;
    }

    /**
     *
     * @return {String}
     */
    get elt() {
        return this.elementCreator.elt
    }

    set elementCreator(value) {
        this._elementCreator = value;
    }

    getInstance() {

        return this._elementCreator
    }
}
