
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;
var p5Element;
var holder;

function setup() {
  // Create a canvas to fill the content div from index.html.
  p5Element = P5Element;

   // let's create a header for our html markup!
  p5Element.make('header', 'Welcome To Data Vis')
  .addClass('header')
  .addClass('shadow-box')

  // let's make a wrapper for our canvas, to have more control of the canvas!
  holder = p5Element.make('div', '')
  .addClass('canvas-holder')
  .addClass('item')
  .addClass('item-9')
  .addClass('shadow-box')
  .getInstance();

  createCanvas(1024,  576)
  .parent(holder);

  // lets create our lovely ul!
  var ul = p5Element.make('ul', '')
  .id("visuals-menu")
  .getInstance();

  var ulWrapper = p5Element.make('div', '')
  .addClass('menu-holder')
  .addClass('item-4')
  .addClass('shadow-box')
  .child(ul)
  .getInstance();

  // tools holders
  var toolHolder = p5Element.make('div', 'Tools ')
  .id('tool-wrapper')
  .addClass('tool-holder')
  .addClass('item')
  .addClass('item-9')
  .addClass('shadow-box')
  .getInstance();

  var splitter1 = p5Element.make('div', '')
  .addClass('gutter-col gutter-col-1')
  .getInstance();

  var splitter2 = p5Element.make('div', '')
  .addClass('gutter-col gutter-col-3')
  .getInstance();

  // let's have a complete wrapped div to our workspace!
  p5Element.make('div', '')
  .addClass('row')
  .addClass('grid')
  .child(ulWrapper)
  .child(splitter1)
  .child(holder)
  .child(splitter2)
  .child(toolHolder)

  // let get going and create our footer
  p5Element.make('footer', 'All Copyright © Hamza Mohmmad')
  .addClass('footer')

  //Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new PayGapByJob2017());
  gallery.addVisual(new PayGapTimeSeries());
  gallery.addVisual(new ClimateChange());

  if (getItem('selectedVisuals')) {
    gallery.highLightSelected(getItem('selectedVisuals'))
  }

  Split({
    minSize: 300,
    maxSize: 1000,
    snapOffset: 10,
    dragInterval: 3,
    columnGutters: [{
      track: 1,
      element: selectAll('.gutter-col-1').elt,
    }, {
      track: 3,
      element: selectAll('.gutter-col-3').elt,
    }],
    onDragStart: (direction, track) => {
      console.log(direction, track)
    },
    onDragEnd: (direction, track) => {
      console.log('redrawing')
      redraw()
    },
    onDrag: (direction, track) => {
      resizeCanvas(holder.elt.clientWidth, 576, true);

      gallery.selectedVisual.draw();
      // console.log()
    }
  })
}

function draw() {
  background(255);
  if (gallery.selectedVisual != null && gallery.selectedVisual.isReady()) {
    gallery.selectedVisual.draw();
  }
}

function windowResized() {
  console.log(holder)
  // resizeCanvas(windowWidth, windowHeight);
}
