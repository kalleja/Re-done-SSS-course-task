'use strict';
// catRoute
const express = require('express');
const router = express.Router();

router.get(':id?', (req, res) => {
    console.log('Feeling id parameter', req.params.id);
    res.send('You reqested a cat whose id is '  +  req.params.id)
  });
  
  router.get('/', (req, res) => {
    res.send('From this endpoint you can get cats.')
  });
  
  
  router.post('/cat', (req, res) => {
    res.send('From this endpoint you can add cats.')
  });
  
  router.put('/cat', (req, res) => {
    res.send('From this endpoint you can edit cats.')
  });
  
  router.delete('/cat', (req, res) => {
    res.send('From this endpoint you can delet cats.')
  });
  
  
module.exports=router;