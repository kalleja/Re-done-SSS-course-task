'use stric js';

const express = require('express');
const app = express();
const port = 3000;
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug');
app.set('views', 'views');
app.use('/public', express.static('public'))
app.get('/', (req, res) => {
  res.render('index.pug');
});

app.get('/catinfo', (req, res) =>{
console.log('test url', req) 
    const cat =  {
        name: 'Pekka Töppöhäntä',
        age: 15,
        weight: 77

}
res.json(cat)
})

    app.listen(port, () => console.log(`app listening on port ${port}!`))
