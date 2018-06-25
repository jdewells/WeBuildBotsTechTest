"use strict";
exports.__esModule = true;
var express = require('express');
var Runner_service_1 = require("../services/Runner.service");
var nameCountRouter = express.Router();
exports["default"] = nameCountRouter;
nameCountRouter.get('/name-count', function (req, res) {
    var nameParam = req.query.name;
    if (nameParam === undefined) {
        return res.status(422).send('Missing query parameter \'name\'');
    }
    var nameCountObject = Runner_service_1["default"].generateNameCountObject();
    if (nameCountObject[nameParam] === undefined) {
        nameCountObject[nameParam] = 0;
    }
    var result = {};
    result[nameParam] = nameCountObject[nameParam];
    res.json(result);
});
