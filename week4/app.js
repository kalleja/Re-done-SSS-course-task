'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const authRoute = require('./routes/AuthentiRoute');
const catRoute = require('./routes/CatRoute');
const userRoute = require('./routes/UserRoute');
const passport = require('./utils/pass');

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


