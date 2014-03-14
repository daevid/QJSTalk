var fs = require('fs'),
    Q  = require('q');

module.exports = {
    getThing: function(thingName){
        return Q.ninvoke(fs, 'readFile', thingName)
                .then(JSON.parse);
    }
};