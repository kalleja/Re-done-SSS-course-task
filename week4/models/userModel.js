'user strict'
 // fake database: ****************
 const users = [
  {
    id: '1',
    name: 'Foo Bar',
    email: 'foo@bar.fi',
    password: 'foobar',
  },
  {
    id: '2',
    name: 'Bar Foo',
    email: 'bar@foo.fi',
    password: 'barfoo',
  },

  {
    id: '3',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '4',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

// fake database functions *********
const getUser = (id) => {
  const user = users.filter((usr) => {
    if (usr.id === id) {
      return usr;
    }
  });
  return user[0];
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};

module.exports = {
  users,
  getUser,
  getUserLogin,
};




