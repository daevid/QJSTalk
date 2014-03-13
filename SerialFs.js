var fs = require('fs');
var _ = require('lodash');
(function compareFileLists(){
    var firstList;
    var secondList;
    var thirdList;

    fs.readFile('JsonList1.json', function (error, firstFile){
        firstList = JSON.parse(firstFile);
        fs.readFile('JsonList2.json', function (error, secondFile){
            secondList = JSON.parse(secondFile);
            fs.readFile('JsonList3.json', function (error, thirdFile){
                thirdList = JSON.parse(thirdFile);
                var intersection = _.intersection(firstList, secondList, thirdList)
                                    .forEach(console.log);
            });
        });
    });
})();