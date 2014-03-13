var fs = require('fs'),
    Q  = require('q');

module.exports = {
    getThing: function(thingName){
        /*var deferred = Q.defer();
        fs.readFile(thingName, function(blah){
            console.log(blah);
            deferred.resolve(blah);
        });
        return deferred.promise;*/
        return Q.ninvoke(fs, 'readFile', thingName);
    }
};