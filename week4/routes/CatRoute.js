'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = (req, res) => {
    res.json(cats);
};

const get_cat_with_id = (req, res, id) => {
    let filteredCat = cats.filter(cat => parseInt(cat.id) === id);
    if (filteredCat.length > 0) {
        res.json(filteredCat);
    } else {
        res.send("Nothing is found");
    }
};

module.exports = {
    cat_list_get,
    get_cat_with_id,
};