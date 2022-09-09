class Gallery {
    constructor() {
        this.visuals = [];
        this.selectedVisual = null;
    }
    // Add a new visualisation to the navigation bar.
    addVisual(vis) {
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
        let menuItem = P5Element.make('li', vis.name)
            .addClass('menu-item')
            .id(vis.id)
            .mouseOver(function (e) {
                let el = select('#' + e.target.id);
                el.addClass("hover");
            })
            .mouseOut(function (e) {
                let el = select('#' + e.target.id);
                el.removeClass("hover");
            }).mouseClicked((e) => {
                //remove selected class from any other menu-items
                this.highLightSelected(e.target.id)
            }).getInstance();

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
            // let's save the last selected visuals to initials it once the application is initials
            storeItem('selectedVisuals', visId);

            if (this.selectedVisual.hasMethod('preload') && this.selectedVisual.id != visIndex) {
                this.selectedVisual.preload();
            }
            // Initialise visualisation if necessary.
            if (this.selectedVisual.hasMethod('setup')) {
                this.selectedVisual.setup();
            }

            // Enable animation in case it has been paused by the current
            // visualisation.
            loop();
        }
    };

    highLightSelected(id) {

        let menuItems = selectAll('.menu-item');
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].removeClass('selected');
        }
        let el = select('#' + id);
        el.addClass('selected');

        this.selectVisual(id);
    }
}
