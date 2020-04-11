"use strict";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  cats: [ mongoose.ObjectId ]
});

module.exports = mongoose.model('User', userSchema);

/*
const users = [
    {
        id: 1,
        name: "Thrasbag",
        email: "presidentScrewbal.com",
        password: "BoneBuster",
    },
 {
    id: 3,
    name: 'Foo Bar',
    email: 'foo@bar.fi',
    password: 'foobar',
  },
  {
    id: 2,
    name: 'Bar Foo',
    email: 'bar@foo.fi',
    password: 'barfoo',
  },

];

const getUserID = id => {
  const user = users.filter(usr => {
      if (usr.id === id) {
          return usr;
      }
  });
  return user[0];
};

const getUserLogin = email => {
  const user = users.filter(usr => {
      if (usr.email === email) {
          return usr;
      }
  });
  return user[0];
};
*/
module.exports = mongoose.model('User', userSchema);
/*{
  users,
  getUserID,
  getUserLogin
};*/
  