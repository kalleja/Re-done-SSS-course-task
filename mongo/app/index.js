'use strict';
require('dotenv').config();

const express = require('express');
const db = require('./model/db');
const cat = require('./model/feeling');
const user = require('./model/people');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  console.log('some screwball visit my url ☺');
  res.send(await cat.find().populate('owner'));
});

app.post('/cat', async(req, res) => {
  const mycat = await cat.create({ name: 'Arthur', age: 79, owner: '5e7b0ae1f304f22815649e05' });
  //const myuser = find
  //myuser.cats.push(mycat._id);
  //save()
  res.send(`cat created with id: ${mycat._id}`);
});

app.post('/user', async (req, res) => {
  const myuser = await user.create({ name: 'Kalle', email: 'g@nius.fi', password: 'qwerty1234S' });
  res.send(`user created with id ${myuser._id}`);
});

app.get('/INITI', (req, res) => {
  console.log('test url', req);
  const cat = {
    name: 'Pekka Trhasbag von Garbig',
    age: 89,
    weight: 250
  };
  res.json(cat);
});

db.on('connected', () => { 
  app.listen(port, () => console.log(`app listening on port ${port}!`));
});

