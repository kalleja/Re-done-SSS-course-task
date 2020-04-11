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

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
   require('./production')(app, process.env.PORT);
} else {
  require('./localhost')(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
}

app.get('/', async (req, res) => {
  if(req.secure) {
    console.log('Some ver,very smart one visit my url ☺ with secure https. Thank God!');
  } else {
    console.log('Some screwball visit my url ☺ with normal http ☹. That dumba*** fu**!');
  }
   });


const authrosationRoute = require('./routes/authenticationRoute')
const userRoute =require('./routes/userRoute')
const passport = require("./utils/pass");

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



app.use("/auth", authrosationRoute);
app.use('/user', userRoute);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));


db.on('connected', () => { 
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  if (process.env.NODE_ENV === 'production') {
    const prod = require('./production')(app, process.env.PORT);
  } else {
    const localhost = require('./localhost')(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
  }


  console.log("db connected... But after app listen (maybe) ☹");
  });  
 


    
  