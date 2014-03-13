var thingGetter = require('./ThingGetter');
var changer = require('./ThingChanger');

module.exports = {
    modify: function(name){
        var thingPromise = thingGetter.getThing(name);
        return thingPromise.then(function(thing){
            return changer.change(thing);
        });
    }
};