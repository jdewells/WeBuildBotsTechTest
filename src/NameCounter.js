"use strict";
exports.__esModule = true;
var TextParser_1 = require("./TextParser");
exports["default"] = {
    countNamesInLineList: countNamesInLineList,
    countNamesInLine: countNamesInLine
};
function countNamesInLineList(nameStruct, lineList) {
    var resultNameCount = {};
    lineList.forEach(function (line) {
        var lineNameCount = countNamesInLine(nameStruct, line);
        Object.keys(lineNameCount).forEach(function (name) {
            if (resultNameCount[name] === undefined) {
                resultNameCount[name] = 0;
            }
            resultNameCount[name] += lineNameCount[name];
        });
    });
    return resultNameCount;
}
function countNamesInLine(nameStruct, textLine) {
    var words = TextParser_1["default"].convert(textLine);
    return findNamesInWords(words, nameStruct);
}
function findNamesInWords(words, nameStruct) {
    var nameCounter = {};
    while (words.length > 0) {
        var firstWord = words[0];
        var secondWord = words[1] || '';
        var thirdWord = words[2] || '';
        var fourthWord = words[3] || '';
        var firstWordIsATitle = nameStruct.titles.indexOf(firstWord) >= 0;
        var firstWordIsAFirstname = nameStruct.firstnames.indexOf(firstWord) >= 0;
        var secondWordIsAFirstname = nameStruct.firstnames.indexOf(secondWord) >= 0;
        var secondWordIsALastname = nameStruct.lastnames.indexOf(secondWord) >= 0;
        var thirdWordIsAFirstname = nameStruct.firstnames.indexOf(thirdWord) >= 0;
        var thirdWordIsALastname = nameStruct.lastnames.indexOf(thirdWord) >= 0;
        var fourthWordIsALastName = nameStruct.lastnames.indexOf(fourthWord) >= 0;
        if (firstWordIsATitle && secondWordIsAFirstname && thirdWordIsAFirstname && fourthWordIsALastName) {
            var fullName = firstWord + ' ' + secondWord + ' ' + thirdWord + ' ' + fourthWord;
            console.log('Matched Title-Firstname-Firstname-Lastname: ' + fullName);
            addNameToResults(fullName, nameCounter);
            words.splice(0, 4);
            continue;
        }
        if (firstWordIsATitle && secondWordIsAFirstname && thirdWordIsALastname) {
            var fullName = firstWord + ' ' + secondWord + ' ' + thirdWord;
            console.log('Matched Title-Firstname-Lastname: ' + fullName);
            addNameToResults(fullName, nameCounter);
            words.splice(0, 3);
            continue;
        }
        if ((firstWordIsAFirstname || firstWordIsATitle) && secondWordIsALastname) {
            var fullName = firstWord + ' ' + secondWord;
            console.log('Matched [Title/Firstname]-Lastname: ' + fullName);
            addNameToResults(fullName, nameCounter);
            words.splice(0, 2);
            continue;
        }
        if (firstWordIsAFirstname) {
            console.log('Matched Firstname: ' + firstWord);
            addNameToResults(firstWord, nameCounter);
            words.splice(0, 1);
            continue;
        }
        words.splice(0, 1);
    }
    return nameCounter;
}
/*
    TECH TALK
    Ugly. But it works. Originally I had the entire thing as a class instead,
    and this accessed this.nameCounter to add the result. But that was literally the only reason
    to turn it into a class. I'd rather avoid turning it into a class unless it's for a good reason.

    Alternatively, we could have declared this as a function inside the runner function and used the scope to
    access `nameCounter` that way. But I've never seen that done in a way that made me say "Yeah, that's easy to follow".
    Generally unless it's an accepted practice it tends to throw people right off, so I'm avoiding it.

    Hence we're accepting this ugly second parameter. It's better than duplicating this code all over the place.
*/
function addNameToResults(name, nameCounter) {
    // `nameCounter[name] = nameCounter[name] || 0;` could have worked as a one-liner for this, but I chose not to use it.
    if (nameCounter[name] === undefined) {
        nameCounter[name] = 0;
    }
    nameCounter[name]++;
}
