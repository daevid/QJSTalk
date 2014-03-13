//ARequestController
var Q = require('Q');
var getter = require('./ThingGetter');
module.exports = function(request, response) {

    //URL like http://example.com?thing=exampleThing
    var thingName = request.query.thing;

    var thingPromise = getter.getThing(thingName);

    thingPromise.done(function success(thing){
        response.send(200, thing);
    }, function error(err){
        response.send(500,'An internal server error has occured');
    });
};