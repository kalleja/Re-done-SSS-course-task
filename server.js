'use strict';
 
require('dotenv').config();

const graphqlHTTP = require("express-graphql");
const gqlSchema = require("./schema/schema");

const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const db = require('./database/db');
const cors = require("cors");
const helmet = require('helmet');

app.use(helmet());

// before routes; otherwise middleware didn't get called
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  const prod = require('./production')(app, process.env.PORT);
} else {
  const localhost = require('./localhost')(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
}



app.get('/', async (req, res) => {
  if(req.secure) {
    console.log('Some ver,very smart one visit my url ☺ with secure https. Thank God!');
  } else {
    console.log('Some screwball visit my url ☺ with normal http ☹. That dumba*** fu**!');
  }
  res.send(await cat.find().populate('owner'));
});


const authrosationRoute = require('./routes/authenticationRoute')
const userRoute =require('./routes/userRoute')
const passport = require("./utils/pass");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

const checkAuth = (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
      if(err || !user) {
          throw new Error("ID not reconized!");
      }
  })(req, res);
};




app.use("/graphql", (req, res) => {
  graphqlHTTP({
      schema: gqlSchema,
      graphiql: true,
      context: { req, res, checkAuth }
  })(req, res);
});

const stationRoute = require('./routes/StationRoute');
const connectionRoute = require('./routes/connectionRoute');
require('./models/connection');
require('./models/connectionType');
require('./models/level');
require('./models/station');
require('./models/currentType'); 


 

app.use("/station", stationRoute); 

app.use("/connection", connectionRoute); 

app.use("/auth", authrosationRoute);
app.use('/user', userRoute);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));


db.on('connected', () => { 
  console.log("db connected... But after app listen (maybe) ☹");
  app.listen(port, () => console.log(`App can be run from port ${port}!`));
});  
 


    
  