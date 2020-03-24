'use stric js';

const express = require('express');

const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'))

function veryOldschool(param, more){
    console.log('veryOldschool',param, more)
}

const oldSchool = function(param, more){
    console.log('oldSchool',param, more)
}

const arrowFun = (param, more) =>{
    console.log('arrowFunction',param, more)
}

veryOldschool('test', 'it fun')
oldSchool('foo', '44')
arrowFun('modern', 'es6')