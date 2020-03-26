'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const AuthentiRoute = require('./routes/AuthentiRoute');
const CatRoute = require('./routes/CatRoute');
const UserRoute = require('./routes/UserRoute');
const passport = require('./utils/pass');

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', AuthentiRoute); 
app.use('/cat', passport.authenticate('jwt', {session: false}),CatRoute); 
app.use('/user', passport.authenticate('jwt', {session: false}),UserRoute); 



app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});


// modify app.post('/login',...
app.post('/login',
    passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
    });

// modify app.get('/secret',...
app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
});


app.get('/home', function (req, res) {
  res.cookie('color', req.params.clr).send()
})

app.get('/form', function (req, res) {
  res.cookie('color', req.params.clr).send()
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
