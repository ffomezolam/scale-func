var should = require('should');
var bx = require('../scale-func-biexp');

describe('biExp()', function() {
    it('should provide correct results for 0 and 1', function() {
        var out = bx(0,2, -2, 2, -1, 1);
        out.should.equal(0);

        out = bx(0, 100, -2, 2, -100, 100);
        out.should.equal(0);

        out = bx(1, 2, -1, 1, -1, 1);
        out.should.equal(1);

        out = bx(1, 2, -1, 1, -100, 100);
        out.should.equal(100);

        out = bx(-1, 2, -1, 1, -1, 1);
        out.should.equal(-1);

        out = bx(-1, 2, -1, 1, -100, 100);
        out.should.equal(-100);
    });

    it('should maintain extreme values', function() {
        var out = bx(2, 2, -2, 2, -1, 1);
        // 2 is the same as 1 here as it is the top of the range
        out.should.equal(1);

        out = bx(-2, 100, -2, 2, -1, 1);
        out.should.equal(-1);
    });

    it('should have correct results for intermediate values', function() {
        var out = bx(1, 2, -2, 2, -1, 1);
        out.should.equal(Math.pow(0.5, 2));

        out = bx(-1, 2, -2, 2, -1, 1);
        out.should.equal(-Math.pow(0.5, 2));

        out = bx(4, 2, -8, 8, -1, 1);
        out.should.equal(Math.pow(0.5, 2));

        out = bx(4, 10, -8, 8, -1, 1);
        out.should.equal(Math.pow(0.5, 10));
    })
});
