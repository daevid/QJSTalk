//ThingGetter Mocha Tests
var chai = require( "chai" ), should = chai.should(), expect = chai.expect,
    sinon = require( "sinon" ), sinonChai = require( "sinon-chai"),
    Q = require( "q" ), mockery = require('mockery');
chai.use( sinonChai );

describe('ARequestController', function (){
    before(function(){
        mockery.enable({
            warnOnReplace: false, //won't warn us if we don't replace a mock
        });
        mockery.registerAllowables(['q', 'lodash', './ARequestController']);
    });
    after(function(){
        mockery.disable();
    });

    describe('control', function(){
        var subjectUnderTest;
        var fakeThing1 = {
            name: 'thing1'
        };
        var fakeThing2 = {
            name: 'thing2'
        };
        var mockThingChanger = {},
            mockThingGetter = {};

        before(function (){
            mockThingGetter.getThing = sinon.stub();
            //Make sure that  your mocks of promise functions return promises!
            mockThingGetter.getThing.withArgs('thing1').returns( Q(fakeThing1) );
            mockThingGetter.getThing.withArgs('thing2').returns( Q(fakeThing2) );
            //This is how to create a 'rejected' promise
            mockThingGetter.getThing.withArgs('invalidThing')
                .returns( Q.reject(new Error('Some error;')) );
            //THAT WAS THE IMPORTANT PART

            mockery.registerMock("./ThingGetter", mockThingGetter);
            subjectUnderTest = require('./ARequestController');
        });

        //1.1
        it('should respond to a request with thing2 when asked',
            function (done) {
                var mockRequest = { query: {}};
                mockRequest.query.thing = 'thing2';
                var mockResponse = {};
                mockResponse.send = function(response){
                    expect(response).to.equal(fakeThing2);
                    done();
                };
                subjectUnderTest(mockRequest, mockResponse);
            });


        it('should respond to a request with a 500 error when asked for an invalid thing',
            function (done) {
                var mockRequest = { query: {} };
                mockRequest.query.thing = 'invalidThing';
                var mockResponse = {};
                mockResponse.send = function(responseCode){
                    expect(responseCode).to.equal(500);
                    done();
                };
                subjectUnderTest(mockRequest, mockResponse);
            });
    });
});