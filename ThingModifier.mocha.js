//ThingModifier Mocha Tests
var chai = require( "chai" ), should = chai.should(), expect = chai.expect,
    sinon = require( "sinon" ), sinonChai = require( "sinon-chai"),
    Q = require( "q" ), mockery = require('mockery');
chai.use( sinonChai );

describe('ThingModifer', function (){
    before(function(){
        mockery.enable({
            warnOnReplace: false, //won't warn us if we don't replace a mock
        });
        mockery.registerAllowables(['q', 'lodash', './ThingModifier']);
    });
    after(function(){
        mockery.disable();
    });
    describe('modify', function(){
        var subjectUnderTest;
        var originalThing = { test: 'I am a test object'};
        var changedThing = { changed: 'I am a changed object'};
        var mockThingChanger = {},
            mockThingGetter = {};
        before(function(){
            //IMPORTANT
            mockThingGetter.getThing = sinon.stub().returns( Q(originalThing) );
            //THAT WAS THE IMPORTANT PART
            mockThingChanger.change = sinon.stub().returns(changedThing);
            mockery.registerMock("./ThingGetter", mockThingGetter);
            mockery.registerMock("./ThingChanger", mockThingChanger);
            subjectUnderTest = require('./ThingModifier');
        });
        //1.1
        it('should change the original thing', function(){
            subjectUnderTest.modify('a thing');
            expect(mockThingChanger.change).to.have.been.calledWith(originalThing);
        });
        //1.2
        it('should return the changed thing', function(){
            //fill me in!
        });
    });
});