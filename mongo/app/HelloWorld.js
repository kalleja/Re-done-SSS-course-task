const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/test1', (req, res)=> {console.log('test url', req);
const cat={
    name='Putrik',
    weight='800 kg',
    age='89 years'
};
res.json(cat);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))