'use strict';
 
require('dotenv').config();

const graphqlHTTP = require("express-graphql");
const gqlSchema = require("./schema/schema");

const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const db = require('./database/db');
const cors = require("cors");

const authrosationRoute = require('./routes/authenticationRoute')
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

app.use("/autenticatihon", authrosationRoute);

app.use("/graphql", (req, res) => {
  graphqlHTTP({
      schema: gqlSchema,
      graphiql: true,
      context: { req, res, checkAuth }
  })(req, res);
});

/*const stationRoute = require('./routes/StationRoute');
const connectionRoute = require('./routes/connectionRoute');
require('./models/connection');
require('./models/connectionType');
require('./models/level');
require('./models/station');
require('./models/currentType'); */


 
/*
app.use("/station", stationRoute); 

app.use("/connection", connectionRoute); 

app.use("/auth", authrosationRoute);


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));*/

const port = 3025;   
db.on('connected', () => { 
  app.listen(port, () => console.log(`App can be run from port ${port}!`));
});  
 


    
  