/**
 * Exports a function to scale values and transform them based on a bipolar
 * exponentiation function (e.g. exponent of a negative number will always be
 * negative opposite of result on that same positive number).
 *
 * All inputs are initially scaled based on the input range to be between -1
 * and 1, and the exponent is performed on the absolute scaled value, then
 * rescaled to the output range
 *
 * @module ScaleFuncBiExp
 */
(function(name, root, factory) {
    if(typeof define === 'function' && define.amd) {
        define(['scaley'], factory);
    } else if(typeof exports === 'object') {
        module.exports = factory(require('scaley'));
    } else {
        root[name] = factory(scaley);
    }
}('ScaleFuncBiExp', this, function(scale) {
    /**
     * Calculate bipolar exponent scaled to bounds
     */
    function biExp(input, exp, inmin, inmax, outmin, outmax) {
        var ins = {
            min: (typeof inmin == "number") ? inmin : 0,
            max: (typeof inmax == "number") ? inmax : 1
        };
        var outs = {
            min: (typeof outmin == "number") ? outmin : 0,
            max: (typeof outmax == "number") ? outmax : 1
        };

        if(typeof exp != "number") exp = 2;

        if(input > ins.max || input < ins.min) throw "Input " + input + " outside bounds";

        // convert input to -1, 1 range
        input = scale(input, ins.min, ins.max, -1, 1);

        var output;

        // translate
        if(input > 0) {
            output = Math.pow(input, exp);
        } else if (input < 0) {
            output = -Math.pow(Math.abs(input), exp);
        } else {
            output = 0;
        }

        // convert to output range
        output = scale(output, -1, 1, outs.min, outs.max);

        return output;
    }

    return biExp;
}));
