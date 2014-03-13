var chai = require( "chai" ), should = chai.should(), expect = chai.expect,
    sinon = require( "sinon" ), sinonChai = require( "sinon-chai"),
    Q = require( "q" );
chai.use( sinonChai );

function lookup(aValue) {
    //creates a promise that is resolved in 5 ms
    //pretend this is going out to get Some Return Value
    return Q('SomeReturnValue').delay(5);
}
//This function returns a promise that someFunction was called on
//the value returned from the lookup
function functionToTest(aValue, someFunction) {
    return lookup(aValue)
        .then( function (result){
            someFunction(result);
            return result;
        });
}

describe('functionToTest', function(){
    //This example is very stupid
    it('should call someFunction on the looked up return value', function() {
        var functionToVerifyWasCalled = sinon.stub();

        functionToTest('some value', functionToVerifyWasCalled);

        functionToVerifyWasCalled.should.have.been.calledWith('SomeReturnValue');
    });
});