//Deferred FS Sample
var fs = require('fs');
var Q = require('q');

var filePromise = readFileAsPromise('JsonList1.json');
filePromise.done(function(fileContents){
    console.log(fileContents.toString());
});







function readFileAsPromise(fileName){
    var deferred = Q.defer();
    try{
        fs.readFile(fileName, function(error, result){
            if(error){
                return deferred.reject(error);
            }
            deferred.resolve(result);
        });
    }
    catch(err){
        deferred.reject(err);
    }
    finally {
        return deferred.promise;
    }
}