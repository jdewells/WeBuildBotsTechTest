"use strict";
exports.__esModule = true;
var name_count_route_1 = require("./routes/name-count.route");
var express = require('express');
var app = express();
app.use(name_count_route_1["default"]);
app.listen(3000, function () { return console.log('Example app listening on port 3000!'); });
