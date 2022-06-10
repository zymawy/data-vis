class PopulationBubble extends SketchBase {

    constructor(sketch) {
        super(sketch, './../../../data/museum-visitors/socialmediadata.csv');
        this.id = 'population-bubble';
        this.width = document.querySelector('#' + this.id).offsetWidth;
        this.height = document.querySelector('#' + this.id).offsetHeight;

        this.bubbles = [];
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.title = 'Most used social media platforms in 2021';
    }

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    async preload () {
        await loadTable(
            this.data_path, 'csv', 'header',
            // Callback function to set the value
            // this.loaded to true.
            (table) => {
                this.data = table;

                this.data.rows = table.rows.map(function(row) {
                    row.arr[1] = parseFloat(row.arr[1]);
                    row.obj["Number of users"] = parseFloat(row.obj["Number of users"]);
                    return row;
                })
                this.loaded = true;
            });
    };

    setup () {
        this.getSketch().setup = () => {
            this.onResize();

            if (! this.isReady()) {
                return;
            }

            if (this.bubbles.length) {
                this.prepare()
            }
        }}

    prepare() {
        // to iterate rows and columns in the data.
        var rows = this.getData().getRows();
        var numColumns = this.getData().getColumnCount();
        var that = this;

        // to create new bubbles
        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].get(0) != "")
            {
                let numberOfUsers = rows[i].obj["Number of users"];
                let size = 20 * numberOfUsers;

                let b = {};
                b.size = size;
                b.pos = createVector(0,0,0);
                b.direction = createVector(0,0,0);
                b.name = rows[i].get(0);
                b.color = randomColor({ luminosity: 'light'});

//draw the bubble and names
                b.draw = function () {
                    that.sketch.push();
                    that.sketch.noStroke();
                    that.sketch.fill(this.color);
                    that.sketch.ellipse(this.pos.x, this.pos.y, this.size);
                    that.sketch.fill(0);
                    that.sketch.textAlign(CENTER,CENTER);
                    that.sketch.textStyle(BOLDITALIC);
                    that.sketch.textSize(15);
                    that.sketch.text(this.name,this.pos.x ,this.pos.y);
                    that.sketch.pop();
                }

//update the bubbles directions
                b.update =function (_bubbles) {
                    this.direction.set(0,0,0);

                    for(var i = 0; i < _bubbles.length; i++)
                    {
                        if(_bubbles[i].name !== this.name)
                        {
                            // var v = that.sketch.createVector().sub(this.pos,_bubbles[i].pos);
                            // console.log(createVector(), that.sketch.createVector(), p5.Vector);
                            var v = p5.Vector.sub(this.pos,_bubbles[i].pos);
                            // console.log(sketch.createVector(0,0), p5.Vector);
                            // throw new Error(`You have to implement the method make in order to use `);
                            var d = v.mag();

                            // console.log(v, this.size)
                            if(d < this.size/2 + 30 + _bubbles[i].size/2)
                            {
                                if(d > 0)
                                {
                                    this.direction.add(v)
                                }
                                else
                                {
                                    this.direction.add(p5.Vector.random2D()); //Make a new 2D unit vector from a
                                    // random angle

                                }
                            }

                        }
                    }


                    this.direction.normalize();
                    this.direction.mult(2); //multiply the vector by 2
                    this.pos.add(this.direction);
                }
                // let b = new Bubble(rows[i].get(0), size, this.getSketch());
                this.bubbles.push(b);
            }

        }
    }

    draw () {

        this.getSketch().draw = () => {
            this.getSketch().push();
            if (! this.isReady()) {
                return;
            }

            if (! this.bubbles.length) {
                this.prepare();
            }
            // Draw the bubbles.
            this.getSketch().translate(this.width / 2, this.height / 2);
            for(var i = 0; i < this.bubbles.length; i++)
            {
                this.bubbles[i].update(this.bubbles);
                this.bubbles[i].draw();
                if (i === this.bubbles.length -1 ) { break; } // ends the loop when the loop counter i=16.
            }


            //draw the title.
            // strokeWeight(2);
            // textAlign(CENTER, CENTER);
            this.sketch.fill('#ff0000');
            this.sketch.textSize(24);
            this.sketch.textStyle(BOLDITALIC);
            this.sketch.text(this.title,this.x - 50,this.y - 60);

            this.sketch.pop() //to restore last drawing config.

            // throw new Error(`You have to implement the method make in order to use`);
        };}

    /**
     *
     * @return this
     * @param sketch
     */
    static make(sketch) {
        return new  PopulationBubble(sketch)
    }

    // to clear the canvas
    destroy (){
        this.bubbles = [];
    }
}
function Bubble(_name, size, sketch)
{
    this.size = size;
    this.sketch = sketch;
    this.pos = this.sketch.createVector(0,0,0);
    this.direction = this.sketch.createVector(0,0,0);
    this.name = _name;
    this.color = randomColor({ luminosity: 'light'});

//draw the bubble and names
    this.draw = () => {
        this.sketch.push();
        // noStroke();
        this.sketch.fill(this.color);
        this.sketch.ellipse(this.pos.x, this.pos.y, this.size);
        this.sketch.fill(0);
        textAlign(CENTER,CENTER);
        textStyle(BOLDITALIC);
        textSize(15);
        this.sketch.text(this.name,this.pos.x ,this.pos.y);
        this.sketch.pop();
    }

//update the bubbles directions
    this.update = (_bubbles) => {
        this.direction.set(0,0,0);

        for(var i = 0; i < _bubbles.length; i++)
        {
            if(_bubbles[i].name != this.name)
            {
                // var v = this.sketch.createVector().sub(this.pos,_bubbles[i].pos);
                var v = p5.Vector.sub(this.pos,_bubbles[i].pos);
                // console.log(sketch.createVector(0,0), p5.Vector);
                // throw new Error(`You have to implement the method make in order to use `);
                var d = v.mag();
                console.log(d)

                if(d < this.size/2 + 30 + _bubbles[i].size/2)
                {
                    if(d > 0)
                    {
                        this.direction.add(v)
                    }
                    else
                    {
                        this.direction.add(p5.Vector.random2D()); //Make a new 2D unit vector from a random angle

                    }
                }

            }
        }


        this.direction.normalize();
        this.direction.mult(2); //multiply the vector by 2
        this.pos.add(this.direction);
    }

}
