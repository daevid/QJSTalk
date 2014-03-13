var Q  = require('q');

exports.ThingGetter = function(fs){
    var me = {};
    me.getThing = function(thingName){
        return Q.ninvoke(fs, 'readFile', thingName);
    };
    me.getThingAndAddOneToIt = function(thingName){
        return Q.ninvoke(fs, 'readFile', thingName).then(function(thing){
            return thing + 1;
        });
    };
    return me;
};