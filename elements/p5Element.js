/* The `P5Element` class extends the `Htmlable` class and is used to create HTML
elements that can be used in the `p5.js` library. */
class P5Element extends Htmlable{
    constructor(element = 'div', attributes = {}) {
        super(element, attributes);
    }
}
