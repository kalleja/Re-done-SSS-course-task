"use strict";
const express = require('express');
const peopleRouter = express.Router();

const userController = require('../controllers/userController');

peopleRouter.get('/', userController.user_list_get);

peopleRouter.get('/:id', userController.user_get);

peopleRouter.post('/', (req, res) => {
    console.log(req.body);
    res.send('With this endpoint you can add users');
});

peopleRouter.put('/', (req, res) => {
    res.send('With this endpoint you can edit users');
});

peopleRouter.delete('/', (req, res) => {
    res.send('With this endpoint you can delete users');
});

module.exports = userRouter;
