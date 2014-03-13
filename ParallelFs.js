var fs = require('fs');
var _ = require('lodash');
(function compareFileLists(){
    var firstList;
    var secondList;
    var thirdList;
    function handleResponse(error, response){
        var body = JSON.parse(response);
        if(!firstList){
            firstList =  body;
            return;
        }
        if(!secondList){
            secondList = body;
            return;
        }
        thirdList = body;
        var intersection = _.intersection(firstList, secondList, thirdList)
            .forEach(console.log);
    }
    fs.readFile('JsonList1.json', handleResponse);
    fs.readFile('JsonList2.json', handleResponse);
    fs.readFile('JsonList3.json', handleResponse);
})();