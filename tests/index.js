var Model = require("../");

describe('Model', function() {
    var TestModel = Model.extend({
        defaults: {
            test: "hello"
        }
    });

    describe('get', function() {

        it('should return default value', function() {
            var m = new TestModel();
            expect(m.get("test")).to.equal("hello");
        });

    });

});

