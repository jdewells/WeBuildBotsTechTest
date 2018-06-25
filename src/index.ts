import NameCountRouter from './routes/name-count.route';

const express = require('express');
const app = express();

app.use(NameCountRouter);

app.listen(3000, () => console.log('Example app listening on port 3000!'));