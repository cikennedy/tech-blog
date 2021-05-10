const { User } = require('../models');

const userData = [
  {
    username: 'Blogmaster',
    email: 'blogmaster@email.com',
    password: 'password12345'
  },
  {
    username: 'King of Blogs',
    email: 'king@email.com',
    password: '12345password'
  },
  {
    username: 'Sir Blogsalot',
    email: 'bloggy@email.com',
    password: '123password456'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;