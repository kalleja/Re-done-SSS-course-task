
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
router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

router.get('/:catID', (req, res) => {
    catController.get_cat_with_id(req, res, parseInt(req.params.catID));
});
  
router.get('/c', catController.cat_list_get);

router.post('/d', upload.single('cat'), (req, res) => {
    res.send(req.params);
});

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit cats.')
});
  
router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete cats.')
});



module.exports = router;
module.exports = {
    cat_list_get,
    get_cat_with_id,
};






















