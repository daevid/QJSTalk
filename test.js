var thingGetter = require('./ThingGetter');
var thingModifier = require('./ThingModifier');

var thingPromise = thingGetter.getThing("JsonList1.json");
//thingPromise = thingModifier.modify("JsonList1.json");

thingPromise.done(function(thing){
    console.log(thing);
},function(error){
    console.error(error);
});