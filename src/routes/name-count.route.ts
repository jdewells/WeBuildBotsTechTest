const express = require('express');

import Runner from '../services/Runner.service';

let nameCountRouter = express.Router();

export default nameCountRouter;

nameCountRouter.get('/name-count', (req: any, res: any) => {
    let nameParam = req.query.name;

    if (nameParam === undefined) {
        return res.status(422).send('Missing query parameter \'name\'');
    }

    let nameCountObject = Runner.generateNameCountObject();
    let resultCount = 0;

    if (nameCountObject[nameParam]) {
        resultCount = nameCountObject[nameParam];
    }

    let result: any = {};
    result[nameParam] = resultCount;
    res.json(result);
});