module.exports = {
    change: function(thing){
        thing.changed = true;
        return thing;
    }
};