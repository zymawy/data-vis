
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;
var p5Element;
var holder;
var canvasWidth;
var ulWrapper;
var toolHolder;
var selectYears = null;

function setup() {
  // Create a canvas to fill the content div from index.html.
  p5Element = P5Element;

   // let's create a header for our html markup!
  p5Element.make('header', 'Welcome To Data Vis')
  .addClass('header')
  .addClass('shadow-box')

  var header = p5Element.make('div', 'Header')
  .addClass('canvas-header')
  .getInstance();

  // let's make a wrapper for our canvas, to have more control of the canvas!
  holder = p5Element.make('div', '')
  .addClass('canvas-holder')
  .addClass('item')
  .addClass('item-9')
  .addClass('shadow-box')
  .child(header)
  .getInstance();

  canvasWidth = min(holder.elt.offsetWidth, 1024);
  createCanvas(canvasWidth,  776)
  .parent(holder);

  // lets create our lovely ul!
  var ul = p5Element.make('ul', '')
  .id("visuals-menu")
  .getInstance();

  // let's create give a label for our menu area!
  let menuHead = p5Element.make('h2', 'Menu')
  .id('tool-header')
  .addClass('tool-header')
  .addClass('head')
  .getInstance();

  ulWrapper = p5Element.make('div', '')
  .id('menu-holder')
  .addClass('menu-holder')
  .addClass('item-4')
  .addClass('shadow-box')
  .child(menuHead)
  .child(ul);

  // let's create give a label for our tool area!
  let toolsHead = p5Element.make('h2', 'Tools ')
  .addClass('tool-header')
  .addClass('head')
  .getInstance();

  // tools holders
  toolHolder = p5Element.make('div', '')
  .id('tool-wrapper')
  .addClass('tool-holder')
  .addClass('item')
  .addClass('item-9')
  .addClass('shadow-box')
  .child(toolsHead)
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
  .child(ulWrapper.getInstance())
  .child(splitter1)
  .child(holder)
  .child(splitter2)
  .child(toolHolder)

  // let get going and create our footer
  p5Element.make('footer', 'All Copyright © Hamza Mohmmad #200104867')
  .addClass('footer')

  //Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new PayGapByJob2017());
  gallery.addVisual(new PayGapTimeSeries());
  gallery.addVisual(new ClimateChange());
  gallery.addVisual(new WorldPopulation());

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
      element: document.querySelector('.gutter-col-1'),
    }, {
      track: 3,
      element: document.querySelector('.gutter-col-3'),
    }],
    onDragStart: (direction, track) => {
    },
    onDragEnd: (direction, track) => {

    },
    onDrag: (direction, track) => {
      onResized()
      // resizeCanvas(holder.elt.clientWidth, 576, true);
      // gallery.selectedVisual.draw();
      // console.log()
    }
  })
}

function draw() {
  background(255);
  if (gallery.selectedVisual != null && gallery.selectedVisual.isReady()) {
    let convasOne = document.getElementById('defaultCanvas0'),
        convasTow = document.getElementById('defaultCanvas1');
    if (gallery.selectedVisual.id === "world-population") {
      convasOne.style.display ="none";
      if (convasTow)
          convasTow.style.display ="block";
    } else {
      convasOne.style.display ="block";
      if (convasTow)
          convasTow.style.display ="none";
    }
    gallery.selectedVisual.draw();
  }
}
/**
 * Called automatically when the window is resized.
 */
function windowResized() {
  onResized()
}


function onResized() {
  // resizeCanvas(holder.elt.offsetWidth, 1024);
  // redraw()
}
