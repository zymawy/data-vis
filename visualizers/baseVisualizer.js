class BaseVisualizer {
    id; // Name for the visualisation to appear in the menu bar.
    name; // Each visualisation must have a unique ID with no special characters.
    data_path; // Each visualisation must have a unique ID with no special characters.
    data;
    loaded =false;

    constructor(id, name, data_path) {
        this.id = id;
        this.name = name;
        this.data_path = data_path;
    }

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    preload () {
        this.data = loadTable(
            this.data_path, 'csv', 'header',
            // Callback function to set the value
            // this.loaded to true.
            (table) => {
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
}
