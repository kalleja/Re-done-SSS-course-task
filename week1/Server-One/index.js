'use stric js';

const express = require('express');
const app = express();
const port = 3000;


app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    console.log('someone visit my url')

    res.send('Hello World :)!')
})

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
