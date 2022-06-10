// const PopulationRace = ( sketch ) => {
//
//     let x = 100;
//     let y = 100;
//
//     sketch.setup = () => {
//         sketch.createCanvas(200, 200);
//     };
//
//     sketch.draw = () => {
//         sketch.background(0);
//         sketch.fill(25);
//         sketch.rect(x,y,50,50);
//     };
// }

const PopulationSecond = ( sketch ) => {

    let width = document.querySelector('#first').offsetWidth;
    let height = document.querySelector('#first').offsetHeight;

    sketch.setup = () => {
        sketch.createCanvas(width, height);
    };

    sketch.draw = () => {
        sketch.background(0);

        // Get the value of the company we're interested in from the
        //select item.

        //simple charts! this.data.getRowCount()

        console.log(this.select.value())
        this.getRows()
        .slice(0, 15)
        .filter((o) => {
          return o.getString(this.select.value())
        }).forEach((v, i) => {
            let v40 = 40;
            rect(i * v40, holder.elt.offsetHeight, v40, -v.getString(this.select.value())  * this.t - 10);
            fill(0, 200, 220);
            push();
            translate(i * v40 + 20, holder.elt.offsetHeight - 1 - v.getString(this.select.value() ) * this.t - 10);
            rotate(radians(-25));
            fill(0, 200, 220);

            if (v.get('icon')) {
                text(v.getString('icon'), 0, 0);
            }
            pop();
        })
        for (let i = 0; i < 15; i++) {
        }
        if (this.t < 40) {
            this.t = this.t + 1;
        }
    };
}

const PopulationSimple = ( sketch ) => {

    let x = 100;
    let y = 100;

    sketch.setup = () => {
        sketch.createCanvas(200, 200);
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(25);
        sketch.rect(x,y,50,50);
    };
}

class Exmple {
    constructor(sketch) {
        this.sketch = sketch;
        this.setup();
        this.draw();
    }

    setup () {
        this.sketch.setup = () => {
            this.sketch.createCanvas(200, 200);
        };

    }
    draw () {
        this.sketch.draw = () => {
            this.sketch.background(0);
            this.sketch.fill(25);
            this.sketch.rect(100,100,50,50);
        };
    }
    static make(sketch) {
        return new Exmple(sketch);
    }
}
