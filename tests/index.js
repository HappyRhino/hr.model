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

    describe('set', function() {

        it('should correctly set an attribute', function() {
            var m = new TestModel();
            m.set("test", "world");

            expect(m.get("test")).to.equal("world");
        });

        it('should correctly set multiple attributes', function() {
            var m = new TestModel();
            m.set({
                test2: "Hello",
                test: "World"
            });

            expect(m.get("test")).to.equal("World");
            expect(m.get("test2")).to.equal("Hello");
        });

        it('should correctly set a deep attribute', function() {
            var m = new TestModel({}, {
                deep: {
                    deep2: [1,2]
                }
            });

            m.set("deep.deep2", [1, 2, 3]);
            expect(m.get("deep.deep2")).to.have.length(3);
            expect(m.get("test")).to.equal("hello");
        });

        it('should correctly set a deep attribute (2)', function() {
            var m = new TestModel({}, {
                deep: {
                    deep2: "hello"
                }
            });

            m.set("deep.deep2", {
                hello: "world"
            });

            expect(m.get("deep.deep2.hello")).to.equal("world");
        });
    });

    describe('del', function() {

        it('should correctly del an attribute', function() {
            var m = new TestModel();
            m.set("test2", "world")
            m.del("test2");
            expect(m.get("test2")).to.equal(undefined);
        });

        it('should correctly del a deep attribute', function() {
            var m = new TestModel();
            m.set({
                test2: {
                    test3: 1
                }
            })
            m.del("test2.test3");
            expect(m.get("test2")).to.not.equal(undefined);
            expect(m.get("test2.test3")).to.equal(undefined);
        });
    });

    describe('toJSON', function() {

        it('should return a copy object', function() {
            var m = new TestModel();
            var o = m.toJSON();

            expect(o).to.have.property("test");
            expect(o.test).to.equal("hello");

            // test changing o
            o.test = "world";

            expect(m.get("test")).to.equal("hello");
        });
    });

    describe('events', function() {

        it('should signal modifications', function(done) {
            var m = new TestModel();

            m.on("change:test", function() {
                expect(m.get("test")).to.equal("world");
                done();
            });

            m.set("test", "world");
        });

        it('should not signal unchanged set', function(done) {
            var m = new TestModel({}, {
                a: {
                    b: 1
                }
            });

            m.on("change", function() {
                done(new Error("Signal unchanged set"));
            });

            m.set({
                a: {
                    b: 1
                }
            });

            done();
        });
    });
});

