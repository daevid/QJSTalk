//ThingGetter Mocha Tests
var chai = require( "chai" ), should = chai.should(), expect = chai.expect,
    sinon = require( "sinon" ), sinonChai = require( "sinon-chai"),
    Q = require( "q" ), mockery = require('mockery');
chai.use( sinonChai );

describe('ThingGetter', function (){
    before(function(){
        mockery.enable({
            warnOnReplace: false, //won't warn us if we don't replace a mock
        });
        mockery.registerAllowables(['q', 'lodash', './ThingGetter']);
    });
    after(function(){
        mockery.disable();
    });

    describe('getThing', function(){
        var subjectUnderTest, mockFs = {};
        var fooThing = {
            name: 'foo'
        };
        var barThing = {
            name: 'bar'
        };

        before(function(){ //runs once
            mockery.registerMock('fs', mockFs);
            subjectUnderTest = require('./ThingGetter');
        });
        beforeEach(function(){ //runs for every test
            mockFs.readFile = sinon.stub();
            mockFs.readFile.withArgs('foo').yields(null, fooThing);
            mockFs.readFile.withArgs('bar').yields(null, barThing);
        });

        //1.1
        it('should return barThing when asked', function (done) {
            var thing2Promise = subjectUnderTest.getThing('bar');
            thing2Promise.then(function (result){
                expect(result.name).to.equal('bar');
                done();
            });
        });
        /*
        //1.2
        it('should fail when asked for thing3', function (done) {
            mockFs.readFile.withArgs('thing3').yields(new Error('haha'), null);
            var thing2Promise = subjectUnderTest.getThing('thing3');
            thing2Promise.done(function (result){
                done(new Error('Promise should have failed'));
            }, function (err){
                done();
            });
        });
        */
    });
});