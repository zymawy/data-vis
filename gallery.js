class Gallery {
    constructor() {
        this.visuals = [];
        this.selectedVisual = null;
    }
    // Add a new visualisation to the navigation bar.
    addVisual(vis) {
        /** @var BaseVisualizer vis */
        // Check that the vis object has an id and name.
        if (!vis.has('id')
            && !vis.has('name')) {
            alert('Make sure your visualisation has an id and name!');
        }
        // Check that the vis object has a unique id.
        if (this.findVisIndex(vis.id) != null) {
            alert(`Vis '${vis.name}' has a duplicate id: '${vis.id}'`);
        }
        this.visuals.push(vis);
        // Create menu item.
        let menuItem = createElement('li', vis.name);
        menuItem.addClass('menu-item');
        menuItem.id(vis.id);

        menuItem.mouseOver(function (e) {
            let el = select('#' + e.srcElement.id);
            el.addClass("hover");
        })

        menuItem.mouseOut(function (e) {
            let el = select('#' + e.srcElement.id);
            el.removeClass("hover");
        })

        menuItem.mouseClicked( (e) => {
            //remove selected class from any other menu-items

            let menuItems = selectAll('.menu-item');

            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].removeClass('selected');
            }

            let el = select('#' + e.srcElement.id);
            el.addClass('selected');

            this.selectVisual(e.srcElement.id);

        })


        let visMenu = select('#visuals-menu');
        visMenu.child(menuItem);


        // Preload data if necessary.
        if (vis.hasMethod('preload')) {
            vis.preload();
        }
    };

    findVisIndex(visId) {
        // Search through the visualisations looking for one with the id
        // matching visId.
        for (let i = 0; i < this.visuals.length; i++) {
            if (this.visuals[i].id === visId) {
                return i;
            }
        }

        // Visualisation not found.
        return null;
    };

    selectVisual(visId) {
        let visIndex = this.findVisIndex(visId);

        if (visIndex != null) {
            // If the current visualisation has a deselect method run it.
            if (this.selectedVisual != null
                && this.selectedVisual.hasMethod('destroy')) {
                this.selectedVisual.destroy();
            }
            // Select the visualisation in the gallery.
            this.selectedVisual = this.visuals[visIndex];

            // Initialise visualisation if necessary.
            if (this.selectedVisual.hasMethod('setup')) {
                this.selectedVisual.setup();
            }

            // Enable animation in case it has been paused by the current
            // visualisation.
            loop();
        }
    };
}
