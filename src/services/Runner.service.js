"use strict";
exports.__esModule = true;
var _ = require("lodash");
var fs = require("fs");
var NameStruct_model_1 = require("../models/NameStruct.model");
var NameCounter_service_1 = require("./NameCounter.service");
var RESOURCES_DIRECTORY = 'res/';
var TITLES_PATH = RESOURCES_DIRECTORY + 'titles.txt';
var FIRSTNAMES_PATH = RESOURCES_DIRECTORY + 'first-names.txt';
var LASTNAMES_PATH = RESOURCES_DIRECTORY + 'last-names.txt';
var TARGET_PATH = RESOURCES_DIRECTORY + 'oliver-twist.txt';
var OUTPUT_PATH = 'out/output.txt';
exports["default"] = {
    generateNameCountObject: generateNameCountObject,
    generateNameCountFile: generateNameCountFile
};
function generateNameCountFile() {
    var nameCountObject = generateNameCountObject();
    var sortedNameCountArray = convertToReadableFormat(nameCountObject);
    writeOutputFile(OUTPUT_PATH, sortedNameCountArray);
}
function generateNameCountObject() {
    var nameStruct = new NameStruct_model_1["default"](readFileAsArray(TITLES_PATH, '\n'), readFileAsArray(FIRSTNAMES_PATH, '\r'), readFileAsArray(LASTNAMES_PATH, '\r'));
    var targetFileLines = readFileAsArray(TARGET_PATH, '\r');
    return NameCounter_service_1["default"].countNamesInLineList(nameStruct, targetFileLines);
}
function readFileAsArray(path, separator) {
    return fs.readFileSync(path).toString().split(separator);
}
function convertToReadableFormat(nameCounts) {
    return _(nameCounts)
        .toPairs()
        .orderBy([1, 0], ['desc', 'asc'])
        .map(function (nameCount) {
        return nameCount[0] + ': ' + nameCount[1];
    })
        .value();
}
function writeOutputFile(path, lines) {
    var outputStream = fs.createWriteStream(path);
    lines.forEach(function (line) { return outputStream.write(line + '\n'); });
}
