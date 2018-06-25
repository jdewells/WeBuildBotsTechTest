import NameStruct from "../models/NameStruct.model";

import TextParser from "./TextParser.service";

export default {
    countNamesInLineList: countNamesInLineList,
    countNamesInLine: countNamesInLine
}

function countNamesInLineList(nameStruct: NameStruct, lineList: Array<string>) {
    let resultNameCount: any = {};

    lineList.forEach((line) => {
        let lineNameCount: any = countNamesInLine(nameStruct, line);

        Object.keys(lineNameCount).forEach((name) => {
            if (resultNameCount[name] === undefined) {
                resultNameCount[name] = 0;
            } 

            resultNameCount[name] += lineNameCount[name];
        });
    });

    return resultNameCount;
}

function countNamesInLine(nameStruct: NameStruct, textLine: string) : Object {        
    let words = TextParser.convert(textLine);
    return findNamesInWords(words, nameStruct);
}

function findNamesInWords(words: Array<string>, nameStruct: NameStruct) : Object {
    let nameCounter = {};

    while (words.length > 0) {
        let firstWord = words[0];
        let secondWord = words[1] || '';
        let thirdWord = words[2] || '';
        let fourthWord = words[3] || '';


        let firstWordIsATitle = nameStruct.titles.indexOf(firstWord) >= 0;
        let firstWordIsAFirstname = nameStruct.firstnames.indexOf(firstWord) >= 0;
        let secondWordIsAFirstname = nameStruct.firstnames.indexOf(secondWord) >= 0;
        let secondWordIsALastname = nameStruct.lastnames.indexOf(secondWord) >= 0;
        let thirdWordIsAFirstname = nameStruct.firstnames.indexOf(thirdWord) >= 0;
        let thirdWordIsALastname = nameStruct.lastnames.indexOf(thirdWord) >= 0;
        let fourthWordIsALastName = nameStruct.lastnames.indexOf(fourthWord) >= 0;

        if (firstWordIsATitle && secondWordIsAFirstname && thirdWordIsAFirstname && fourthWordIsALastName) {
            let fullName = firstWord + ' ' + secondWord + ' ' + thirdWord + ' ' + fourthWord;
            console.log('Matched Title-Firstname-Firstname-Lastname: ' + fullName);
            addNameToResults(fullName, nameCounter);
            
            words.splice(0, 4);
            continue;
        }

        if (firstWordIsATitle && secondWordIsAFirstname && thirdWordIsALastname) {
            let fullName = firstWord + ' ' + secondWord + ' ' + thirdWord;
            console.log('Matched Title-Firstname-Lastname: ' + fullName);
            addNameToResults(fullName, nameCounter);

            words.splice(0, 3);
            continue;
        }

        if ((firstWordIsAFirstname || firstWordIsATitle) && secondWordIsALastname) {
            let fullName = firstWord + ' ' + secondWord;
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
function addNameToResults(name: string, nameCounter: any) {
    // `nameCounter[name] = nameCounter[name] || 0;` could have worked as a one-liner for this, but I chose not to use it.
    if (nameCounter[name] === undefined) {
        nameCounter[name] = 0;
    }

    nameCounter[name]++;
}