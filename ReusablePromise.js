var fs = require('fs'),
    Q = require('q');

var readFile = Q.denodeify(fs.readFile);

var listPromise = readFile('JsonList1.json').then(JSON.parse);
//ListPromise now contains a promise of the parsed array JsonList1.

//Two different paths...
//printFirstValue takes a result
listPromise.then(printFirstValue);

//while printLastValue takes a promise
printLastValue(listPromise);

//we can also utilize the chained promises returned by then...
var trimmedListPromise = listPromise.then(function(list){
    return list.slice(0, list.length-1);
});

printLastValue(trimmedListPromise);

console.log('Hi node js users group');

function printFirstValue(list){
    console.log(list[0]);
}
function printLastValue(listPromise){
    return listPromise.then(function(list){
        console.log(list[list.length-1]);
    });
}