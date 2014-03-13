var fs = require('fs');
var _ = require('lodash');
var Q = require('q');
var readFile = Q.denodeify(fs.readFile);

(function compareFileLists(){
    var firstPromise = readFile('JsonList1.json')
        .then(function (result) {
            JSON.parse(result);
        });
    //these are the same as firstPromise above, but shorter!
    var secondPromise = readFile('JsonList2.json').then(JSON.parse);
    var thirdPromise = readFile('JsonList3.json').then(JSON.parse);

    return Q.all( [ firstPromise, secondPromise, thirdPromise ] )
            .spread( function (first, second, third) {
                var intersection = _.intersection(first, second, third);
                _.intersection(first, second, third).forEach(console.log);
            });
})();