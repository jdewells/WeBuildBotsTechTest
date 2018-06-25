import _ = require('lodash');
import fs = require('fs');

import NameStruct from './models/NameStruct.model';

import NameCounter from './NameCounter';

const RESOURCES_DIRECTORY = 'res/'
const TITLES_PATH = RESOURCES_DIRECTORY + 'titles.txt';
const FIRSTNAMES_PATH = RESOURCES_DIRECTORY + 'first-names.txt';
const LASTNAMES_PATH = RESOURCES_DIRECTORY + 'last-names.txt';
const TARGET_PATH = RESOURCES_DIRECTORY + 'oliver-twist.txt';
const OUTPUT_PATH = 'out/output.txt';

run();

function run() {
    let nameStruct = new NameStruct(
        readFileAsArray(TITLES_PATH, '\n'), 
        readFileAsArray(FIRSTNAMES_PATH, '\r'), 
        readFileAsArray(LASTNAMES_PATH, '\r')
    );

    let targetFileLines = readFileAsArray(TARGET_PATH, '\r');
    let nameCountObject = NameCounter.countNamesInLineList(nameStruct, targetFileLines);
    let sortedNameCountArray = convertToReadableFormat(nameCountObject);
    writeOutputFile(OUTPUT_PATH, sortedNameCountArray);
}

function readFileAsArray(path: string, separator: string) : Array<string> {
    return fs.readFileSync(path).toString().split(separator);
}

function convertToReadableFormat(nameCounts: Array<string>) {
    return _(nameCounts)
        .toPairs()
        .orderBy([1, 0], ['desc', 'asc'])
        .map((nameCount: any) => {
            return nameCount[0] + ': ' + nameCount[1]
        })
        .value();
}

function writeOutputFile(path: string, lines: Array<string>) {
    let outputStream = fs.createWriteStream(path);
    lines.forEach((line: any) => outputStream.write(line + '\n'));
}    