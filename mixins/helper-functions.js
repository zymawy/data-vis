// --------------------------------------------------------------------
// Data processing helper functions.
// --------------------------------------------------------------------
Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

/* It's defining a set of functions that can be used by other objects. */
const HelperMixins = {
    /* It's defining a set of functions that can be used by other objects. */
    sum(data) {
        var total = 0;

        // Ensure that data contains numbers and not strings.
        data = this.stringsToNumbers(data);

        for (let i = 0; i < data.length; i++) {
            total = total + data[i];
        }

        return total;
    },

    /* It's defining a set of functions that can be used by other objects. */
    mean(data) {
        var total = this.sum(data);

        return total / data.length;
    },

    /* It's defining a set of functions that can be used by other objects. */
    sliceRowNumbers(row, start = 0, end) {
        var rowData = [];

        if (!end) {
            // Parse all values until the end of the row.
            end = row.arr.length;
        }

        for (i = start; i < end; i++) {
            rowData.push(row.getNum(i));
        }

        return rowData;
    },

   /* It's converting an array of strings to an array of numbers. */
     stringsToNumbers(array) {
        return array.map(Number);
    },

// --------------------------------------------------------------------
// Plotting helper functions
// --------------------------------------------------------------------

    /* It's defining a set of functions that can be used by other objects. */
    drawAxis(layout, colour = 0) {
        stroke(color(colour));

        // x-axis
        line(layout.leftMargin,
            layout.bottomMargin,
            layout.rightMargin,
            layout.bottomMargin);

        // y-axis
        line(layout.leftMargin,
            layout.topMargin,
            layout.leftMargin,
            layout.bottomMargin);
    },

    /* It's defining a set of functions that can be used by other objects. */
    drawAxisLabels(xLabel, yLabel, layout) {
        fill(0);
        noStroke();
        textAlign('center', 'center');

        // Draw x-axis label.
        text(xLabel,
            (layout.plotWidth() / 2) + layout.leftMargin,
            layout.bottomMargin + (layout.marginSize * 1.5));

        // Draw y-axis label.
        push();
        translate(layout.leftMargin - (layout.marginSize * 1.5),
            layout.bottomMargin / 2);
        rotate(-PI / 2);
        text(yLabel, 0, 0);
        pop();
    },

    /* It's defining a set of functions that can be used by other objects. */
    drawYAxisTickLabels(min, max, layout, mapFunction,
                        decimalPlaces) {
        // Map function must be passed with .bind(this).
        var range = max - min;
        var yTickStep = range / layout.numYTickLabels;

        fill(0);
        noStroke();
        textAlign('right', 'center');

        // Draw all axis tick labels and grid lines.
        for (i = 0; i <= layout.numYTickLabels; i++) {
            var value = min + (i * yTickStep);
            var y = mapFunction(value);

            // Add tick label.
            text(value.toFixed(decimalPlaces),
                layout.leftMargin - layout.pad,
                y);

            if (layout.grid) {
                // Add grid line.
                stroke(200);
                line(layout.leftMargin, y, layout.rightMargin, y);
            }
        }
    },

    /* It's defining a set of functions that can be used by other objects. */
    drawXAxisTickLabel(value, layout, mapFunction) {
        // Map function must be passed with .bind(this).
        var x = mapFunction(value);

        fill(0);
        noStroke();
        textAlign('center', 'center');

        // Add tick label.
        text(value,
            x,
            layout.bottomMargin + layout.marginSize / 2);

        if (layout.grid) {
            // Add grid line.
            stroke(220);
            line(x,
                layout.topMargin,
                x,
                layout.bottomMargin);
        }
    },

	/**
	 * The function takes in any number of arguments, and logs them to the console
	 * @param value - The value to be logged.
	 */
	dd(...value) {
		console.log(value);

		throw new Error('Log');
	}
}
