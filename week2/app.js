'use strict';
const express = require('express');
const app = express();
const port = 3000;
const feeling = require('./routes/catRoute');
const user = require('./routes/peopleRoute');


app.use('/cat', feeling);
app.use('/user', userRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
