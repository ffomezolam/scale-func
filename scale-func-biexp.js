/**
 * @module ScaleFuncBiExp
 */
(function(name, root, factory) {
    if(typeof define === 'function' && define.amd) {
        define(['scaley'], factory);
    } else if(typeof exports === 'object') {
        module.exports = factory();
    } else {
        root[name] = factory();
    }
}('ScaleFuncBiExp', this, function() {
    /**
     * Calculate bipolar exponent scaled to bounds
     */
    function BiExp(input, exp, scale) {
        var ins = {
            min: 0,
            max: 1
        };
        var outs = {
            min: 0,
            max: 1
        };

        if(typeof exp == "undefined" || typeof exp != "number") exp = 2;

        if(typeof scale == "object") {
            if("minin" in scale && typeof scale.minin == "number") ins.min = scale.minin;
            if("minout" in scale && typeof scale.minout == "number") outs.min = scale.minout;
            if("maxin" in scale && typeof scale.maxin == "number") ins.max = scale.maxin;
            if("maxout" in scale && typeof scale.maxout == "number") outs.max = scale.maxout;
        }

        if(input > ins.max || input < ins.min) throw "Input " + input + " outside bounds";

        // convert input to -1, 1 range
        var avg = ins.min + ins.max / 2;
        var div = ins.min - avg;
        input -= avg;
        input /= div;

        var output;

        // translate
        if(input > 0) {
            output = pow(input, exp);
        } else if (input < 0) {
            output = -Math.pow(Math.abs(input), exp);
        } else {
            output = 0;
        }

        // convert to output range
        var avg = outs.min + outs.max / 2;
        var div = outs.min - avg;

    }

    return BiExp;
}));
