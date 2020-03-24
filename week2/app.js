'use strict';
const express = require('express');
const app = express();
const port = 3000;
const feeling = require('./routes/catRoute');


app.use('/cat', feeling);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
